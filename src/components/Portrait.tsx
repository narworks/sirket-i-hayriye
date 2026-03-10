"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { OttomanDivider } from "./OttomanBorder";

export function Portrait() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="huseyin-haki"
      ref={ref}
      className="relative bg-parchment-texture px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-5 md:items-center">
          {/* Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:col-span-2"
          >
            <div className="relative">
              {/* Ornate frame */}
              <div className="relative overflow-hidden rounded-full border-4 border-ottoman-gold/40 p-2">
                <div className="overflow-hidden rounded-full border-2 border-ottoman-gold/20 bg-ottoman-navy/10">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full md:h-72 md:w-72">
                    <Image
                      src="/images/portre-huseyin-haki.jpg"
                      alt="Hüseyin Haki Efendi - Şirket-i Hayriye Müdürü (1867-1894)"
                      fill
                      className="object-cover object-top sepia-[0.3] contrast-[1.1]"
                      sizes="(max-width: 768px) 224px, 288px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 h-6 w-6 border-t-2 border-l-2 border-ottoman-gold/30" />
              <div className="absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-ottoman-gold/30" />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-ottoman-gold/30" />
              <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-ottoman-gold/30" />
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3"
          >
            <span className="font-['Cinzel'] text-sm tracking-[0.3em] text-ottoman-gold">
              VİZYONER LİDER
            </span>
            <h2 className="mt-2 font-['Playfair_Display'] text-3xl font-bold text-ottoman-navy md:text-4xl">
              Hüseyin Haki Efendi
            </h2>
            <p className="mt-1 font-['Cinzel'] text-base text-ottoman-navy/50">
              Şirket-i Hayriye Müdürü — 1867 – 1894
            </p>

            <OttomanDivider className="my-6 max-w-xs" />

            <div className="space-y-4 font-['Source_Serif_4'] text-base leading-relaxed text-ottoman-navy/70">
              <p>
                Hüseyin Haki Efendi, 1867 yılında Osmanlı&apos;nın ilk anonim kuruluşu
                Şirket-i Hayriye&apos;ye yönetici olarak atandığında, Boğaz&apos;ın iki
                yakası arasında yolcu ve arabaların taşınması için devrimci bir proje
                geliştirdi.
              </p>
              <p>
                Vapurun inşa ettirmek istediği Suhulet&apos;in planlarını hazırlatmak için
                baş mimarını Londra&apos;ya gönderdi. O tarihte İngiltere&apos;de karşıdan
                karşıya halat ve zincirli sallarla aktarım yapılmaktaydı. Hüseyin Haki Bey
                ihtiyacı tespit edip dünyanın ilk arabalı vapur projesini &apos;Suhulet
                26&apos; adıyla hayata geçirdi.
              </p>
              <p>
                27 yıllık müdürlüğü süresince filosunu 77 vapura çıkardı ve
                Boğaziçi&apos;nin modern deniz ulaşım altyapısını kurarak İstanbul&apos;un
                ulaşım tarihini kalıcı olarak değiştirdi.
              </p>
            </div>

            {/* Highlight Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 border-l-2 border-ottoman-gold/40 pl-6"
            >
              <p className="font-['Playfair_Display'] text-lg italic text-ottoman-navy/60">
                &ldquo;İki kıtayı bir vapurla birleştiren adam&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
