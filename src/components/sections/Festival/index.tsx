"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import CinematicHeading from "@/components/CinematicHeading";
import GlassCard from "@/components/GlassCard";
import { tracks } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

const bgImages = Array.from({ length: 9 }, (_, i) => `/img/section-5-img/bg-img${i + 1}.jpg`);

function getRandomBg(exclude?: string) {
  const pool = exclude ? bgImages.filter((img) => img !== exclude) : bgImages;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function FestivalSection() {
  const sectionRef = useSectionSnap("festival", 4);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [prevBg, setPrevBg] = useState(getRandomBg());
  const [nextBg, setNextBg] = useState(getRandomBg());
  const active = tracks[activeIndex];

  const setActive = useCallback((index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((p) => {
        const next = (p + 1) % tracks.length;
        setPrevIndex(p);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
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

  useEffect(() => {
    const newBg = getRandomBg(nextBg);
    setPrevBg(nextBg);
    setNextBg(newBg);
  }, [activeIndex]);

  useEffect(() => {
    if (!nextBgRef.current || !bgRef.current) return;

    gsap.set(nextBgRef.current, { opacity: 0 });
    gsap.to(nextBgRef.current, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    gsap.to(bgRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
  }, [activeIndex]);

  const statItems = [
    { label: "Country", value: active.country },
    { label: "Length", value: active.length },
    { label: "Turns", value: String(active.turns) },
    { label: "First GP", value: active.firstGP },
    { label: "Famous For", value: active.famousFor },
  ];

  return (
    <div
      ref={sectionRef}
      id="festival"
      data-section-index={4}
      className="relative bg-black"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden">
        {/* Dynamic background layer */}
        <div className="absolute inset-0">
          <div
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prevBg})` }}
          />
          <div
            ref={nextBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${nextBg})` }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-48 pb-32">
          <div className="flex flex-col">
            <div style={{ height: "40px" }} />
            <CinematicHeading
              label="Race Weekend"
              title="The Festival of Speed"
              subtitle="Temples of speed across the globe, each with its own soul."
            />
          </div>

          <div className="flex items-center mt-16 lg:mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Left: Track Map */}
                <GlassCard className="flex-1 w-full max-w-lg  flex items-center justify-center overflow-hidden p-0">
                  <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                    <img
                      src={active.mapImage}
                      alt={`${active.name} circuit map`}
                      className="w-full h-full object-contain p-4 md:p-6"
                    />
                  </div>
                </GlassCard>

                {/* Right: Track Info */}
                <div className="flex-1 max-w-md space-y-6 bg-black/60 rounded-2xl" style={{ padding: "10px" }}>
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    className="text-zinc-400 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {active.description}
                  </motion.p>

                  {/* Dynamic stats table */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {statItems.map((item, i) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-500">{item.label}</span>
                          <span className="text-white text-right">{item.value}</span>
                        </div>
                        {i < statItems.length - 1 && <div className="w-full h-px bg-zinc-800 mt-3" />}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom GP Navigation */}
          <div className="flex items-center justify-center gap-8">
            {tracks.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className="group relative text-xs tracking-[0.2em] uppercase font-mono transition-all duration-500 py-1"
              >
                <span className={i === activeIndex ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"}>
                  {t.name}
                </span>
                <span
                  className={`absolute -bottom-px left-0 h-px bg-white transition-all duration-500 ${
                    i === activeIndex ? "w-full" : "w-0 group-hover:w-1/2"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
