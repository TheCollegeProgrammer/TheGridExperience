"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TeamBackgroundProps {
  activeImage: string;
  prevImage: string | null;
  color: string;
}

export default function TeamBackground({ activeImage, prevImage, color }: TeamBackgroundProps) {
  const activeRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      gsap.fromTo(
        activeRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1.02, duration: 1.4, ease: "power2.out" }
      );
    }
    if (prevRef.current) {
      gsap.to(prevRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          if (prevRef.current) prevRef.current.style.display = "none";
        },
      });
    }
  }, [activeImage]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {prevImage && (
        <div
          ref={prevRef}
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${prevImage})`,
            backgroundSize: "auto 85%",
            backgroundPosition: "50% 45%",
          }}
        />
      )}
      <div
        ref={activeRef}
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${activeImage})`,
          backgroundSize: "auto 85%",
          backgroundPosition: "50% 45%",
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${color}15, transparent 70%)`,
        }}
      />
    </div>
  );
}
