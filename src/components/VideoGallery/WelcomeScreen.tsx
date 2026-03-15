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
      {/* Yatay cihazlar için görsel (landscape) */}
      <Image
        src="/images/welcome-screen.jpg"
        alt="Şirket-i Hayriye - 1851"
        fill
        className="hidden object-contain landscape:block"
        priority
        sizes="100vw"
      />

      {/* Dikey cihazlar için görsel (portrait) */}
      <Image
        src="/images/welcome-screen-vertical.png"
        alt="Şirket-i Hayriye - 1851"
        fill
        className="block object-contain landscape:hidden"
        priority
        sizes="100vw"
      />

      {/* Tam ekran tıklanabilir alan */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        aria-label="Başlat"
      />
    </motion.div>
  );
}
