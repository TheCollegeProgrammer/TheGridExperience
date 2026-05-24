"use client";

import type { TeamConfig } from "./data";

interface TeamNavigationProps {
  teams: TeamConfig[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function TeamNavigation({ teams, activeIndex, onChange }: TeamNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-6 mr-2.5">
      {teams.map((t, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={t.id}
            onClick={() => onChange(i)}
            className="group flex items-center gap-3 transition-all duration-700"
          >
            <div
              className="h-px transition-all duration-700"
              style={{
                width: isActive ? "48px" : "16px",
                backgroundColor: isActive ? t.color : "rgb(63,63,70)",
              }}
            />
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-mono transition-all duration-500"
              style={{ color: isActive ? "#ffffff" : "rgb(82,82,91)" }}
            >
              {t.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
