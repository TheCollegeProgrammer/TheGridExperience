"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DriveModalProps {
  onClose: () => void;
}

export default function DriveModal({ onClose }: DriveModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[90vw] max-h-[90vh] aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.05)]"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/drive.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <div className="absolute bottom-8 left-8 pointer-events-none">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">
            RB25 — Precision Engineered
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white/90 hover:scale-105 transition-all duration-300 z-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
