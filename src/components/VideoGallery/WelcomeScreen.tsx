"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { OttomanCorner, OttomanDivider } from "@/components/OttomanBorder";
import { SteamshipSVG } from "@/components/SteamshipSVG";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ottoman-parchment"
    >
      {/* Vignette efekti */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(44, 24, 16, 0.3) 100%)
          `,
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dekoratif köşeler */}
      <OttomanCorner className="absolute top-4 left-4 h-20 w-20 md:top-8 md:left-8 md:h-28 md:w-28" rotate={0} />
      <OttomanCorner className="absolute top-4 right-4 h-20 w-20 md:top-8 md:right-8 md:h-28 md:w-28" rotate={90} />
      <OttomanCorner className="absolute bottom-4 left-4 h-20 w-20 md:bottom-8 md:left-8 md:h-28 md:w-28" rotate={270} />
      <OttomanCorner className="absolute bottom-4 right-4 h-20 w-20 md:bottom-8 md:right-8 md:h-28 md:w-28" rotate={180} />

      {/* Ana içerik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 px-6 md:flex-row md:gap-12 lg:gap-16"
      >
        {/* Sol Panel - Portre */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Portre çerçevesi */}
          <div className="relative">
            {/* Altın glow efekti */}
            <div className="absolute -inset-2 rounded-full bg-ottoman-gold/20 blur-xl" />

            {/* Portre */}
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-ottoman-gold shadow-lg shadow-ottoman-gold/30 md:h-48 md:w-48 lg:h-56 lg:w-56">
              <Image
                src="/images/portre-huseyin-haki.jpg"
                alt="Hüseyin Haki Efendi"
                fill
                className="object-cover sepia-[0.2] contrast-[1.05]"
                priority
              />
            </div>

            {/* Köşe dekorasyonları */}
            <div className="absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2 border-ottoman-gold-dark md:h-8 md:w-8" />
            <div className="absolute -top-1 -right-1 h-6 w-6 border-t-2 border-r-2 border-ottoman-gold-dark md:h-8 md:w-8" />
            <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-ottoman-gold-dark md:h-8 md:w-8" />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-ottoman-gold-dark md:h-8 md:w-8" />
          </div>

          {/* İsim ve tarih */}
          <div className="mt-4 text-center">
            <p className="font-['Cinzel'] text-sm font-semibold tracking-wide text-ottoman-ink md:text-base">
              HÜSEYİN HAKİ EFENDİ
            </p>
            <p className="mt-1 font-['Source_Serif_4'] text-xs text-ottoman-ink/60 md:text-sm">
              1867 — 1894
            </p>
          </div>
        </motion.div>

        {/* Sağ Panel - İçerik */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-1 flex-col items-center text-center md:items-start md:text-left"
        >
          {/* Başlık */}
          <h1
            className="font-['Playfair_Display'] text-4xl font-bold text-ottoman-ink md:text-5xl lg:text-6xl"
            style={{
              textShadow: "2px 2px 4px rgba(201, 168, 76, 0.2)",
            }}
          >
            Şirket-i Hayriye
          </h1>

          {/* Alt başlık - 1851 */}
          <p className="mt-3 font-['Cinzel'] text-xl tracking-[0.4em] text-ottoman-gold md:text-2xl">
            • 1851 •
          </p>

          {/* Tagline */}
          <p className="mt-6 max-w-md font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-ink/80 md:text-lg">
            Boğaz&apos;ın İki Yakasını Birleştiren İlk Modern Ulaşım Sistemi
          </p>

          {/* Açıklama */}
          <p className="mt-4 max-w-md font-['Source_Serif_4'] text-sm leading-relaxed text-ottoman-ink/60 md:text-base">
            Osmanlı İmparatorluğu&apos;nun ilk anonim şirketi ve dünyanın ilk arabalı vapurunun mucidi
          </p>

          {/* Başlat butonu */}
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative mt-8 overflow-hidden rounded-full border-2 border-ottoman-gold bg-ottoman-gold/10 px-10 py-4 font-['Cinzel'] text-base tracking-wider text-ottoman-gold-dark transition-all hover:bg-ottoman-gold hover:text-white md:text-lg"
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
              Başlat
            </span>
          </motion.button>

          {/* Alt bilgi */}
          <p className="mt-4 font-['Source_Serif_4'] text-xs text-ottoman-ink/40 md:text-sm">
            Sesli video deneyimi için tıklayın
          </p>
        </motion.div>
      </motion.div>

      {/* Alt bölüm - Vapur */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-4 left-0 right-0 flex flex-col items-center md:bottom-8"
      >
        {/* Ayırıcı */}
        <OttomanDivider className="w-full max-w-3xl px-8" />

        {/* Vapur */}
        <SteamshipSVG className="h-16 w-auto opacity-60 md:h-20" />

        {/* Vapur başlığı */}
        <p className="mt-2 font-['Cinzel'] text-xs tracking-widest text-ottoman-ink/40 md:text-sm">
          SUHULET • 1872
        </p>
      </motion.div>
    </motion.div>
  );
}
