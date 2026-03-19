"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#d4c4a8]"
    >
      {/* Giriş görseli */}
      <Image
        src="/images/welcome.png"
        alt="Şirket-i Hayriye - 1851"
        fill
        className="object-contain"
        priority
        sizes="100vw"
      />

      {/* Tam ekran tıklanabilir alan */}
      <button
        onClick={onStart}
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        aria-label="Başlat"
      />

      {/* Sesi Aç butonu - alt orta */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full border-2 border-ottoman-gold/60 bg-ottoman-navy/90 px-10 py-5 text-ottoman-parchment shadow-2xl backdrop-blur-sm transition-all hover:border-ottoman-gold hover:bg-ottoman-navy md:bottom-24 md:px-12 md:py-6"
      >
        <svg
          className="h-8 w-8 md:h-10 md:w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
        <span className="font-['Playfair_Display'] text-xl font-semibold tracking-wide md:text-2xl">
          Sesi Aç
        </span>
      </motion.button>
    </motion.div>
  );
}
