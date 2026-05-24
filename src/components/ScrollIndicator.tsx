"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-mono">
        Scroll
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
