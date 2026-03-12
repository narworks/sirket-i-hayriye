"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface VideoOverlayProps {
  showLogo: boolean;
  children: React.ReactNode;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" as const },
  },
  pulse: {
    opacity: [1, 0.7, 1],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
  },
};

export function VideoOverlay({ showLogo, children }: VideoOverlayProps) {
  const [logoState, setLogoState] = useState<"hidden" | "visible" | "pulse">(
    "hidden"
  );

  useEffect(() => {
    if (showLogo) {
      setLogoState("visible");
      // 2 saniye sonra pulse moduna geç
      const timeout = setTimeout(() => {
        setLogoState("pulse");
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setLogoState("hidden");
    }
  }, [showLogo]);

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] bg-black"
    >
      {/* Video içeriği */}
      <div className="absolute inset-0 overflow-hidden">{children}</div>

      {/* Logo katmanı */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate={logoState}
            exit="hidden"
            className="pointer-events-none absolute top-6 left-6 z-20"
          >
            {/* Logo container with dark background */}
            <div className="rounded-xl border border-ottoman-gold/30 bg-black/80 px-8 py-5 shadow-2xl backdrop-blur-md">
              <h1
                className="font-['Playfair_Display'] text-2xl font-bold text-white md:text-3xl"
                style={{
                  textShadow: "0 0 30px rgba(201, 168, 76, 0.6)",
                }}
              >
                Şirket-i Hayriye
              </h1>
              <p className="mt-2 font-['Cinzel'] text-base tracking-[0.4em] text-ottoman-gold md:text-lg">
                • 1851 •
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlay (üst ve alt) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </motion.div>
  );
}
