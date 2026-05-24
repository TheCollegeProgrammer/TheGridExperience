"use client";

import { useAnimatedValue } from "./useAnimatedValue";
import { motion } from "framer-motion";

interface SpeedDisplayProps {
  speed: number;
  gear: number;
  rpm: number;
}

export default function SpeedDisplay({ speed, gear, rpm }: SpeedDisplayProps) {
  const animatedSpeed = useAnimatedValue(speed);
  const rpmPercent = (rpm / 100) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="backdrop-blur-sm bg-black/10 rounded-3xl px-10 py-7 flex flex-col items-center border border-white/[0.03]"
    >
      <p className="text-[8px] tracking-[0.35em] uppercase text-white/70 font-mono mb-3">
        Speed
      </p>
      <div className="flex items-baseline">
        <p className="text-5xl md:text-6xl font-extralight text-white tracking-tighter leading-none tabular-nums">
          {Math.round(animatedSpeed)}
        </p>
        <p className="text-[10px] text-white/50 font-mono ml-2 tracking-wide">km/h</p>
      </div>

      <div className="flex items-center gap-5 mt-4">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[7px] tracking-[0.25em] uppercase text-white/70 font-mono">
            Gear
          </span>
          <span className="text-base md:text-lg font-light text-white font-mono">{gear}</span>
        </div>
        <span className="w-px h-6 bg-white/[0.04]" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[7px] tracking-[0.25em] uppercase text-white/70 font-mono">
            RPM
          </span>
          <span className="text-xs md:text-sm font-light text-white font-mono tabular-nums">
            {Math.round(rpm * 100).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="w-28 h-px bg-white/[0.04] rounded-full mt-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${rpmPercent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full bg-white/70"
        />
      </div>
    </motion.div>
  );
}
