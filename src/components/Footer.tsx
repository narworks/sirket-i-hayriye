"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE_CONFIG, ISKELE_AVRUPA, ISKELE_ANADOLU } from "@/lib/constants";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer
      id="iletisim"
      ref={ref}
      className="sea-waves sea-reflection relative bg-ottoman-navy px-6 pt-16 pb-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* İskele Haritası */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="mb-6 text-center font-['Cinzel'] text-lg tracking-[0.2em] text-ottoman-gold/60 md:text-sm md:tracking-[0.3em]">
            İSKELE AĞI
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-['Cinzel'] text-base tracking-widest text-ottoman-parchment/60 md:text-xs">
                AVRUPA YAKASI
              </h4>
              <p className="font-['Source_Serif_4'] text-lg leading-loose text-ottoman-parchment/70 md:text-sm">
                {ISKELE_AVRUPA.join(" · ")}
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-['Cinzel'] text-base tracking-widest text-ottoman-parchment/60 md:text-xs">
                ANADOLU YAKASI
              </h4>
              <p className="font-['Source_Serif_4'] text-lg leading-loose text-ottoman-parchment/70 md:text-sm">
                {ISKELE_ANADOLU.join(" · ")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-ottoman-gold/20 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <span className="font-['Cinzel'] text-lg tracking-wider text-ottoman-parchment/80">
              {SITE_CONFIG.name}
            </span>
            <span className="ml-2 font-['Cinzel'] text-sm text-ottoman-gold/50">
              {SITE_CONFIG.year} – ∞
            </span>
          </div>

          <p className="font-['Source_Serif_4'] text-base text-ottoman-parchment/50 md:text-xs">
            Osmanlı Denizcilik Tarihine Saygıyla
          </p>
        </div>
      </div>
    </footer>
  );
}
