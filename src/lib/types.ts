// Video Galeri Tipleri

export interface VideoContent {
  id: string;
  title: string;
  description?: string;
  url: string; // YouTube veya Vimeo URL
  duration?: number; // saniye cinsinden
  thumbnailUrl?: string;
  year?: string;
}

export interface VideoGalleryConfig {
  autoPlay: boolean;
  showOnEveryVisit: boolean;
  defaultMuted: boolean;
  fadeOutDuration: number; // saniye
  crossfadeDuration: number; // saniye
  skipButtonDelay: number; // saniye
  storageKey: string;
}

export interface VideoGalleryState {
  isOpen: boolean;
  currentIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  showLogo: boolean;
  isReady: boolean;
  progress: number; // 0-100
}

export type VideoGalleryAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "NEXT_VIDEO" }
  | { type: "PREV_VIDEO" }
  | { type: "GO_TO_VIDEO"; index: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_READY"; ready: boolean }
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "TOGGLE_LOGO" };
