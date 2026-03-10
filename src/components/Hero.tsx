"use client";

import { motion } from "framer-motion";
import { SteamshipSVG } from "./SteamshipSVG";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-parchment-texture px-6">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Faded map texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2744' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(245,239,224,0.5)_70%,rgba(245,239,224,0.9)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Tugra / Emblem area */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <svg viewBox="0 0 80 50" className="mx-auto h-12 w-20 text-ottoman-gold" fill="currentColor" opacity="0.6">
            <ellipse cx="40" cy="25" rx="35" ry="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="40" cy="25" rx="25" ry="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M25 25 Q32 15, 40 20 Q48 25, 55 18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="40" cy="25" r="3" fill="currentColor" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-['Playfair_Display'] text-5xl font-bold leading-tight tracking-tight text-ottoman-navy sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Şirket-i
          <br />
          <span className="text-gradient-gold">Hayriye</span>
        </motion.h1>

        {/* Year */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-ottoman-gold/50" />
          <span className="font-['Cinzel'] text-2xl tracking-[0.3em] text-ottoman-gold md:text-3xl">
            {SITE_CONFIG.year}
          </span>
          <div className="h-px w-12 bg-ottoman-gold/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 max-w-xl font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-navy/70 sm:text-lg md:text-xl"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        {/* Steamship Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
          className="mt-10 w-full max-w-md md:max-w-lg"
        >
          <SteamshipSVG className="h-auto w-full" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-['Source_Serif_4'] text-xs tracking-widest text-ottoman-navy/40 uppercase">
              Keşfet
            </span>
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              className="text-ottoman-gold/50"
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="28"
                rx="9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <motion.circle
                cx="10"
                cy="10"
                r="3"
                fill="currentColor"
                animate={{ cy: [8, 18, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
