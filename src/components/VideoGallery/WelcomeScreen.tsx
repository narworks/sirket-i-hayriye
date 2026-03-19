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
