"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useVideoGallery } from "@/hooks/useVideoGallery";
import { VideoOverlay } from "./VideoOverlay";
import { VideoPlayer } from "./VideoPlayer";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";

export function VideoGallery() {
  const {
    state,
    dispatch,
    currentVideo,
    totalVideos,
    hasMultipleVideos,
    config,
  } = useVideoGallery();

  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skip butonu için zamanlayıcı
  useEffect(() => {
    if (!state.isOpen || !state.isPlaying) return;

    const timeout = setTimeout(() => {
      setShowSkipButton(true);
    }, config.skipButtonDelay * 1000);

    return () => clearTimeout(timeout);
  }, [state.isOpen, state.isPlaying, state.currentIndex, config.skipButtonDelay]);

  // Video değişince skip butonunu sıfırla
  useEffect(() => {
    setShowSkipButton(false);
  }, [state.currentIndex]);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  const handleReady = useCallback(() => {
    dispatch({ type: "SET_READY", ready: true });
  }, [dispatch]);

  const handleProgress = useCallback(
    (progress: number) => {
      dispatch({ type: "SET_PROGRESS", progress });
    },
    [dispatch]
  );

  const handleVideoEnd = useCallback(() => {
    if (hasMultipleVideos) {
      dispatch({ type: "NEXT_VIDEO" });
    } else {
      dispatch({ type: "CLOSE" });
    }
  }, [dispatch, hasMultipleVideos]);

  const handleNearEnd = useCallback(() => {
    // Ses fade out başlat (eğer sonraki video varsa)
    if (hasMultipleVideos) {
      // Logo'yu göster geçiş için
      dispatch({ type: "TOGGLE_LOGO" });
    }
  }, [dispatch, hasMultipleVideos]);

  const handleSkip = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  const handleGoToVideo = useCallback(
    (index: number) => {
      dispatch({ type: "GO_TO_VIDEO", index });
    },
    [dispatch]
  );

  // SSR'da render etme
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {state.isOpen && currentVideo && (
        <VideoOverlay showLogo={state.showLogo}>
          {/* Video Player */}
          <VideoPlayer
            video={currentVideo}
            isPlaying={state.isPlaying}
            isMuted={state.isMuted}
            volume={state.volume}
            onReady={handleReady}
            onProgress={handleProgress}
            onEnded={handleVideoEnd}
            onNearEnd={handleNearEnd}
          />

          {/* Kontroller */}
          <VideoControls
            isMuted={state.isMuted}
            isPlaying={state.isPlaying}
            showSkipButton={showSkipButton}
            hasMultipleVideos={hasMultipleVideos}
            onClose={handleClose}
            onToggleMute={() => dispatch({ type: "TOGGLE_MUTE" })}
            onTogglePlay={() => dispatch({ type: "TOGGLE_PLAY" })}
            onSkip={handleSkip}
            onNextVideo={() => dispatch({ type: "NEXT_VIDEO" })}
            onPrevVideo={() => dispatch({ type: "PREV_VIDEO" })}
          />

          {/* İlerleme Göstergesi */}
          <VideoProgress
            currentIndex={state.currentIndex}
            totalVideos={totalVideos}
            progress={state.progress}
            onGoTo={handleGoToVideo}
          />
        </VideoOverlay>
      )}
    </AnimatePresence>
  );
}
