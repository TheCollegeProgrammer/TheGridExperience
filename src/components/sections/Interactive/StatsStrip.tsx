"use client";

import { motion } from "framer-motion";

const stats = [
  { icon: "▣", value: "25+", label: "Projects Built", chart: [30, 45, 60, 55, 75, 85, 95] },
  { icon: "⎔", value: "100K+", label: "Lines of Code", chart: [20, 40, 60, 80, 100] },
  { icon: "⚙", value: "15+", label: "Tech Stack", chart: [10, 25, 45, 65, 85, 100] },
  { icon: "◆", value: "3+", label: "Years Learning", chart: [0, 20, 50, 80, 100] },
  { icon: "◇", value: "5+", label: "AI Tools Built", chart: [40, 55, 70, 85, 95, 100] },
];

export default function StatsStrip() {
  return (
    <div className="absolute bottom-[70px] left-0 right-0 z-[20] px-8">
      <div className="flex gap-3 justify-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 max-w-[180px] px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-500"
          >
            <span className="text-[10px] text-cyan-400/60 font-mono">{stat.icon}</span>
            <p className="text-xl font-bold text-white mt-1 tracking-tight font-mono tabular-nums">
              {stat.value}
            </p>
            <p className="text-[9px] tracking-[0.15em] uppercase text-zinc-500 font-mono mt-0.5">
              {stat.label}
            </p>
            <div className="flex items-end gap-px mt-2 h-6">
              {stat.chart.map((h, ci) => (
                <div
                  key={ci}
                  className="flex-1 bg-gradient-to-t from-cyan-400/20 to-cyan-400/5 rounded-t"
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
