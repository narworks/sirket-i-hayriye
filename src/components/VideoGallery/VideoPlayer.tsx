"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoContent } from "@/lib/types";

interface VideoPlayerProps {
  video: VideoContent;
  isPlaying: boolean;
  isMuted: boolean;
  hasStarted: boolean; // Kullanıcı sesi açtı mı?
  volume: number;
  onReady: () => void;
  onProgress: (progress: number, duration: number) => void;
  onEnded: () => void;
  onNearEnd: () => void;
}

export interface VideoPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  setMuted: (muted: boolean) => void;
}

const videoVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

// YouTube video ID'sini URL'den çıkar
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// URL'nin yerel dosya mı yoksa YouTube mı olduğunu kontrol et
function isLocalVideo(url: string): boolean {
  return url.startsWith("/") || url.startsWith("./") || !url.includes("youtube");
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer(
    { video, isMuted, hasStarted, volume, onReady, onProgress, onEnded, onNearEnd },
    ref
  ) {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const nearEndTriggeredRef = useRef(false);

    const isLocal = isLocalVideo(video.url);
    const videoId = !isLocal ? getYouTubeId(video.url) : null;
    const videoDuration = video.duration || 180;

    // Expose play/pause/setMuted methods via ref
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (isLocal && videoRef.current) {
          videoRef.current.muted = false;
          try {
            await videoRef.current.play();
          } catch (e) {
            console.log("Play failed:", e);
          }
        }
      },
      pause: () => {
        if (isLocal && videoRef.current) {
          videoRef.current.pause();
        }
      },
      setMuted: (muted: boolean) => {
        if (isLocal && videoRef.current) {
          videoRef.current.muted = muted;
        } else if (!isLocal && iframeRef.current?.contentWindow) {
          const func = muted ? "mute" : "unMute";
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func, args: [] }),
            "https://www.youtube.com"
          );
        }
      },
    }));

    // Video değiştiğinde state'leri sıfırla (sadece video.id değişince)
    useEffect(() => {
      setIsLoaded(false);
      startTimeRef.current = 0;
      nearEndTriggeredRef.current = false;

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }, [video.id]);

    // Mute/volume kontrolü - yerel video ve YouTube için
    useEffect(() => {
      if (isLocal && videoRef.current) {
        videoRef.current.muted = isMuted;
        videoRef.current.volume = volume;
      } else if (!isLocal && iframeRef.current?.contentWindow) {
        // YouTube iframe'e postMessage ile mute/unmute komutu gönder
        const func = isMuted ? "mute" : "unMute";
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args: [] }),
          "https://www.youtube.com"
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [Math.round(volume * 100)],
          }),
          "https://www.youtube.com"
        );
      }
    }, [isLocal, isMuted, volume]);

    // YouTube için timer-based progress (iframe'den event alınamıyor)
    useEffect(() => {
      if (isLocal || !isLoaded) return;

      startTimeRef.current = Date.now();

      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const progress = Math.min((elapsed / videoDuration) * 100, 100);

        onProgress(progress, videoDuration);

        const remaining = videoDuration - elapsed;
        if (remaining <= 5 && !nearEndTriggeredRef.current) {
          nearEndTriggeredRef.current = true;
          onNearEnd();
        }

        if (elapsed >= videoDuration) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          onEnded();
        }
      }, 500);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }, [isLocal, isLoaded, videoDuration, onProgress, onNearEnd, onEnded]);

    // Yerel video event handler'ları
    const handleLocalTimeUpdate = useCallback(() => {
      if (!videoRef.current) return;

      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration || videoDuration;
      const progress = (currentTime / duration) * 100;

      onProgress(progress, duration);

      const remaining = duration - currentTime;
      if (remaining <= 5 && !nearEndTriggeredRef.current) {
        nearEndTriggeredRef.current = true;
        onNearEnd();
      }
    }, [videoDuration, onProgress, onNearEnd]);

    const handleLocalEnded = useCallback(() => {
      onEnded();
    }, [onEnded]);

    const handleLocalCanPlay = useCallback(() => {
      setIsLoaded(true);
      // Video hazır olduğunda doğru muted state'ini ayarla
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        videoRef.current.volume = volume;
      }
      onReady();
    }, [onReady, isMuted, volume]);

    // Video yüklendiğinde otomatik oynat (sadece video değişince)
    // Tarayıcı autoplay politikası gereği önce sessiz başlatıp, sonra gerçek ses durumunu uygula
    useEffect(() => {
      if (!isLocal || !videoRef.current) return;

      const video = videoRef.current;
      // Autoplay için önce sessiz başlat
      video.muted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Oynatma başladıktan sonra gerçek ses durumunu uygula
            if (videoRef.current) {
              videoRef.current.muted = isMuted;
              videoRef.current.volume = volume;
            }
          })
          .catch(() => {
            console.log("Autoplay blocked, waiting for user interaction");
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLocal, video.id]);

    const handleYouTubeLoad = useCallback(() => {
      setIsLoaded(true);
      onReady();
    }, [onReady]);

    // YouTube için geçersiz video kontrolü
    if (!isLocal && !videoId) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-black text-white">
          Video yüklenemedi
        </div>
      );
    }

    // YouTube için: hasStarted true ise sesli, değilse sessiz başla
    const muteParam = hasStarted ? 0 : 1;
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=0&fs=0&disablekb=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`
      : "";

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={video.id}
          variants={videoVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-black"
        >
          {/* Loading spinner */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-ottoman-gold/30 border-t-ottoman-gold" />
            </div>
          )}

          {/* Video container - tam ekran kaplama */}
          <div className="absolute inset-0 overflow-hidden">
            {isLocal ? (
              // Yerel video dosyası
              <video
                ref={videoRef}
                key={video.id}
                src={video.url}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                style={{
                  minWidth: "100vw",
                  minHeight: "100vh",
                  width: "177.78vh",
                  height: "56.25vw",
                }}
                playsInline
                onCanPlay={handleLocalCanPlay}
                onTimeUpdate={handleLocalTimeUpdate}
                onEnded={handleLocalEnded}
              />
            ) : (
              // YouTube iframe
              <iframe
                ref={iframeRef}
                key={video.id}
                src={embedUrl}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  border: "none",
                  pointerEvents: "none",
                  minWidth: "100vw",
                  minHeight: "100vh",
                  width: "177.78vh",
                  height: "56.25vw",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleYouTubeLoad}
                title={video.title}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);
