"use client";

import { useEffect, useRef } from "react";
import { useScrollContext } from "@/providers/ScrollProvider";
import { useLenis } from "./useLenis";

const STEP_SECTIONS_START = 2;
const STEP_COUNT = 4;
const SNAP_COOLDOWN_MS = 1500;
function useMagneticScroll() {
  const { sections, snapToSection, isSnapping, activeIndex } = useScrollContext();
  const lenis = useLenis();

  const stepCountRef = useRef(0);
  const stepDirRef = useRef(0);
  const cooldownRef = useRef(0);
  const isSnappingRef = useRef(false);
  const activeIdxRef = useRef(0);
  const sectionsRef = useRef(sections);
  const idleFramesRef = useRef(0);

  sectionsRef.current = sections;
  activeIdxRef.current = activeIndex;

  useEffect(() => {
    isSnappingRef.current = isSnapping;
  }, [isSnapping]);

  useEffect(() => {
    if (!lenis) return;

    const handler = (e: { direction: number }) => {
      if (isSnappingRef.current) return;

      const now = Date.now();
      if (now < cooldownRef.current) return;

      const idx = activeIdxRef.current;
      const dir = e.direction > 0 ? 1 : -1;
      const allSections = sectionsRef.current;
      if (allSections.length === 0) return;

      const sorted = [...allSections].sort((a, b) => a.index - b.index);

      if (idx >= STEP_SECTIONS_START) {
        /* --- STEP MODE (sections 3-6) --- */
        if (dir === stepDirRef.current) {
          stepCountRef.current++;
        } else {
          stepCountRef.current = 1;
          stepDirRef.current = dir;
        }

        if (stepCountRef.current >= STEP_COUNT) {
          stepCountRef.current = 0;
          const targetIdx = idx + dir;
          if (targetIdx >= 0 && targetIdx < sorted.length) {
            cooldownRef.current = now + SNAP_COOLDOWN_MS;
            snapToSection(targetIdx, 0.7);
          }
        }
      } else {
        /* --- CENTER-LINE MODE (sections 1-2) --- */
        idleFramesRef.current = 0;
        const center = window.innerHeight / 2;

        let target: (typeof sorted)[number] | null = null;
        for (const s of sorted) {
          const rect = s.element.getBoundingClientRect();
          if (rect.top <= center && rect.bottom >= center) {
            target = s;
            break;
          }
        }

        if (target && target.index !== idx) {
          cooldownRef.current = now + SNAP_COOLDOWN_MS;
          snapToSection(target.index, 0.8);
        }
      }
    };

    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [lenis, snapToSection]);

  /* --- Center-line idle check (sections 1-2) --- */
  useEffect(() => {
    function tick() {
      const idx = activeIdxRef.current;
      if (idx >= STEP_SECTIONS_START) return;
      if (isSnappingRef.current) return;

      const now = Date.now();
      if (now < cooldownRef.current) return;

      const allSections = sectionsRef.current;
      if (allSections.length === 0) return;

      const sorted = [...allSections].sort((a, b) => a.index - b.index);
      const center = window.innerHeight / 2;

      let target: (typeof sorted)[number] | null = null;
      for (const s of sorted) {
        const rect = s.element.getBoundingClientRect();
        if (rect.top <= center && rect.bottom >= center) {
          target = s;
          break;
        }
      }

      if (target && target.index !== idx) {
        cooldownRef.current = now + SNAP_COOLDOWN_MS;
        snapToSection(target.index, 0.8);
      }
    }

    let raf = requestAnimationFrame(function loop() {
      tick();
      raf = requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(raf);
  }, [snapToSection]);
}

export function MagneticScrollGuard() {
  useMagneticScroll();
  return null;
}
