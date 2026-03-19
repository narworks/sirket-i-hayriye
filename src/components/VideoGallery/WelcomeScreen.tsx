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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4 rounded-2xl border-2 border-white/30 bg-black/70 px-12 py-8 text-white shadow-2xl backdrop-blur-sm transition-all hover:border-white/50 hover:bg-black/80 md:bottom-20 md:gap-5 md:px-16 md:py-10"
      >
        {/* Ses ikonu - nabız animasyonu */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            className="h-14 w-14 md:h-20 md:w-20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </motion.div>

        {/* Yazı */}
        <span className="text-2xl font-bold tracking-wide md:text-3xl">
          SESİ AÇ
        </span>
      </motion.button>
    </motion.div>
  );
}
