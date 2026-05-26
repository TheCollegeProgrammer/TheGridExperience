"use client";

import { motion } from "framer-motion";

export default function BottomQuote() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute bottom-0 left-0 right-0 z-[20] px-8 py-4 bg-gradient-to-t from-[#050505]/90 via-[#050505]/50 to-transparent"
    >
      <p className="text-center text-sm md:text-base text-zinc-300 font-light tracking-wide">
        {'\u201C'}I don{'\u2019'}t just write code,{" "}
        <span className="text-cyan-400/80 font-normal">I engineer experiences</span>.{'\u201D'}
      </p>
    </motion.div>
  );
}
