"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { TeamConfig } from "./data";

interface TeamHUDProps {
  team: TeamConfig;
}

export default function TeamHUD({ team }: TeamHUDProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(".hud-el");
    gsap.fromTo(
      els,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, [team.id]);

  return (
    <div ref={containerRef} className="space-y-1.5">
      <span
        className="hud-el text-[10px] tracking-[0.25em] uppercase font-mono"
        style={{ color: team.color }}
      >
        {team.name}
      </span>
      <p className="hud-el text-xs text-zinc-500 font-mono tracking-wider">
        {team.driver1}
      </p>
      <p className="hud-el text-xs text-zinc-500 font-mono tracking-wider">
        {team.driver2}
      </p>
    </div>
  );
}
