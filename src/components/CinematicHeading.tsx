"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface CinematicHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function CinematicHeading({ label, title, subtitle, className, align = "left" }: CinematicHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : align === "right" ? "text-right items-end" : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl", alignClass, className)}>
      {label && (
        <motion.span
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
