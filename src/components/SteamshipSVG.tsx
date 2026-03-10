"use client";

import { motion } from "framer-motion";

export function SteamshipSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hull */}
      <motion.path
        d="M50 140 L70 170 L330 170 L350 140 L320 140 L310 155 L90 155 L80 140 Z"
        fill="#1a2744"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Deck */}
      <rect x="85" y="120" width="230" height="22" rx="2" fill="#2a3d5c" />

      {/* Cabin */}
      <rect x="120" y="90" width="160" height="32" rx="3" fill="#1a2744" />
      <rect x="125" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="150" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="175" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="200" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="225" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="250" y="95" width="20" height="12" rx="1" fill="#c9a84c" opacity="0.4" />

      {/* Smokestack */}
      <rect x="185" y="50" width="30" height="42" rx="2" fill="#c9a84c" />
      <rect x="182" y="46" width="36" height="8" rx="2" fill="#a88a2e" />

      {/* Smoke */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.circle
          cx="200" cy="35" r="8"
          fill="#8b8b8b"
          opacity="0.3"
          animate={{ y: [-5, -20], opacity: [0.3, 0], scale: [1, 2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="210" cy="30" r="6"
          fill="#8b8b8b"
          opacity="0.2"
          animate={{ y: [-5, -25], opacity: [0.2, 0], scale: [1, 2.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        <motion.circle
          cx="195" cy="32" r="5"
          fill="#8b8b8b"
          opacity="0.25"
          animate={{ y: [-5, -22], opacity: [0.25, 0], scale: [1, 2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
      </motion.g>

      {/* Paddle Wheel */}
      <circle cx="200" cy="145" r="18" stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.5" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 145px" }}
      >
        <line x1="200" y1="127" x2="200" y2="163" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        <line x1="182" y1="145" x2="218" y2="145" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        <line x1="187" y1="132" x2="213" y2="158" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        <line x1="213" y1="132" x2="187" y2="158" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      </motion.g>

      {/* Mast */}
      <line x1="140" y1="55" x2="140" y2="92" stroke="#2a3d5c" strokeWidth="2" />
      {/* Flag */}
      <motion.path
        d="M140 55 L160 62 L140 70"
        fill="#8b0000"
        animate={{ d: ["M140 55 L160 62 L140 70", "M140 55 L158 63 L140 70", "M140 55 L160 62 L140 70"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Water line */}
      <motion.path
        d="M20 175 Q60 168, 100 175 Q140 182, 180 175 Q220 168, 260 175 Q300 182, 340 175 Q360 168, 380 175"
        stroke="#1e6fa0"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        animate={{
          d: [
            "M20 175 Q60 168, 100 175 Q140 182, 180 175 Q220 168, 260 175 Q300 182, 340 175 Q360 168, 380 175",
            "M20 175 Q60 182, 100 175 Q140 168, 180 175 Q220 182, 260 175 Q300 168, 340 175 Q360 182, 380 175",
            "M20 175 Q60 168, 100 175 Q140 182, 180 175 Q220 168, 260 175 Q300 182, 340 175 Q360 168, 380 175",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
