"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import StatsStrip from "./StatsStrip";
const hotspotData = [
  { label: "FRONT WING", desc: "Aerodynamic efficiency", row: 0, side: "right" as const },
  { label: "HALO", desc: "Driver protection system", row: 1, side: "right" as const },
  { label: "POWER UNIT", desc: "Hybrid V6 turbo", row: 2, side: "right" as const },
  { label: "REAR WING", desc: "Downforce generation", row: 0, side: "left" as const },
  { label: "DIFFUSER", desc: "Underfloor aerodynamics", row: 2, side: "left" as const },
];

const ROWS = [
  { top: "22%" },
  { top: "42%" },
  { top: "62%" },
];

function TopStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-0 left-0 right-0 z-[15] flex items-center justify-between px-10 py-4"
    >
      <div className="flex items-end gap-[2px] h-3">
        {[8, 12, 6, 10, 7, 11, 5, 14].map((h, i) => (
          <div
            key={i}
            className="w-[1px] bg-white/10"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      <p className="font-mono text-[9px] tracking-[0.45em] text-white/20 uppercase">
        Developer Garage
      </p>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
        <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-emerald-400/50">
          Available
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
    <div className={cn("absolute w-5 h-5", posStyles[position])}>
      <div className="absolute top-0 left-0 w-full h-px bg-white/8 origin-left" />
      <div className="absolute top-0 left-0 w-px h-full bg-white/8 origin-top" />
    </div>
  );
}

function EngineeringFrame() {
  return (
    <div className="relative w-[75%] h-[52vh] border border-dashed border-white/[0.04] rounded-2xl">
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
  row: number;
  side: "left" | "right";
}

function HotspotOverlay({ label, desc, row, side }: HotspotProps) {
  const rowStyle = ROWS[row];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 * row, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "absolute z-10",
        side === "right" ? "right-8" : "left-8"
      )}
      style={{ top: rowStyle.top }}
    >
      <div className={cn(
        "flex items-center gap-0",
        side === "right" ? "flex-row" : "flex-row-reverse"
      )}>
        <div className={cn(
          "relative",
          side === "right" ? "order-1" : "order-3"
        )}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="absolute -inset-1 rounded-full bg-white/[0.04]" />
        </div>

        <div className={cn(
          "h-px w-6",
          side === "right"
            ? "bg-gradient-to-r from-white/[0.06] to-transparent order-2"
            : "bg-gradient-to-l from-white/[0.06] to-transparent order-2"
        )} />

        <div className={cn(
          "px-3 py-2.5 rounded-md bg-black/40 backdrop-blur-md border border-white/[0.04] w-[130px]",
          side === "right" ? "order-3 text-left" : "order-1 text-right"
        )}>
          <p className="text-[9px] tracking-[0.2em] text-white/60 font-mono">
            {label}
          </p>
          <p className="text-[8px] text-zinc-500 font-mono mt-0.5 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function VolumetricHaze() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent pointer-events-none z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#050505]/60 via-[#050505]/10 to-transparent pointer-events-none z-[2]" />
      <div className="absolute top-[20%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none z-[2]" />
    </>
  );
}

function RimLightOverlay() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      <div className="absolute top-[15%] left-[30%] right-[15%] h-[55%] rounded-2xl border border-white/[0.03] shadow-[inset_0_0_60px_rgba(255,255,255,0.02)]" />
    </div>
  );
}

function FogFloor() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050505]/80 via-[#050505]/30 to-transparent pointer-events-none z-[2]" />
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
          className="object-cover opacity-55"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/50" />
      </div>

      <VolumetricHaze />
      <FogFloor />
      <RimLightOverlay />

      <TopStrip />

      <div
        className="absolute inset-0 z-[5] flex items-center justify-center pt-10 pb-32"
        style={{ paddingLeft: "2%" }}
      >
        <EngineeringFrame />
      </div>

      {hotspotData.map((hp) => (
        <HotspotOverlay key={hp.label} {...hp} />
      ))}

      <StatsStrip />
    </div>
  );
}
