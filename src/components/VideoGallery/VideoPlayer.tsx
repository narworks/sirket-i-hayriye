"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
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

export function VideoPlayer({
  video,
  isPlaying,
  isMuted,
  volume,
  onReady,
  onProgress,
  onEnded,
  onNearEnd,
}: VideoPlayerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const nearEndTriggeredRef = useRef(false);
  const [duration, setDuration] = useState(0);

  // Video değişince near-end flag'ini sıfırla
  useEffect(() => {
    nearEndTriggeredRef.current = false;
    setDuration(0);
  }, [video.id]);

  const handleDurationChange = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    if (target.duration && !isNaN(target.duration)) {
      setDuration(target.duration);
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const target = e.target as HTMLVideoElement;
      const currentTime = target.currentTime || 0;
      const videoDuration = target.duration || duration;

      if (videoDuration > 0) {
        const progress = (currentTime / videoDuration) * 100;
        onProgress(progress, videoDuration);

        // Video bitimine 3 saniye kala onNearEnd tetikle
        if (!nearEndTriggeredRef.current) {
          const remainingTime = videoDuration - currentTime;
          if (remainingTime <= 3) {
            nearEndTriggeredRef.current = true;
            onNearEnd();
          }
        }
      }
    },
    [onProgress, onNearEnd, duration]
  );

  const handleReady = useCallback(() => {
    onReady();
  }, [onReady]);

  const handleEnded = useCallback(() => {
    onEnded();
  }, [onEnded]);

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
        {/* Video player wrapper - tam ekran kaplama */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              minWidth: "100vw",
              minHeight: "100vh",
              width: "177.78vh", // 16:9 aspect ratio
              height: "56.25vw",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              src={video.url}
              playing={isPlaying}
              muted={isMuted}
              volume={volume}
              width="100%"
              height="100%"
              onReady={handleReady}
              onTimeUpdate={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              onEnded={handleEnded}
              controls={false}
              playsInline
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
