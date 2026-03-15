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
      {/* Arka plan görseli */}
      <Image
        src="/images/welcome-screen.jpg"
        alt="Şirket-i Hayriye - 1851"
        fill
        className="object-contain"
        priority
        sizes="100vw"
      />

      {/* Tıklanabilir BAŞLAT butonu - görseldeki butonun üzerine konumlandırılmış */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="absolute bottom-[4%] left-1/2 z-10 h-[5%] w-[12%] -translate-x-1/2 cursor-pointer rounded-sm bg-transparent transition-all hover:bg-white/10 md:bottom-[5%] md:h-[6%] md:w-[10%]"
        aria-label="Başlat"
      />

      {/* Hover efekti için subtle glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pointer-events-none absolute bottom-[4%] left-1/2 z-[5] h-[5%] w-[12%] -translate-x-1/2 animate-pulse rounded-sm bg-white/5 md:bottom-[5%] md:h-[6%] md:w-[10%]"
      />
    </motion.div>
  );
}
