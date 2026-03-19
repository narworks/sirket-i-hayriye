"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useVideoGallery } from "@/hooks/useVideoGallery";
import { WelcomeScreen } from "./WelcomeScreen";
import { VideoOverlay } from "./VideoOverlay";
import { VideoPlayer, VideoPlayerHandle } from "./VideoPlayer";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";

export function VideoGallery() {
  const {
    state,
    dispatch,
    currentVideo,
    totalVideos,
    hasMultipleVideos,
  } = useVideoGallery();

  const [isMounted, setIsMounted] = useState(false);
  const [videoChangeCount, setVideoChangeCount] = useState(0); // Her video değişiminde artır
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Video değişince sayacı artır
  useEffect(() => {
    setVideoChangeCount((c) => c + 1);
  }, [state.currentIndex]);

  // Kullanıcı "Sesi Aç" tıkladığında - DOĞRUDAN user gesture içinde play() çağır
  const handleStart = useCallback(() => {
    // Önce video player'a play komutu gönder (user gesture context)
    if (videoPlayerRef.current) {
      videoPlayerRef.current.play();
    }
    // Sonra state'i güncelle
    dispatch({ type: "START_WITH_SOUND" });
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

  const handleToggleMute = useCallback(() => {
    // Sadece state'i güncelle, VideoPlayer useEffect ile takip edecek
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
      {state.isOpen && currentVideo && (
        <VideoOverlay showLogo={state.showLogo}>
          {/* Video Player - key ile video değişince yeniden mount */}
          <VideoPlayer
            ref={videoPlayerRef}
            key={`${currentVideo.id}-${videoChangeCount}`}
            video={currentVideo}
            isPlaying={state.isPlaying}
            isMuted={state.isMuted}
            hasStarted={state.hasStarted}
            volume={state.volume}
            onReady={handleReady}
            onProgress={handleProgress}
            onEnded={handleVideoEnd}
            onNearEnd={handleNearEnd}
          />

          {/* Sesi Aç Overlay - kullanıcı henüz sesi açmadıysa */}
          <AnimatePresence>
            {!state.hasStarted && (
              <WelcomeScreen onStart={handleStart} />
            )}
          </AnimatePresence>

          {/* Kontroller - sadece ses açıldıktan sonra göster */}
          {state.hasStarted && (
            <VideoControls
              isMuted={state.isMuted}
              onToggleMute={handleToggleMute}
            />
          )}

          {/* İlerleme Göstergesi - sadece ses açıldıktan sonra göster */}
          {state.hasStarted && (
            <VideoProgress
              currentIndex={state.currentIndex}
              totalVideos={totalVideos}
              progress={state.progress}
              onGoTo={handleGoToVideo}
            />
          )}
        </VideoOverlay>
      )}
    </AnimatePresence>
  );
}
