"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/Section-1-clip.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <motion.span
              className="block text-xs tracking-[0.4em] uppercase text-zinc-400 font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Formula 1 · 2025 Season
            </motion.span>

            <motion.h1
              className="text-6xl md:text-[7rem] lg:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-white"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Born from
              <br />
              <span className="text-zinc-500">the Asphalt</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Where engineering meets art. A new era of motorsport excellence, redefined for those who chase the limit.
            </motion.p>

            <motion.button
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 rounded-full text-sm tracking-widest uppercase text-zinc-300 hover:bg-white/5 hover:border-zinc-500 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Explore the Machine
            </motion.button>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  );
}
