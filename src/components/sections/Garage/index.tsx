"use client";

import { useEffect, useRef } from "react";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import TelemetryHUD from "./TelemetryHUD";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

export default function GarageSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useSectionSnap("garage", 3);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

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

    return () => {
      st.kill();
    };
  }, [sectionRef]);

  return (
    <div
      ref={sectionRef}
      id="garage"
      data-section-index={3}
      className="relative bg-black"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/videos/Setction-4-clip.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <TelemetryHUD />
      </div>
    </div>
  );
}
