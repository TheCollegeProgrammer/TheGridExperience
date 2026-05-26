"use client";

import { useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import StatsStrip from "./StatsStrip";
import BottomQuote from "./BottomQuote";

const hotspots = [
  { label: "Front Wing", desc: "Aerodynamic efficiency system", top: "16%", left: "65%" },
  { label: "Halo", desc: "Driver protection system", top: "35%", left: "80%" },
  { label: "Rear Wing", desc: "Downforce generation", top: "20%", left: "22%" },
  { label: "Diffuser", desc: "Underfloor aerodynamics", top: "62%", left: "20%" },
  { label: "Power Unit", desc: "Hybrid V6 turbo", top: "48%", left: "14%" },
];

function TopStrip() {
  const bars = [12, 18, 8, 14, 10, 16, 6, 20];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-0 left-0 right-0 z-[15] flex items-center justify-between px-8 py-3"
    >
      <div className="flex items-end gap-px h-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-[2px] bg-cyan-400/30 rounded-full animate-pulse-glow"
            style={{ height: `${h}px`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
        Developer Garage
      </p>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-emerald-400/70">
          Available for Work
        </span>
      </div>
    </motion.div>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posStyles: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={cn("absolute w-4 h-4", posStyles[position])}>
      <div className="absolute top-0 left-0 w-full h-px bg-white/15 origin-left" />
      <div className="absolute top-0 left-0 w-px h-full bg-white/15 origin-top" />
    </div>
  );
}

function EngineeringFrame() {
  return (
    <div className="relative w-[78%] h-[55vh] border border-dashed border-white/[0.06] rounded-2xl">
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />
    </div>
  );
}

interface HotspotProps {
  label: string;
  desc: string;
  top: string;
  left: string;
}

function HotspotOverlay({ label, desc, top, left }: HotspotProps) {
  const isRight = parseFloat(left) > 50;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute z-10"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse-glow"
        />
        <div
          className="absolute -inset-1.5 rounded-full bg-cyan-400/10 blur-sm animate-pulse-glow"
        />
      </div>

      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          isRight ? "left-[12px]" : "right-[12px]"
        )}
      >
        <div
          className={cn(
            "h-px w-12",
            isRight
              ? "bg-gradient-to-r from-cyan-400/25 to-transparent"
              : "bg-gradient-to-l from-cyan-400/25 to-transparent"
          )}
        />

        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.06] whitespace-nowrap",
            isRight ? "left-[52px] text-left" : "right-[52px] text-right"
          )}
        >
          <p className="text-[8px] tracking-[0.25em] uppercase text-cyan-400/70 font-mono">
            {label}
          </p>
          <p className="text-[7px] text-zinc-500 font-mono mt-0.5 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingCard({
  title,
  text,
  position,
}: {
  title: string;
  text: string;
  position: "top-left" | "top-right";
}) {
  const isLeft = position === "top-left";
  const posClass = isLeft ? "top-[18%] left-6" : "top-[22%] right-6";
  const animX = isLeft ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: animX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("absolute z-10 max-w-[140px]", posClass)}
    >
      <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:border-cyan-500/15 transition-all duration-500">
        <p className="font-mono text-[9px] tracking-[0.3em] text-cyan-400/50 mb-1">
          {title}
        </p>
        <p className="text-[10px] text-zinc-400 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

const particleData = Array.from({ length: 15 }, (_, i) => ({
  top: 10 + Math.random() * 80,
  left: 5 + Math.random() * 90,
  delay: i * 0.5,
  duration: 3 + Math.random() * 4,
}));

function BackgroundParticles() {
  const uid = useId();

  return (
    <>
      {particleData.map((p, i) => (
        <div
          key={`${uid}-${i}`}
          className="absolute w-px h-px bg-white/20 rounded-full animate-float-subtle pointer-events-none"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}

export default function GarageScene() {
  return (
    <div className="relative flex-1 h-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/Section-6-img/bg-image.png"
          alt="F1 Garage"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-[#050505]/40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(5,5,5,0.6) 100%)' }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-cyan-500/[0.03] to-transparent pointer-events-none z-[1]" />

      <BackgroundParticles />

      <TopStrip />

      <FloatingCard
        title="PASSION"
        text="Turning ideas into real-world products."
        position="top-left"
      />
      <FloatingCard
        title="FOCUS"
        text="Engineering precision in every detail."
        position="top-right"
      />

      <div className="absolute inset-0 z-[5] flex items-center justify-center pt-8 pb-28">
        <EngineeringFrame />
      </div>

      {hotspots.map((hp) => (
        <HotspotOverlay key={hp.label} {...hp} />
      ))}

      <StatsStrip />
      <BottomQuote />
    </div>
  );
}
