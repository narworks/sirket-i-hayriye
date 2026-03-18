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
  hasStarted: boolean; // Kullanıcı WelcomeScreen'e tıkladı mı?
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

// YouTube'a postMessage gönder
function sendYouTubeCommand(
  iframe: HTMLIFrameElement | null,
  func: string,
  args: unknown[] = []
) {
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "https://www.youtube.com"
    );
  }
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer(
    { video, isMuted, hasStarted, volume, onReady, onProgress, onEnded, onNearEnd },
    ref
  ) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPlayOverlay, setShowPlayOverlay] = useState(true); // Mobilde tıklanabilir overlay
    const [iframeKey, setIframeKey] = useState(() => Date.now()); // Her video için benzersiz key
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const nearEndTriggeredRef = useRef(false);
    const youtubeReadyRef = useRef(false);
    const playRetryRef = useRef<NodeJS.Timeout | null>(null);

    const isLocal = isLocalVideo(video.url);
    const videoId = !isLocal ? getYouTubeId(video.url) : null;
    const videoDuration = video.duration || 180;

    // Expose play/pause/setMuted methods via ref
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (isLocal && videoRef.current) {
          try {
            await videoRef.current.play();
          } catch (e) {
            console.log("Play failed:", e);
          }
        } else if (!isLocal) {
          sendYouTubeCommand(iframeRef.current, "playVideo");
        }
      },
      pause: () => {
        if (isLocal && videoRef.current) {
          videoRef.current.pause();
        } else if (!isLocal) {
          sendYouTubeCommand(iframeRef.current, "pauseVideo");
        }
      },
      setMuted: (muted: boolean) => {
        if (isLocal && videoRef.current) {
          videoRef.current.muted = muted;
        } else if (!isLocal) {
          sendYouTubeCommand(iframeRef.current, muted ? "mute" : "unMute");
        }
      },
    }));

    // Video değiştiğinde state'leri sıfırla
    useEffect(() => {
      setIsLoaded(false);
      setShowPlayOverlay(true); // Yeni video için overlay göster
      setIframeKey(Date.now()); // Yeni iframe key - cache bypass
      startTimeRef.current = 0;
      nearEndTriggeredRef.current = false;
      youtubeReadyRef.current = false;

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        if (playRetryRef.current) {
          clearTimeout(playRetryRef.current);
        }
      };
    }, [video.id]);

    // Mute/volume kontrolü - sadece isLoaded olduktan sonra
    // Bu effect mute butonu değiştiğinde çalışır
    useEffect(() => {
      if (!isLoaded) return;

      if (isLocal && videoRef.current) {
        // hasStarted true ise isMuted'a göre ses ayarla
        // hasStarted false ise her zaman sessiz
        const shouldBeMuted = !hasStarted || isMuted;
        videoRef.current.muted = shouldBeMuted;
        videoRef.current.volume = volume;
      } else if (!isLocal && youtubeReadyRef.current) {
        // YouTube için postMessage
        const shouldBeMuted = !hasStarted || isMuted;
        sendYouTubeCommand(iframeRef.current, shouldBeMuted ? "mute" : "unMute");
        if (!shouldBeMuted) {
          sendYouTubeCommand(iframeRef.current, "setVolume", [Math.round(volume * 100)]);
        }
      }
    }, [isLocal, isLoaded, isMuted, hasStarted, volume]);

    // YouTube için timer-based progress
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

      if (videoRef.current) {
        // hasStarted true ve isMuted false ise ses açık
        // Aksi halde sessiz
        const shouldBeMuted = !hasStarted || isMuted;
        videoRef.current.muted = shouldBeMuted;
        videoRef.current.volume = volume;
      }

      onReady();
    }, [onReady, hasStarted, isMuted, volume]);

    // Yerel video otomatik oynatma
    useEffect(() => {
      if (!isLocal || !videoRef.current) return;

      const videoElement = videoRef.current;

      // Mobil autoplay için önce sessiz başlat
      videoElement.muted = true;

      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Oynatma başladıktan sonra gerçek ses durumunu uygula
            if (videoRef.current) {
              const shouldBeMuted = !hasStarted || isMuted;
              videoRef.current.muted = shouldBeMuted;
              videoRef.current.volume = volume;
            }
          })
          .catch(() => {
            console.log("Autoplay blocked, waiting for user interaction");
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLocal, video.id]);

    // YouTube iframe yüklendiğinde
    const handleYouTubeLoad = useCallback(() => {
      setIsLoaded(true);

      // YouTube API'sinin hazır olması için birkaç deneme yap
      const applyAudioState = (attempt: number = 1) => {
        if (attempt > 5) {
          // 5 denemeden sonra hala başlamadıysa overlay'i göster
          setShowPlayOverlay(true);
          return;
        }

        setTimeout(() => {
          if (iframeRef.current?.contentWindow) {
            youtubeReadyRef.current = true;

            // Videoyu oynat
            sendYouTubeCommand(iframeRef.current, "playVideo");

            // Ses durumunu ayarla
            const shouldBeMuted = !hasStarted || isMuted;
            sendYouTubeCommand(iframeRef.current, shouldBeMuted ? "mute" : "unMute");

            if (!shouldBeMuted) {
              sendYouTubeCommand(iframeRef.current, "setVolume", [Math.round(volume * 100)]);
            }

            // Başarılı olduğunda overlay'i gizle (kısa gecikme ile)
            setTimeout(() => setShowPlayOverlay(false), 500);
          } else {
            // iframe henüz hazır değil, tekrar dene
            applyAudioState(attempt + 1);
          }
        }, attempt * 300); // Her denemede biraz daha bekle
      };

      applyAudioState();
      onReady();
    }, [onReady, hasStarted, isMuted, volume]);

    // Overlay'e tıklandığında videoyu başlat (mobil için)
    const handlePlayOverlayClick = useCallback(() => {
      if (!isLocal && iframeRef.current) {
        // Birden fazla playVideo komutu gönder (mobilde bazen ilki işe yaramıyor)
        const sendPlayCommands = (attempt: number = 1) => {
          if (attempt > 5 || !iframeRef.current) return;

          sendYouTubeCommand(iframeRef.current, "playVideo");

          // Ses durumunu ayarla
          const shouldBeMuted = !hasStarted || isMuted;
          sendYouTubeCommand(iframeRef.current, shouldBeMuted ? "mute" : "unMute");

          if (!shouldBeMuted) {
            sendYouTubeCommand(iframeRef.current, "setVolume", [Math.round(volume * 100)]);
          }

          // Birkaç deneme daha yap
          if (attempt < 3) {
            playRetryRef.current = setTimeout(() => {
              sendPlayCommands(attempt + 1);
            }, 300);
          }
        };

        sendPlayCommands();
        setShowPlayOverlay(false);
      }
    }, [isLocal, hasStarted, isMuted, volume]);

    // YouTube için geçersiz video kontrolü
    if (!isLocal && !videoId) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-black text-white">
          Video yüklenemedi
        </div>
      );
    }

    // YouTube embed URL - HER ZAMAN mute=1 ile başla (mobil autoplay için zorunlu)
    // Ses durumu postMessage ile ayarlanacak
    // iframeKey ile cache bypass
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=0&fs=0&disablekb=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}&_=${iframeKey}`
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

          {/* Video container */}
          <div className="absolute inset-0 overflow-hidden">
            {isLocal ? (
              // Yerel video dosyası
              <video
                ref={videoRef}
                key={video.id}
                src={video.url}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                webkit-playsinline="true"
                onCanPlay={handleLocalCanPlay}
                onTimeUpdate={handleLocalTimeUpdate}
                onEnded={handleLocalEnded}
              />
            ) : (
              // YouTube iframe + tıklanabilir overlay
              <>
                <iframe
                  ref={iframeRef}
                  key={`${video.id}-${iframeKey}`}
                  src={embedUrl}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    border: "none",
                    pointerEvents: "none",
                    // Ekranı tamamen kapla - hem portrait hem landscape
                    width: "max(100vw, 177.78vh)",
                    height: "max(100vh, 56.25vw)",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleYouTubeLoad}
                  title={video.title}
                />
                {/* Mobilde autoplay başarısız olursa tıklanabilir overlay */}
                {showPlayOverlay && isLoaded && (
                  <button
                    onClick={handlePlayOverlayClick}
                    className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
                    aria-label="Videoyu oynat"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                      <svg
                        className="ml-1 h-10 w-10 text-ottoman-navy"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);
