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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      {/* Arka plan deseni */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* İçerik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Logo */}
        <div className="mb-8">
          <h1
            className="font-['Playfair_Display'] text-4xl font-bold text-white md:text-6xl"
            style={{
              textShadow: "0 0 40px rgba(201, 168, 76, 0.5)",
            }}
          >
            Şirket-i Hayriye
          </h1>
          <p className="mt-4 font-['Cinzel'] text-xl tracking-[0.5em] text-ottoman-gold md:text-2xl">
            • 1851 •
          </p>
        </div>

        {/* Açıklama */}
        <p className="mb-10 max-w-md font-['Source_Serif_4'] text-lg text-white/70 md:text-xl">
          Osmanlı İmparatorluğu&apos;nun ilk anonim şirketi ve Boğaziçi&apos;nin
          efsanevi vapurları
        </p>

        {/* Başlat butonu */}
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden rounded-full border-2 border-ottoman-gold bg-transparent px-10 py-4 font-['Cinzel'] text-lg tracking-wider text-ottoman-gold transition-all hover:bg-ottoman-gold hover:text-black"
        >
          <span className="relative z-10 flex items-center gap-3">
            {/* Play icon */}
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Deneyimi Başlat
          </span>
        </motion.button>

        {/* Alt bilgi */}
        <p className="mt-8 font-['Source_Serif_4'] text-sm text-white/40">
          Sesli video deneyimi için tıklayın
        </p>
      </motion.div>

      {/* Dekoratif köşeler */}
      <div className="pointer-events-none absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-ottoman-gold/30" />
      <div className="pointer-events-none absolute top-8 right-8 h-16 w-16 border-r-2 border-t-2 border-ottoman-gold/30" />
      <div className="pointer-events-none absolute bottom-8 left-8 h-16 w-16 border-l-2 border-b-2 border-ottoman-gold/30" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-ottoman-gold/30" />
    </motion.div>
  );
}
