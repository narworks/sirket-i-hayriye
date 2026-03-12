"use client";

import { motion } from "framer-motion";

interface VideoProgressProps {
  currentIndex: number;
  totalVideos: number;
  progress: number;
  onGoTo: (index: number) => void;
}

export function VideoProgress({
  currentIndex,
  totalVideos,
  progress,
  onGoTo,
}: VideoProgressProps) {
  if (totalVideos <= 1) return null;

  return (
    <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
      {Array.from({ length: totalVideos }).map((_, index) => (
        <button
          key={index}
          onClick={() => onGoTo(index)}
          className="group relative flex h-8 w-8 items-center justify-center"
          aria-label={`Video ${index + 1}`}
        >
          {/* Arka plan halka */}
          <span
            className={`absolute h-3 w-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-ottoman-gold"
                : "bg-white/30 group-hover:bg-white/50"
            }`}
          />

          {/* Aktif video için progress ring */}
          {index === currentIndex && (
            <svg className="absolute h-8 w-8 -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="rgba(201, 168, 76, 0.3)"
                strokeWidth="2"
              />
              <motion.circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={75.4}
                strokeDashoffset={75.4 - (75.4 * progress) / 100}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </svg>
          )}
        </button>
      ))}

      {/* Video sayacı */}
      <span className="ml-2 font-['Cinzel'] text-xs text-white/60">
        {currentIndex + 1}/{totalVideos}
      </span>
    </div>
  );
}
