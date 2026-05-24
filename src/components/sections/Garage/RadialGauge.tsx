"use client";

import { useRef, useEffect, useState } from "react";

interface RadialGaugeProps {
  value: number;
  max?: number;
  label: string;
  color?: string;
}

const SIZE = 56;
const STROKE = 2;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;
const ARC_ANGLE = 270;
const ARC_LEN = (ARC_ANGLE / 360) * CIRC;

export default function RadialGauge({
  value,
  max = 100,
  label,
  color = "rgba(255,255,255,0.3)",
}: RadialGaugeProps) {
  const [animated, setAnimated] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    const startVal = animated;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(startVal + (value / max) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, max]);

  const dashOffset = ARC_LEN * (1 - Math.min(animated, 1));

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={STROKE}
          strokeDasharray={`${ARC_LEN} ${CIRC - ARC_LEN}`}
          transform={`rotate(-135 ${SIZE / 2} ${SIZE / 2})`}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${ARC_LEN} ${CIRC - ARC_LEN}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-135 ${SIZE / 2} ${SIZE / 2})`}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <p className="text-[7px] tracking-[0.2em] uppercase text-white/70 font-mono">{label}</p>
    </div>
  );
}
