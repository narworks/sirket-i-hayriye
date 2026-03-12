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
  const nearEndTriggeredRef = useRef(false);

  const videoId = getYouTubeId(video.url);

  // YouTube iframe'e komut gönder
  const sendCommand = useCallback((command: string, args?: unknown) => {
    if (iframeRef.current?.contentWindow) {
      const message = JSON.stringify({
        event: "command",
        func: command,
        args: args ? [args] : [],
      });
      iframeRef.current.contentWindow.postMessage(message, "*");
    }
  }, []);

  // Mute/unmute kontrolü
  useEffect(() => {
    if (!isLoaded) return;
    if (isMuted) {
      sendCommand("mute");
    } else {
      sendCommand("unMute");
    }
  }, [isMuted, isLoaded, sendCommand]);

  // Play/pause kontrolü
  useEffect(() => {
    if (!isLoaded) return;
    if (isPlaying) {
      sendCommand("playVideo");
    } else {
      sendCommand("pauseVideo");
    }
  }, [isPlaying, isLoaded, sendCommand]);

  // Video yüklendiğinde
  const handleLoad = () => {
    setIsLoaded(true);
    onReady();
    startTimeRef.current = Date.now();
    nearEndTriggeredRef.current = false;

    // Progress simülasyonu
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const estimatedDuration = 180; // Tahmini 3 dakika
      const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
      onProgress(progress, estimatedDuration);

      // Son 5 saniyeye yaklaşınca
      if (elapsed >= estimatedDuration - 5 && !nearEndTriggeredRef.current) {
        nearEndTriggeredRef.current = true;
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
    nearEndTriggeredRef.current = false;
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

  // YouTube embed URL - autoplay için mute=1 zorunlu, sonra API ile açılır
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&loop=0&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;

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
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
