"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { TeamConfig } from "./data";

interface TeamStatsPanelProps {
  team: TeamConfig;
}

const statsConfig: { key: keyof TeamConfig; label: string; symbol: string }[] = [
  { key: "championships", label: "CHAMPIONSHIPS", symbol: "◆" },
  { key: "founded", label: "FOUNDED", symbol: "◈" },
  { key: "base", label: "BASE", symbol: "◇" },
  { key: "principal", label: "TEAM PRINCIPAL", symbol: "○" },
  { key: "engine", label: "ENGINE", symbol: "▸" },
];

export default function TeamStatsPanel({ team }: TeamStatsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current!.querySelectorAll(".stat-row"),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [team.id]);

  return (
    <div
      ref={containerRef}
      className="w-[180px] md:w-[200px] rounded-lg border border-white/5 bg-black/40 backdrop-blur-xl p-4 md:p-5 space-y-3"
    >
      {statsConfig.map((stat) => {
        const value = team[stat.key];
        const display =
          stat.key === "championships"
            ? `${value}`
            : stat.key === "founded"
              ? `${value}`
              : String(value);
        return (
          <div key={stat.key} className="stat-row flex items-start gap-3">
            <span className="text-[8px] leading-none mt-1 opacity-30 text-zinc-500">{stat.symbol}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-600 font-mono">
                {stat.label}
              </p>
              <p className="text-[11px] md:text-xs font-medium text-zinc-300 truncate font-mono tracking-wide">
                {display}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
