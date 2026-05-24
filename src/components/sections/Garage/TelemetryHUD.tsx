"use client";

import { motion } from "framer-motion";
import StatItem from "./StatItem";
import SpeedDisplay from "./SpeedDisplay";
import RadialGauge from "./RadialGauge";

const leftStats = [
  { label: "Speed", value: 362, unit: "km/h", barMax: 400 },
  { label: "RPM", value: 85, unit: "%", barMax: 100 },
  { label: "Power", value: 1050, unit: "hp", barMax: 1200 },
  { label: "Boost", value: 4.2, unit: "bar", decimals: 1, barMax: 6 },
  { label: "Gear", value: 8, unit: "", barMax: 1 },
];

export default function TelemetryHUD() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2"
      >
        <div className="backdrop-blur-md bg-black/15 border border-white/[0.03] rounded-xl px-4 py-4 space-y-3 w-28 md:w-64">
          {leftStats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Center speed */}
      <div className="absolute left-1/2 bottom-[15px] -translate-x-1/2">
        <SpeedDisplay speed={362} gear={8} rpm={85} />
      </div>

      {/* Right gauges */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        {[
          { label: "RPM", value: 85, color: "rgba(239,68,68,0.5)" },
          { label: "Boost", value: 70, color: "rgba(6,182,212,0.4)" },
          { label: "G-Force", value: 81, color: "rgba(217,70,239,0.4)" },
        ].map((g) => (
          <RadialGauge key={g.label} {...g} />
        ))}
      </motion.div>

      {/* Bottom-left status strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-5 left-6 md:left-10 lg:left-14"
      >
        <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl px-5 py-2.5 flex items-center gap-5 text-xs font-mono tracking-wider text-zinc-400/90">
          <span className="text-white font-semibold">1:23.456</span>
          <span className="text-zinc-500">·</span>
          <span>S1</span>
          <span className="text-emerald-400 font-medium">+0.234</span>
          <span className="text-zinc-500">·</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ERS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>DRS</span>
          </div>
          <span className="text-zinc-500">·</span>
          <span>P1</span>
        </div>
      </motion.div>
    </div>
  );
}
