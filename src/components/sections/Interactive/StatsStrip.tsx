"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "Projects Built", chart: [10, 20, 30, 25, 40, 50, 60] },
  { value: "100K+", label: "Lines of Code", chart: [8, 18, 30, 45, 55] },
  { value: "15+", label: "Tech Stack", chart: [5, 12, 22, 35, 48, 60] },
  { value: "3+", label: "Years Learning", chart: [0, 10, 25, 45, 60] },
  { value: "5+", label: "AI Tools", chart: [15, 25, 38, 50, 60, 65] },
];

export default function StatsStrip() {
  return (
    <div className="absolute bottom-[65px] left-0 right-0 z-[15] px-10">
      <div className="flex gap-2 justify-end">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[120px] px-3 py-2.5 rounded-md bg-white/[0.02] border border-white/[0.04]"
          >
            <p className="text-base font-semibold text-white/80 tracking-tight font-mono tabular-nums">
              {stat.value}
            </p>
            <p className="text-[7px] tracking-[0.15em] uppercase text-zinc-500 font-mono mt-0.5">
              {stat.label}
            </p>
            <div className="flex items-end gap-[1px] mt-2 h-4">
              {stat.chart.map((h, ci) => (
                <div
                  key={ci}
                  className="flex-1 bg-white/[0.06] rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
