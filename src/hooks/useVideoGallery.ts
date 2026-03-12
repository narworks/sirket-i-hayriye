"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import type { VideoGalleryState, VideoGalleryAction } from "@/lib/types";
import { VIDEO_GALLERY_CONFIG, GALLERY_VIDEOS } from "@/lib/constants";

const initialState: VideoGalleryState = {
  isOpen: true, // Her zaman açık başla
  currentIndex: 0,
  isPlaying: true,
  isMuted: VIDEO_GALLERY_CONFIG.defaultMuted,
  volume: 0.8,
  showLogo: true,
  isReady: false,
  progress: 0,
};

function videoGalleryReducer(
  state: VideoGalleryState,
  action: VideoGalleryAction
): VideoGalleryState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true, isPlaying: true };
    case "CLOSE":
      return { ...state, isOpen: false, isPlaying: false };
    case "NEXT_VIDEO":
      const nextIndex = (state.currentIndex + 1) % GALLERY_VIDEOS.length;
      return {
        ...state,
        currentIndex: nextIndex,
        progress: 0,
        showLogo: true,
      };
    case "PREV_VIDEO":
      const prevIndex =
        state.currentIndex === 0
          ? GALLERY_VIDEOS.length - 1
          : state.currentIndex - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        progress: 0,
        showLogo: true,
      };
    case "GO_TO_VIDEO":
      return {
        ...state,
        currentIndex: action.index,
        progress: 0,
        showLogo: true,
      };
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "SET_VOLUME":
      return { ...state, volume: action.volume, isMuted: action.volume === 0 };
    case "SET_READY":
      return { ...state, isReady: action.ready };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "TOGGLE_LOGO":
      return { ...state, showLogo: !state.showLogo };
    default:
      return state;
  }
}

export function useVideoGallery() {
  const [state, dispatch] = useReducer(videoGalleryReducer, initialState);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ses tercihini localStorage'dan yükle
  useEffect(() => {
    const savedMuted = localStorage.getItem(VIDEO_GALLERY_CONFIG.storageKey);
    if (savedMuted !== null) {
      dispatch({
        type: savedMuted === "true" ? "TOGGLE_MUTE" : "TOGGLE_MUTE",
      });
    }
  }, []);

  // Ses tercihini kaydet
  useEffect(() => {
    localStorage.setItem(
      VIDEO_GALLERY_CONFIG.storageKey,
      String(state.isMuted)
    );
  }, [state.isMuted]);

  // Klavye kontrolleri
  useEffect(() => {
    if (!state.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          dispatch({ type: "CLOSE" });
          break;
        case "ArrowRight":
          dispatch({ type: "NEXT_VIDEO" });
          break;
        case "ArrowLeft":
          dispatch({ type: "PREV_VIDEO" });
          break;
        case " ":
          e.preventDefault();
          dispatch({ type: "TOGGLE_PLAY" });
          break;
        case "m":
        case "M":
          dispatch({ type: "TOGGLE_MUTE" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen]);

  // Scroll lock
  useEffect(() => {
    if (state.isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [state.isOpen]);

  // Ses fade out fonksiyonu
  const startAudioFadeOut = useCallback(
    (playerRef: { setVolume?: (vol: number) => void } | null) => {
      if (!playerRef?.setVolume || state.isMuted) return;

      let currentVolume = state.volume;
      const steps = 20;
      const stepDuration =
        (VIDEO_GALLERY_CONFIG.fadeOutDuration * 1000) / steps;
      const volumeStep = currentVolume / steps;

      fadeIntervalRef.current = setInterval(() => {
        currentVolume -= volumeStep;
        if (currentVolume <= 0) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
          dispatch({ type: "NEXT_VIDEO" });
          // Volume'u geri yükle
          setTimeout(() => {
            playerRef.setVolume?.(state.volume);
          }, 100);
        } else {
          playerRef.setVolume?.(currentVolume);
        }
      }, stepDuration);
    },
    [state.volume, state.isMuted]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const currentVideo = GALLERY_VIDEOS[state.currentIndex];
  const totalVideos = GALLERY_VIDEOS.length;
  const hasMultipleVideos = totalVideos > 1;

  return {
    state,
    dispatch,
    currentVideo,
    totalVideos,
    hasMultipleVideos,
    startAudioFadeOut,
    config: VIDEO_GALLERY_CONFIG,
  };
}
