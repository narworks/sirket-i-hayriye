"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface VideoControlsProps {
  showSkipButton: boolean;
  onClose: () => void;
  onSkip: () => void;
}

export function VideoControls({
  showSkipButton,
  onClose,
  onSkip,
}: VideoControlsProps) {
  const [showControls, setShowControls] = useState(true);

  // Mouse hareketsizse kontrolleri gizle
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove(); // İlk gösterim

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          {/* Sağ üst - Kapat butonu */}
          <div className="pointer-events-auto absolute top-6 right-6">
            <button
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-ottoman-red/80"
              aria-label="Galeriyi kapat"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sağ alt - Atla butonu */}
          <AnimatePresence>
            {showSkipButton && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={onSkip}
                className="pointer-events-auto absolute right-6 bottom-24 flex items-center gap-2 rounded-full bg-black/50 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <span className="font-['Source_Serif_4'] text-sm">Atla</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
