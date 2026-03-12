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
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Logo yazısı */}
              <motion.h1
                className="font-['Playfair_Display'] text-4xl font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl"
                style={{
                  textShadow: "0 0 40px rgba(201, 168, 76, 0.5)",
                }}
              >
                Şirket-i Hayriye
              </motion.h1>
              <motion.p
                className="mt-4 font-['Cinzel'] text-xl tracking-[0.5em] text-ottoman-gold md:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                • 1851 •
              </motion.p>
            </div>

            {/* Dekoratif köşeler */}
            <div className="absolute top-1/2 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 md:h-80 md:w-[500px]">
              <div className="absolute -top-4 -left-4 h-8 w-8 border-t-2 border-l-2 border-ottoman-gold/50" />
              <div className="absolute -top-4 -right-4 h-8 w-8 border-t-2 border-r-2 border-ottoman-gold/50" />
              <div className="absolute -bottom-4 -left-4 h-8 w-8 border-b-2 border-l-2 border-ottoman-gold/50" />
              <div className="absolute -bottom-4 -right-4 h-8 w-8 border-b-2 border-r-2 border-ottoman-gold/50" />
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
