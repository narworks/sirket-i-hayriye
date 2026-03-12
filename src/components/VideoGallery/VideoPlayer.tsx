"use client";

import { useRef, useEffect, useState } from "react";
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

export function VideoPlayer({
  video,
  isPlaying,
  isMuted,
  onReady,
  onProgress,
  onEnded,
  onNearEnd,
}: VideoPlayerComponentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const videoId = getYouTubeId(video.url);

  // Video yüklendiğinde
  const handleLoad = () => {
    setIsLoaded(true);
    onReady();
    startTimeRef.current = Date.now();

    // Progress simülasyonu (YouTube iframe API olmadan)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const estimatedDuration = 180; // Tahmini 3 dakika
      const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
      onProgress(progress, estimatedDuration);

      // Son 5 saniyeye yaklaşınca
      if (elapsed >= estimatedDuration - 5) {
        onNearEnd();
      }

      // Video bittiğinde
      if (elapsed >= estimatedDuration) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        onEnded();
      }
    }, 1000);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Video değiştiğinde reset
  useEffect(() => {
    setIsLoaded(false);
    startTimeRef.current = 0;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }, [video.id]);

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        Video yüklenemedi
      </div>
    );
  }

  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&loop=0`;

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

        {/* YouTube iframe */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          style={{
            border: "none",
            pointerEvents: isPlaying ? "none" : "auto",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
