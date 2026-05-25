"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import SceneCanvas from "@/three/SceneCanvas";
import F1Car from "./F1Car";
import DriveModal from "./DriveModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PINNED_HEIGHT = 300;

const interactions = [
  { id: "rotate", label: "Rotate" },
  { id: "zoom", label: "Zoom" },
  { id: "xray", label: "X-Ray" },
  { id: "environment", label: "Env" },
];

const environmentPresets = ["night", "city", "sunset", "dawn"];

const teamColors = [
  { id: "ferrari", color: "#dc0000", label: "Ferrari" },
  { id: "mercedes", color: "#00d2be", label: "Mercedes" },
  { id: "redbull", color: "#1e41ff", label: "Red Bull" },
  { id: "mclaren", color: "#ff8700", label: "McLaren" },
];

const features = [
  "Real-Time Rendering",
  "Dynamic Environments",
  "Cinematic Camera",
];

export default function InteractiveSection() {
  const sectionRef = useSectionSnap("interactive", 5);
  const pinRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [revealStarted, setRevealStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [xrayMode, setXrayMode] = useState(false);
  const [environmentPreset, setEnvironmentPreset] = useState("night");
  const [colorTheme, setColorTheme] = useState<number | null>(null);
  const [resetCount, setResetCount] = useState(0);

  const handleInteraction = useCallback((id: string) => {
    switch (id) {
      case "rotate":
        setAutoRotate((p) => !p);
        break;
      case "zoom":
        setZoomLevel((p) => (p + 1) % 3);
        break;
      case "xray":
        setXrayMode((p) => !p);
        break;
      case "environment":
        setEnvironmentPreset((p) => {
          const idx = environmentPresets.indexOf(p);
          return environmentPresets[(idx + 1) % environmentPresets.length];
        });
        break;
    }
  }, []);

  const handleColorTheme = useCallback((hex: string) => {
    const num = parseInt(hex.replace("#", ""), 16);
    setColorTheme((prev) => (prev === num ? null : num));
  }, []);

  const handleResetView = useCallback(() => {
    setResetCount((c) => c + 1);
    setZoomLevel(0);
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
      onEnter: () => setEntered(true),
      onEnterBack: () => setEntered(true),
    });

    ScrollTrigger.refresh();

    return () => { st.kill(); };
  }, [sectionRef]);

  useEffect(() => {
    if (!entered || revealStarted) return;
    setRevealStarted(true);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    const tl = gsap.timeline({ paused: true });

    if (carRef.current) {
      tl.fromTo(carRef.current,
        { opacity: 0, scale: 0.75, filter: "blur(24px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.4, ease: "power3.out" },
        0,
      );
    }

    if (glowRef.current) {
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 3, ease: "power2.out" },
        0.3,
      );
    }

    [overlay1Ref, overlay2Ref, overlay3Ref].forEach((ref, i) => {
      if (ref.current) {
        tl.to(ref.current, { opacity: 0, duration: 2, ease: "power2.out" }, 0.5 + i * 0.15);
      }
    });

    if (controlsRef.current) {
      tl.fromTo(controlsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        1.4,
      );
    }

    if (!isMobile && leftRef.current && rightRef.current) {
      const lr = leftRef.current.getBoundingClientRect();
      const rr = rightRef.current.getBoundingClientRect();

      const ltx = -(lr.left + lr.width / 2 - 40) + 190;
      const lty = vh - lr.top - lr.height - 40 - 55;
      const rtx = vw - (rr.left + rr.width / 2) - 40 - 125;
      const rty = -(rr.top + rr.height / 2 - 40) + 105;

      tl.to(leftRef.current, {
        x: ltx, y: lty, scale: 0.85,
        duration: 2.2,
        ease: "power4.out",
      }, 1.2);

      tl.to(rightRef.current, {
        x: rtx, y: rty, scale: 0.85,
        duration: 2.2,
        ease: "power4.out",
      }, 1.2);
    }

    tl.play();
  }, [entered, revealStarted]);

  const getButtonLabel = (action: typeof interactions[number]) => {
    if (action.id === "environment") {
      return `${action.label} ${environmentPreset.charAt(0).toUpperCase() + environmentPreset.slice(1)}`;
    }
    if (action.id === "zoom") return `${action.label} ${["1x", "2x", "3x"][zoomLevel]}`;
    if (action.id === "rotate" && autoRotate) return "Rotate ON";
    if (action.id === "xray" && xrayMode) return "X-Ray ON";
    return action.label;
  };

  const isActive = (id: string) => {
    switch (id) {
      case "rotate": return autoRotate;
      case "xray": return xrayMode;
      default: return false;
    }
  };

  return (
    <div
      ref={sectionRef}
      id="interactive"
      data-section-index={5}
      className="relative bg-black select-none"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden pointer-events-none">
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse, rgba(225,6,0,0.05) 0%, rgba(0,80,200,0.025) 40%, transparent 70%)",
            ].join(""),
            filter: "blur(80px)",
          }}
        />

        <div
          ref={carRef}
          className="absolute inset-0 opacity-0 scale-[0.75] will-change-transform pointer-events-auto"
          style={{ filter: "blur(24px)" }}
        >
          <SceneCanvas cameraPosition={[4.8, 1.2, 7]} interactive environmentPreset={environmentPreset}>
            <F1Car
              autoRotate={autoRotate}
              xrayMode={xrayMode}
              zoomLevel={zoomLevel}
              colorTheme={colorTheme}
              resetCount={resetCount}
              entered={entered}
            />
          </SceneCanvas>
        </div>

        <div ref={overlay1Ref} className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        <div ref={overlay2Ref} className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
        <div ref={overlay3Ref} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center px-8 py-8 gap-8 lg:gap-14">
          <div ref={leftRef} className="flex-1 max-w-lg w-full will-change-transform pointer-events-auto">
            <div className="space-y-4">
              <motion.span
                className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-mono block"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Interactive Experience
              </motion.span>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Get Closer
              </motion.h2>

              <motion.p
                className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md font-light"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Take control. Explore every detail of the machine.
              </motion.p>
            </div>

            <div ref={controlsRef} className="mt-8 md:mt-10 opacity-0">
              <div className="flex flex-wrap gap-2">
                {interactions.map((action) => {
                  const on = isActive(action.id);
                  return (
                    <motion.button
                      key={action.id}
                      className={[
                        "relative px-4 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-mono transition-all duration-500 backdrop-blur-xl",
                        on
                          ? "bg-white/10 border-white/20 text-white shadow-[0_0_16px_rgba(255,255,255,0.06)]"
                          : "border-zinc-700/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500",
                        "border",
                      ].join(" ")}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleInteraction(action.id)}
                    >
                      {on && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-white/5"
                          layoutId="buttonGlow"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{getButtonLabel(action)}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-600 font-mono">
                  Color
                </span>
                <div className="flex gap-2">
                  {teamColors.map((tc) => {
                    const selected = colorTheme === parseInt(tc.color.replace("#", ""), 16);
                    return (
                      <motion.button
                        key={tc.id}
                        title={tc.label}
                        className={[
                          "w-5 h-5 rounded-full border transition-all duration-500",
                          selected
                            ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                            : "border-zinc-700 hover:border-zinc-500",
                        ].join(" ")}
                        style={{ backgroundColor: tc.color }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorTheme(tc.color)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="w-full max-w-[280px] will-change-transform pointer-events-auto">
            <div
              className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.06] rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.03)] p-5 transition-all duration-700"
              style={{
                animation: entered ? "cardFloat 5s ease-in-out infinite" : "none",
              }}
            >
              <style>{`
                @keyframes cardFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-3px); }
                }
              `}</style>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={entered ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
                  <span className="text-[8px] tracking-[0.3em] uppercase text-emerald-400/50 font-mono">
                    Live Experience
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-white/90 tracking-tight leading-none">
                  RB25 Interactive
                </h3>

                <p className="text-[11px] text-zinc-400/60 leading-relaxed max-w-[220px] font-light">
                  A cinematic Formula 1 showcase with real-time rendering, dynamic lighting, and precision motion interactions.
                </p>

                <div className="text-[9px] tracking-wide text-zinc-500/70 font-mono">
                  React 19 &middot; Next.js &middot; Three.js &middot; GSAP
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {features.map((f) => (
                    <span key={f} className="text-[7px] tracking-[0.25em] uppercase text-zinc-600 font-mono">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

                <div className="flex gap-2.5 pt-1">
                  {[
                    { label: "GitHub", href: "https://github.com" },
                    { label: "LinkedIn", href: "https://linkedin.com" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[9px] tracking-widest uppercase text-zinc-500 font-mono hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-zinc-300 hover:scale-105 transition-all duration-300"
                    >
                      {s.label.charAt(0)}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleResetView}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] uppercase text-zinc-700 font-mono hover:text-zinc-400 transition-colors z-20 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        >
          Reset View
        </motion.button>

        <motion.button
          onClick={() => setShowModal(true)}
          className="absolute bottom-8 right-8 px-7 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/90 tracking-[0.3em] text-[11px] uppercase hover:bg-white/10 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] z-20 pointer-events-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 12 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Drive Now
        </motion.button>
      </div>

      {showModal && <DriveModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
