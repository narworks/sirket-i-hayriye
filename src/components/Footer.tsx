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
      className="relative bg-ottoman-navy px-6 pt-16 pb-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* İskele Haritası */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="mb-6 text-center font-['Cinzel'] text-sm tracking-[0.3em] text-ottoman-gold/60">
            İSKELE AĞI
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-['Cinzel'] text-xs tracking-widest text-ottoman-parchment/40">
                AVRUPA YAKASI
              </h4>
              <p className="font-['Source_Serif_4'] text-sm leading-loose text-ottoman-parchment/50">
                {ISKELE_AVRUPA.join(" · ")}
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-['Cinzel'] text-xs tracking-widest text-ottoman-parchment/40">
                ANADOLU YAKASI
              </h4>
              <p className="font-['Source_Serif_4'] text-sm leading-loose text-ottoman-parchment/50">
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

          <p className="font-['Source_Serif_4'] text-xs text-ottoman-parchment/30">
            Osmanlı Denizcilik Tarihine Saygıyla
          </p>
        </div>
      </div>
    </footer>
  );
}
