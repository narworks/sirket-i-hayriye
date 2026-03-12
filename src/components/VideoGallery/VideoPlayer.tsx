"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoContent } from "@/lib/types";

interface VideoPlayerProps {
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

export function VideoPlayer({
  video,
  isMuted,
  onReady,
  onProgress,
  onEnded,
  onNearEnd,
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const nearEndTriggeredRef = useRef(false);
  // Video yüklendiğindeki mute durumunu sakla - video boyunca değişmez
  const initialMutedRef = useRef(isMuted);

  const videoId = getYouTubeId(video.url);

  // Video süresi (saniye) - varsayılan olarak 180 saniye (3 dakika)
  const videoDuration = video.duration || 180;

  // Video değiştiğinde state'leri sıfırla ve yeni mute durumunu kaydet
  useEffect(() => {
    setIsLoaded(false);
    startTimeRef.current = 0;
    nearEndTriggeredRef.current = false;
    initialMutedRef.current = isMuted; // Yeni video için mute durumunu güncelle

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [video.id, isMuted]);

  // Progress takibi - video yüklendiğinde başla
  useEffect(() => {
    if (!isLoaded) return;

    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const progress = Math.min((elapsed / videoDuration) * 100, 100);

      onProgress(progress, videoDuration);

      // Video bitimine 5 saniye kala
      const remaining = videoDuration - elapsed;
      if (remaining <= 5 && !nearEndTriggeredRef.current) {
        nearEndTriggeredRef.current = true;
        onNearEnd();
      }

      // Video bitti
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
  }, [isLoaded, videoDuration, onProgress, onNearEnd, onEnded]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onReady();
  }, [onReady]);

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        Video yüklenemedi
      </div>
    );
  }

  // YouTube embed URL - video yüklendiğindeki mute durumunu kullan
  const muteParam = initialMutedRef.current ? 1 : 0;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=0&fs=0&disablekb=1&enablejsapi=0`;

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

        {/* YouTube iframe - tam ekran kaplama */}
        <div className="absolute inset-0 overflow-hidden">
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
            onLoad={handleLoad}
            title={video.title}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
