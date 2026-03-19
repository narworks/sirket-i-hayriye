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
    <div className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 md:bottom-20">
      {Array.from({ length: totalVideos }).map((_, index) => (
        <button
          key={index}
          onClick={() => onGoTo(index)}
          className="group relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
          aria-label={`Video ${index + 1}`}
        >
          {/* Arka plan halka */}
          <span
            className={`absolute h-5 w-5 rounded-full transition-all md:h-6 md:w-6 ${
              index === currentIndex
                ? "bg-ottoman-gold"
                : "bg-white/40 group-hover:bg-white/60"
            }`}
          />

          {/* Aktif video için progress ring */}
          {index === currentIndex && (
            <svg className="absolute h-14 w-14 -rotate-90 md:h-16 md:w-16">
              <circle
                cx="50%"
                cy="50%"
                r="24"
                fill="none"
                stroke="rgba(201, 168, 76, 0.3)"
                strokeWidth="3"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="24"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={150.8}
                strokeDashoffset={150.8 - (150.8 * progress) / 100}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </svg>
          )}
        </button>
      ))}

      {/* Video sayacı */}
      <span className="ml-3 font-['Cinzel'] text-sm text-white/70 md:text-base">
        {currentIndex + 1}/{totalVideos}
      </span>
    </div>
  );
}
