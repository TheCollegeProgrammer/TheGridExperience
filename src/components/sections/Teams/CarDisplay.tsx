"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CarDisplayProps {
  image: string;
  color: string;
  teamId: string;
}

export default function CarDisplay({ image, color, teamId }: CarDisplayProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, delay: 0.15, ease: "power3.out" }
    );
  }, [teamId]);

  return (
    <div className="relative w-[60vw] max-w-2xl aspect-[16/9] flex items-end justify-center">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-gradient-to-r from-transparent via-black/60 to-transparent blur-2xl rounded-full"
        style={{ boxShadow: `0 0 60px ${color}08` }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={image}
        alt="F1 Car"
        className="w-full h-full object-contain relative z-[1]"
        style={{
          filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 40px ${color}10)`,
        }}
      />
    </div>
  );
}
