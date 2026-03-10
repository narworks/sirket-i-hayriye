"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TIMELINE_EVENTS } from "@/lib/constants";
import { OttomanDivider } from "./OttomanBorder";

function TimelineItem({
  event,
  index,
}: {
  event: (typeof TIMELINE_EVENTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex w-full items-start">
      {/* Desktop: alternating layout */}
      <div className={`hidden w-full md:flex ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-5/12"
        >
          <div
            className={`rounded-sm border border-ottoman-gold/20 bg-ottoman-cream/60 p-6 backdrop-blur-sm ${
              isLeft ? "text-right" : "text-left"
            }`}
          >
            <span className="font-['Cinzel'] text-sm tracking-widest text-ottoman-gold">
              {event.year}
            </span>
            <h3 className="mt-1 font-['Playfair_Display'] text-xl font-semibold text-ottoman-navy">
              {event.title}
            </h3>
            <p className="mt-2 font-['Source_Serif_4'] text-sm leading-relaxed text-ottoman-navy/65">
              {event.description}
            </p>
          </div>
        </motion.div>

        {/* Center line + dot */}
        <div className="flex w-2/12 flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              event.highlight
                ? "border-ottoman-gold bg-ottoman-gold text-white"
                : "border-ottoman-gold/50 bg-ottoman-parchment text-ottoman-gold"
            }`}
          >
            <span className="text-xs font-bold">{event.year.slice(2)}</span>
          </motion.div>
        </div>

        {/* Spacer */}
        <div className="w-5/12" />
      </div>

      {/* Mobile: single column */}
      <div className="flex w-full md:hidden">
        {/* Left line + dot */}
        <div className="mr-4 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
              event.highlight
                ? "border-ottoman-gold bg-ottoman-gold text-white"
                : "border-ottoman-gold/50 bg-ottoman-parchment text-ottoman-gold"
            }`}
          >
            <span className="text-[10px] font-bold">{event.year.slice(2)}</span>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 pb-8"
        >
          <span className="font-['Cinzel'] text-xs tracking-widest text-ottoman-gold">
            {event.year}
          </span>
          <h3 className="mt-1 font-['Playfair_Display'] text-lg font-semibold text-ottoman-navy">
            {event.title}
          </h3>
          <p className="mt-2 font-['Source_Serif_4'] text-sm leading-relaxed text-ottoman-navy/60">
            {event.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="tarihce" className="relative bg-parchment-texture px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-['Cinzel'] text-sm tracking-[0.3em] text-ottoman-gold"
          >
            TARİHÇE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-ottoman-navy md:text-4xl lg:text-5xl"
          >
            Bir İmparatorluğun
            <br />
            <span className="text-gradient-gold">Deniz Yolculuğu</span>
          </motion.h2>
          <OttomanDivider className="mx-auto mt-6 max-w-xs" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ottoman-gold/30 to-transparent md:block" />

          {/* Vertical line - mobile */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-gradient-to-b from-transparent via-ottoman-gold/30 to-transparent md:hidden" />

          <div className="flex flex-col gap-8 md:gap-12">
            {TIMELINE_EVENTS.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
