"use client";

import { useRef, useEffect, useState, ComponentType } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoContent } from "@/lib/types";

// react-player props interface
interface ReactPlayerProps {
  url: string;
  playing?: boolean;
  muted?: boolean;
  volume?: number;
  width?: string | number;
  height?: string | number;
  onReady?: () => void;
  onProgress?: (state: { played: number; playedSeconds: number }) => void;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  progressInterval?: number;
  style?: React.CSSProperties;
  config?: Record<string, unknown>;
}

// react-player SSR uyumluluğu için dynamic import
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-ottoman-gold/30 border-t-ottoman-gold" />
    </div>
  ),
}) as ComponentType<ReactPlayerProps>;

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

export function VideoPlayer({
  video,
  isPlaying,
  isMuted,
  volume,
  onReady,
  onProgress,
  onEnded,
  onNearEnd,
}: VideoPlayerComponentProps) {
  const [duration, setDuration] = useState(0);
  const nearEndTriggeredRef = useRef(false);

  // Video değişince near-end flag'ini sıfırla
  useEffect(() => {
    nearEndTriggeredRef.current = false;
  }, [video.id]);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    const progressPercent = state.played * 100;
    onProgress(progressPercent, duration);

    // Son 2 saniyeye gelince
    if (
      duration > 0 &&
      state.playedSeconds >= duration - 2 &&
      !nearEndTriggeredRef.current
    ) {
      nearEndTriggeredRef.current = true;
      onNearEnd();
    }
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={video.id}
        variants={videoVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0 flex items-center justify-center"
      >
        <ReactPlayer
          url={video.url}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          width="100%"
          height="100%"
          onReady={onReady}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={onEnded}
          progressInterval={500}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                fs: 0,
                playsinline: 1,
              },
            },
            vimeo: {
              playerOptions: {
                autoplay: true,
                byline: false,
                portrait: false,
                title: false,
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
