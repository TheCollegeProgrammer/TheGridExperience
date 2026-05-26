"use client";

import { useEffect, useRef } from "react";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import DevGarage from "./DevGarage";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

export default function InteractiveSection() {
  const sectionRef = useSectionSnap("interactive", 5);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: pinRef.current,
      start: "top top",
      end: "bottom top",
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.refresh();

    return () => { st.kill(); };
  }, [sectionRef]);

  return (
    <div
      ref={sectionRef}
      id="interactive"
      data-section-index={5}
      className="relative bg-[#050505] select-none"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full">
        <DevGarage />
      </div>
    </div>
  );
}
