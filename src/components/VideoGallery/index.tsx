"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useVideoGallery } from "@/hooks/useVideoGallery";
import { WelcomeScreen } from "./WelcomeScreen";
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
    if (!state.isOpen || !state.isPlaying || !state.hasStarted) return;

    const timeout = setTimeout(() => {
      setShowSkipButton(true);
    }, config.skipButtonDelay * 1000);

    return () => clearTimeout(timeout);
  }, [state.isOpen, state.isPlaying, state.hasStarted, state.currentIndex, config.skipButtonDelay]);

  // Video değişince skip butonunu sıfırla
  useEffect(() => {
    setShowSkipButton(false);
  }, [state.currentIndex]);

  const handleStart = useCallback(() => {
    dispatch({ type: "START_WITH_SOUND" });
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  const handleReady = useCallback(() => {
    dispatch({ type: "SET_READY", ready: true });
  }, [dispatch]);

  const handleProgress = useCallback(
    (progress: number, _duration: number) => {
      dispatch({ type: "SET_PROGRESS", progress });
    },
    [dispatch]
  );

  const handleVideoEnd = useCallback(() => {
    // Son video mu kontrol et
    const isLastVideo = state.currentIndex === totalVideos - 1;

    if (hasMultipleVideos && !isLastVideo) {
      // Sonraki videoya geç
      dispatch({ type: "NEXT_VIDEO" });
    } else {
      // Son video veya tek video - galeriyi kapat
      dispatch({ type: "CLOSE" });
    }
  }, [dispatch, hasMultipleVideos, state.currentIndex, totalVideos]);

  const handleNearEnd = useCallback(() => {
    // Son video değilse logo göster
    const isLastVideo = state.currentIndex === totalVideos - 1;
    if (hasMultipleVideos && !isLastVideo) {
      dispatch({ type: "TOGGLE_LOGO" });
    }
  }, [dispatch, hasMultipleVideos, state.currentIndex, totalVideos]);

  const handleSkip = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  const handleToggleMute = useCallback(() => {
    dispatch({ type: "TOGGLE_MUTE" });
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
    <AnimatePresence mode="wait">
      {state.isOpen && (
        <>
          {/* Hoşgeldiniz Ekranı - kullanıcı henüz başlatmadıysa */}
          {!state.hasStarted && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {/* Video Galeri - kullanıcı başlattıysa */}
          {state.hasStarted && currentVideo && (
            <VideoOverlay showLogo={state.showLogo}>
              {/* Video Player - key ile video değişince yeniden mount */}
              <VideoPlayer
                key={currentVideo.id}
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
                showSkipButton={showSkipButton}
                isMuted={state.isMuted}
                onClose={handleClose}
                onSkip={handleSkip}
                onToggleMute={handleToggleMute}
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
        </>
      )}
    </AnimatePresence>
  );
}
