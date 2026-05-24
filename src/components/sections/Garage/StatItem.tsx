"use client";

import { useAnimatedValue } from "./useAnimatedValue";
import { motion } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
  barMax?: number;
  index?: number;
}

export default function StatItem({
  label,
  value,
  unit,
  decimals = 0,
  barMax = 100,
  index = 0,
}: StatItemProps) {
  const animated = useAnimatedValue(value);
  const display =
    decimals > 0 ? animated.toFixed(decimals) : Math.round(animated).toLocaleString();
  const barWidth = Math.min((value / barMax) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <span className="text-[16px] tracking-[0.25em] uppercase text-white/70 font-mono">
          {label}
        </span>
        <span className="text-2xl font-medium text-white font-mono tabular-nums tracking-tight">
          {display}
          <span className="text-[16px] text-white/50 font-mono ml-1">{unit}</span>
        </span>
      </div>
      <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1.5, delay: 0.1 * index, ease: "easeOut" }}
          className="h-full rounded-full bg-white/70"
        />
      </div>
    </motion.div>
  );
}
