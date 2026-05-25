"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CinematicHeading from "@/components/CinematicHeading";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const PINNED_HEIGHT = 600;
const FRAME_END_PROGRESS = 5 / 6;

const TIMELINE_STEPS = [
  { label: "Idle Reveal", start: 0, end: 0.2 },
  { label: "Zoom In", start: 0.2, end: 0.4 },
  { label: "Exploded View", start: 0.4, end: 0.6 },
  { label: "Highlight", start: 0.6, end: 0.8 },
  { label: "Reassembly", start: 0.8, end: 1 },
];

function framePath(index: number) {
  const num = String(index + 1).padStart(3, "0");
  return `/img/section-2-scroll-trigger-image/ezgif-frame-${num}.png`;
}

export default function TransformationSection() {
  const sectionRef = useSectionSnap("transformation", 1);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const [loadState, setLoadState] = useState({ loaded: false, progress: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      imgs.push(img);
    }

    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++;
        if (!cancelled) {
          setLoadState({ loaded: loadedCount === FRAME_COUNT, progress: loadedCount / FRAME_COUNT });
        }
        return;
      }
      img.onload = () => {
        loadedCount++;
        if (!cancelled) {
          setLoadState({ loaded: loadedCount === FRAME_COUNT, progress: loadedCount / FRAME_COUNT });
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (!cancelled) {
          setLoadState({ loaded: loadedCount === FRAME_COUNT, progress: loadedCount / FRAME_COUNT });
        }
      };
    });

    imagesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loadState.loaded || !sectionRef.current || !pinRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!img || !canvas || !ctx) return;

      const cw = canvas.width / Math.min(window.devicePixelRatio, 2);
      const ch = canvas.height / Math.min(window.devicePixelRatio, 2);
      const iar = img.naturalWidth / img.naturalHeight;
      const car = cw / ch;

      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (iar > car) {
        sw = img.naturalHeight * car;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / car;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }

    function render() {
      const frameProgress = Math.min(progressRef.current / FRAME_END_PROGRESS, 1);
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(frameProgress * FRAME_COUNT));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        const stepIdx = TIMELINE_STEPS.findLastIndex((s) => progressRef.current >= s.start);
        setActiveStep(Math.max(0, stepIdx));
        setProgress(progressRef.current);
      }
      rafRef.current = requestAnimationFrame(render);
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: pinRef.current,
      start: "top top",
      end: "bottom bottom",
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    ScrollTrigger.refresh();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      st.kill();
    };
  }, [loadState.loaded, sectionRef]);

  return (
    <div
      ref={sectionRef}
      id="transformation"
      data-section-index={1}
      className="relative bg-black"
      style={{ height: `${PINNED_HEIGHT}vh` }}
    >
      <div ref={pinRef} className="absolute inset-0 h-screen w-full overflow-hidden">
        {!loadState.loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black gap-4">
            <div className="text-xs tracking-widest uppercase text-zinc-500 font-mono">
              Loading Experience
            </div>
            <div className="w-48 h-px bg-zinc-800 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
                style={{ width: `${loadState.progress * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-600 font-mono">
              {Math.round(loadState.progress * 100)}%
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.03),transparent_70%)]" />

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          <div className="relative h-full w-full px-8 md:px-16 lg:px-24">
            <div className="absolute top-32 left-4 md:left-8 lg:left-12 right-8 md:right-16 lg:right-24 [&_h2]:text-4xl [&_h2]:md:text-6xl [&_h2]:lg:text-7xl">
              <CinematicHeading
                label="The Transformation"
                title="Deconstructing"
                subtitle="Every component tells a story of precision."
              />
            </div>

            <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24">
              <div className="flex items-center justify-between gap-2 md:gap-4">
                {TIMELINE_STEPS.map((step, i) => {
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  const stepProgress = isActive
                    ? (progress - step.start) / (step.end - step.start)
                    : isPast ? 1 : 0;

                  return (
                    <div key={step.label} className="flex-1 flex flex-col items-start gap-2">
                      <div className="w-full h-px bg-zinc-800 relative overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-primary transition-all duration-200"
                          style={{ width: `${stepProgress * 100}%` }}
                        />
                      </div>
                      <motion.span
                        className="text-[10px] tracking-widest uppercase font-mono whitespace-nowrap"
                        animate={{ color: isActive ? "#ffffff" : isPast ? "#525252" : "#3f3f46" }}
                      >
                        {`0${i + 1} ${step.label}`}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
