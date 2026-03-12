"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoContent } from "@/lib/types";

interface VideoPlayerComponentProps {
  video: VideoContent;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onReady: () => void;
  onProgress: (progress: number, duration: number) => void;
  onEnded: () => void;
  onNearEnd: () => void;
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

// YouTube IFrame API için global tip
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          width?: number | string;
          height?: number | string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

export function VideoPlayer({
  video,
  isPlaying,
  isMuted,
  onReady,
  onProgress,
  onEnded,
  onNearEnd,
}: VideoPlayerComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const nearEndTriggeredRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerIdRef = useRef(`yt-player-${Date.now()}`);

  const videoId = getYouTubeId(video.url);

  // YouTube API'yi yükle
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndSetReady = () => {
      if (window.YT && window.YT.Player) {
        setApiReady(true);
        return true;
      }
      return false;
    };

    // API zaten yüklü mü kontrol et
    if (checkAndSetReady()) return;

    // API callback'i ayarla
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      originalCallback?.();
      setApiReady(true);
    };

    // Script zaten ekli mi kontrol et
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    } else {
      // Script var ama API henüz hazır değil - bekle
      const interval = setInterval(() => {
        if (checkAndSetReady()) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  // Player'ı oluştur
  useEffect(() => {
    if (!apiReady || !videoId) return;

    // Container hazır olana kadar bekle
    const container = containerRef.current;
    if (!container) {
      const timeout = setTimeout(() => {
        // Re-trigger effect
        setApiReady(false);
        setTimeout(() => setApiReady(true), 10);
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Önceki player'ı temizle
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // Ignore destroy errors
      }
      playerRef.current = null;
    }

    // Önceki player div'ini temizle
    const oldPlayerDiv = document.getElementById(playerIdRef.current);
    if (oldPlayerDiv) {
      oldPlayerDiv.remove();
    }

    // Yeni player ID oluştur
    playerIdRef.current = `yt-player-${Date.now()}`;
    const playerId = playerIdRef.current;

    // Container'a div ekle
    const playerDiv = document.createElement("div");
    playerDiv.id = playerId;
    container.appendChild(playerDiv);

    nearEndTriggeredRef.current = false;
    setIsLoaded(false);

    // Tam ekran için boyutları ayarla
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Yeni player oluştur
    playerRef.current = new window.YT.Player(playerId, {
      videoId: videoId,
      width: width,
      height: height,
      playerVars: {
        autoplay: 1,
        mute: 1, // Autoplay için zorunlu
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          setIsLoaded(true);
          onReady();

          // Mute durumunu uygula
          if (isMuted) {
            event.target.mute();
          } else {
            event.target.unMute();
          }

          // Progress tracking başlat
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }

          progressIntervalRef.current = setInterval(() => {
            if (!playerRef.current) return;

            try {
              const currentTime = playerRef.current.getCurrentTime();
              const duration = playerRef.current.getDuration();

              if (duration > 0) {
                const progress = (currentTime / duration) * 100;
                onProgress(progress, duration);

                // Son 5 saniyeye yaklaşınca
                if (currentTime >= duration - 5 && !nearEndTriggeredRef.current) {
                  nearEndTriggeredRef.current = true;
                  onNearEnd();
                }
              }
            } catch {
              // Player henüz hazır değil
            }
          }, 1000);
        },
        onStateChange: (event) => {
          // Video bitti
          if (event.data === window.YT.PlayerState.ENDED) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
            onEnded();
          }
        },
        onError: (event) => {
          console.error("YouTube Player Error:", event.data);
        },
      },
    });

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReady, videoId]);

  // Mute kontrolü
  useEffect(() => {
    if (!playerRef.current || !isLoaded) return;

    try {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    } catch {
      // Player henüz hazır değil
    }
  }, [isMuted, isLoaded]);

  // Play/Pause kontrolü
  useEffect(() => {
    if (!playerRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {
      // Player henüz hazır değil
    }
  }, [isPlaying, isLoaded]);

  // Cleanup - component unmount olduğunda player'ı tamamen temizle
  useEffect(() => {
    const playerId = playerIdRef.current;

    return () => {
      // Progress interval'ı temizle
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      // Player'ı destroy et
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }

      // Player div'ini DOM'dan kaldır
      const playerDiv = document.getElementById(playerId);
      if (playerDiv) {
        playerDiv.remove();
      }
    };
  }, []);

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        Video yüklenemedi
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={video.id}
        variants={videoVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0 flex items-center justify-center bg-black"
      >
        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-ottoman-gold/30 border-t-ottoman-gold" />
          </div>
        )}

        {/* YouTube Player Container - tam ekran kaplama */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            pointerEvents: "none",
            /* Video'yu ekrana sığdırmak için scale */
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        {/* iframe'i tam ekran yapmak için global stil */}
        <style jsx global>{`
          #${playerIdRef.current} {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            min-width: 100vw !important;
            min-height: 100vh !important;
            width: 177.78vh !important; /* 16:9 aspect ratio */
            height: 56.25vw !important;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
