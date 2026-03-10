"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { OttomanFrame, OttomanDivider } from "./OttomanBorder";

function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="font-['Cinzel'] text-3xl font-bold text-ottoman-gold md:text-4xl"
      >
        {isInView ? value : 0}
        {suffix}
      </motion.span>
      <p className="mt-1 font-['Source_Serif_4'] text-sm text-ottoman-navy/60">{label}</p>
    </div>
  );
}

export function Suhulet() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="suhulet"
      ref={ref}
      className="relative overflow-hidden bg-ottoman-navy px-6 py-20 md:py-32"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(201,168,76,0.3) 50px,
              rgba(201,168,76,0.3) 51px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Cinzel'] text-sm tracking-[0.3em] text-ottoman-gold/70"
          >
            DÜNYA DENİZCİLİK TARİHİNDE BİR İLK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-ottoman-parchment md:text-4xl lg:text-5xl"
          >
            Suhulet 26
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-2 font-['Source_Serif_4'] text-lg text-ottoman-gold"
          >
            Dünyanın İlk Arabalı Vapuru — 1872
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* SVG Technical Drawing */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <OttomanFrame className="bg-ottoman-parchment/5">
              <svg viewBox="0 0 400 250" className="w-full" fill="none">
                {/* Grid lines */}
                {Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="20"
                    y1={30 + i * 25}
                    x2="380"
                    y2={30 + i * 25}
                    stroke="#c9a84c"
                    strokeWidth="0.3"
                    opacity="0.15"
                  />
                ))}
                {Array.from({ length: 15 }, (_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={20 + i * 25}
                    y1="30"
                    x2={20 + i * 25}
                    y2="230"
                    stroke="#c9a84c"
                    strokeWidth="0.3"
                    opacity="0.15"
                  />
                ))}

                {/* Hull outline */}
                <motion.path
                  d="M60 180 L80 210 L320 210 L340 180 L330 160 L70 160 Z"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Deck */}
                <motion.rect
                  x="75" y="140" width="250" height="22" rx="2"
                  stroke="#c9a84c"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Cabin */}
                <motion.rect
                  x="110" y="105" width="180" height="37" rx="3"
                  stroke="#c9a84c"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Windows */}
                {Array.from({ length: 7 }, (_, i) => (
                  <motion.rect
                    key={`w-${i}`}
                    x={118 + i * 24}
                    y="112"
                    width="16"
                    height="10"
                    rx="1"
                    stroke="#c9a84c"
                    strokeWidth="0.8"
                    fill="rgba(201,168,76,0.1)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  />
                ))}

                {/* Smokestack */}
                <motion.rect
                  x="185" y="65" width="30" height="42" rx="2"
                  stroke="#c9a84c" strokeWidth="1" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 1.5 }}
                />

                {/* Vehicle ramps - the key innovation */}
                <motion.path
                  d="M60 165 L30 200"
                  stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 2 }}
                />
                <motion.path
                  d="M340 165 L370 200"
                  stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 2.2 }}
                />

                {/* Labels */}
                <motion.text
                  x="15" y="205" fontSize="8" fill="#c9a84c" opacity="0.7"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.7 } : {}}
                  transition={{ delay: 2.5 }}
                >
                  Rampa
                </motion.text>
                <motion.text
                  x="345" y="205" fontSize="8" fill="#c9a84c" opacity="0.7"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.7 } : {}}
                  transition={{ delay: 2.5 }}
                >
                  Rampa
                </motion.text>

                {/* Dimension line */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.5 } : {}}
                  transition={{ delay: 2.8 }}
                >
                  <line x1="60" y1="235" x2="340" y2="235" stroke="#c9a84c" strokeWidth="0.5" />
                  <line x1="60" y1="230" x2="60" y2="240" stroke="#c9a84c" strokeWidth="0.5" />
                  <line x1="340" y1="230" x2="340" y2="240" stroke="#c9a84c" strokeWidth="0.5" />
                  <text x="180" y="245" fontSize="8" fill="#c9a84c">~ 45 metre</text>
                </motion.g>
              </svg>
            </OttomanFrame>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-parchment/80 md:text-lg">
              Şirket-i Hayriye Müdürü{" "}
              <strong className="text-ottoman-gold">Hüseyin Haki Efendi</strong>,
              Boğaz&apos;da araç taşımacılığı için dünyanın ilk arabalı vapurunu
              tasarladı.
            </p>
            <p className="mt-4 font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-parchment/70">
              İki tarafında kıyıya indirilecek kapakları olan bu vapur, at arabaları ve
              askeri ağırlıkları rahatça taşıyabilecek genişlikteydi. 1872&apos;de
              Üsküdar-Kabataş hattında hizmete giren Suhulet, modern arabalı
              feribotların atası oldu.
            </p>
            <p className="mt-4 font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-parchment/70">
              Çanakkale Savaşı&apos;nda ise cepheye top taşıyarak stratejik bir rol
              üstlendi — bir ulaşım aracının savaş gemisine dönüştüğü eşsiz bir
              tarihî an.
            </p>

            <OttomanDivider className="my-8 opacity-30" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCounter value={1872} label="Hizmete Giriş" />
              <StatCounter value={77} label="Toplam Vapur" suffix="+" />
              <StatCounter value={30} label="İskele Sayısı" suffix="+" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
