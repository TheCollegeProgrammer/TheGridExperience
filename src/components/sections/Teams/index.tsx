"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { teams } from "./data";
import TeamBackground from "./TeamBackground";
import CarDisplay from "./CarDisplay";
import TeamHUD from "./TeamHUD";
import TeamNavigation from "./TeamNavigation";
import TeamStatsPanel from "./TeamStatsPanel";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

export default function TeamsSection() {
  const sectionRef = useSectionSnap("teams", 2);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevBgImage, setPrevBgImage] = useState<string | null>(null);
  const active = teams[activeIndex];

  const handleChange = useCallback((index: number) => {
    setPrevBgImage(teams[activeIndex].bgImage);
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % teams.length;
        setPrevBgImage(teams[prev].bgImage);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
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
      id="teams"
      data-section-index={2}
      className="relative bg-black"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden">
        <TeamBackground
          activeImage={active.bgImage}
          prevImage={prevBgImage}
          color={active.color}
        />

        {/* Top atmospheric fade */}
        <div className="absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-black via-black/10 via-black/40 to-transparent z-[2]" />

        {/* Bottom cinematic grounding */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] bg-gradient-to-t from-black via-black/70 via-black/20 to-transparent z-[2]" />

        {/* Side cinematic fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black/20 to-transparent z-[2]" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-black/60 to-transparent z-[2]" />

        {/* Center vignette — softer, wider */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_25%,rgba(0,0,0,0.5)_100%)] z-[2]" />

        {/* Floor shadow — grounds the car */}
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 w-[70%] max-w-xl h-20 bg-gradient-to-r from-transparent via-black/60 to-transparent blur-3xl z-[3]" />

        {/* Top label */}
        <div className="absolute top-28 left-8 md:left-16 lg:left-24 z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-mono">
            The Contenders
          </span>
        </div>

        {/* Stats panel + team info card — left side */}
        <div className="absolute left-6 md:left-6 lg:left-12 top-[45%] z-10 hidden md:block space-y-5">
          <TeamStatsPanel team={active} />
          <div className="w-[180px] md:w-[200px] rounded-lg border border-white/5 bg-black/40 backdrop-blur-xl p-4 md:p-5">
            <TeamHUD team={active} />
          </div>
        </div>

        {/* Car — smaller, lowered, cinematically grounded */}
        <div className="absolute inset-0 z-[3] flex items-end justify-center pb-[0.5%] md:pb-[0.25%]">
          <CarDisplay image={active.carImage} color={active.color} teamId={active.id} />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 inset-x-0 z-10 px-8 md:px-16 lg:px-24 pb-2">
          <div className="flex items-end justify-center">
            <TeamNavigation
              teams={teams}
              activeIndex={activeIndex}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
