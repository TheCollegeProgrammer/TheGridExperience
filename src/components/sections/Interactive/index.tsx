"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import CinematicHeading from "@/components/CinematicHeading";
import GlassCard from "@/components/GlassCard";
import SceneCanvas from "@/three/SceneCanvas";
import F1Car from "./F1Car";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

const interactions = [
  { id: "rotate", label: "Rotate" },
  { id: "zoom", label: "Zoom" },
  { id: "drift", label: "Idle Drift" },
  { id: "xray", label: "X-Ray Mode" },
  { id: "environment", label: "Environment" },
];

const skills = ["React / Next.js", "Three.js / R3F", "GSAP", "TypeScript", "Tailwind CSS", "Framer Motion"];

export default function InteractiveSection() {
  const sectionRef = useSectionSnap("interactive", 5);
  const pinRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

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
      onEnter: () => setEntered(true),
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [sectionRef]);

  useEffect(() => {
    if (!entered || !leftRef.current || !rightRef.current || !carRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    tl.to(leftRef.current, {
      x: "-6%",
      y: "18%",
      duration: 1.4,
    }, 0);

    tl.to(rightRef.current, {
      x: "6%",
      y: "-18%",
      duration: 1.4,
    }, 0);

    tl.to(carRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    }, 0.8);

    tl.fromTo(
      carRef.current,
      { filter: "blur(8px)" },
      { filter: "blur(0px)", duration: 1 },
      "-=0.6"
    );
  }, [entered]);

  return (
    <div
      ref={sectionRef}
      id="interactive"
      data-section-index={5}
      className="relative bg-black"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden">
        {/* 3D canvas - always active */}
        <div
          ref={carRef}
          className="absolute inset-0 opacity-0 scale-[0.85]"
        >
          <SceneCanvas cameraPosition={[2.5, 0.8, 3.5]} interactive>
            <F1Car />
          </SceneCanvas>
        </div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

        {/* UI Content */}
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center px-8 md:px-16 lg:px-24 py-32 gap-12 lg:gap-24">
          {/* Left panel */}
          <div ref={leftRef} className="flex-1 max-w-lg">
            <CinematicHeading
              label="Interactive Experience"
              title="Get Closer"
              subtitle="Take control. Explore every detail of the machine."
            />

            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {interactions.map((action, i) => (
                <motion.button
                  key={action.id}
                  className="px-5 py-3 border border-zinc-800 rounded-full text-xs tracking-widest uppercase text-zinc-400 hover:bg-zinc-900 hover:border-zinc-600 hover:text-white transition-all duration-300 font-mono"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (action.id === "rotate") setAutoRotate((p) => !p);
                  }}
                >
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right developer card */}
          <div ref={rightRef} className="w-full max-w-sm">
            <GlassCard>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-zinc-500 font-mono">F1</span>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold text-white">Developer Name</h3>
                  <p className="text-xs tracking-widest uppercase text-zinc-500 font-mono">Full Stack Engineer</p>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-mono mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-zinc-900 rounded-md text-xs text-zinc-400 border border-zinc-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <div className="flex justify-center gap-4 pt-2">
                  {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                    <span key={s} className="text-[10px] tracking-widest uppercase text-zinc-600 font-mono cursor-pointer hover:text-zinc-400 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
