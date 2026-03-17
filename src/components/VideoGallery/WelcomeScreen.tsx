"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Tıklanabilir alan */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-4 rounded-2xl border-2 border-white/30 bg-white/10 px-12 py-10 text-white transition-all hover:border-white/50 hover:bg-white/20 md:gap-6 md:px-16 md:py-12"
        aria-label="Sesi Aç"
      >
        {/* Ses ikonu */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            className="h-16 w-16 md:h-24 md:w-24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Speaker icon */}
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </motion.div>

        {/* Yazı */}
        <span className="text-2xl font-bold tracking-wide md:text-4xl">
          SESİ AÇ
        </span>

        {/* Alt yazı */}
        <span className="text-sm text-white/70 md:text-base">
          Deneyimi başlatmak için tıklayın
        </span>
      </motion.button>
    </motion.div>
  );
}
