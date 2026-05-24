"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { useLenisInstance } from "./SmoothScrollProvider";

export interface SectionInfo {
  id: string;
  index: number;
  element: HTMLElement;
}

export interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  activeIndex: number;
  isSnapping: boolean;
  sections: SectionInfo[];
  registerSection: (info: SectionInfo) => () => void;
  snapToSection: (index: number, duration?: number) => void;
  setSnapping: (v: boolean) => void;
}

const ScrollContext = createContext<ScrollState | null>(null);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
  return ctx;
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const { lenis } = useLenisInstance();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSnapping, setSnapping] = useState(false);
  const sectionsRef = useRef<Map<string, SectionInfo>>(new Map());
  const [sections, setSections] = useState<SectionInfo[]>([]);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e: { scroll: number; limit: number }) => {
      setScrollY(e.scroll);
      setScrollProgress(e.limit > 0 ? e.scroll / e.limit : 0);

      const sorted = Array.from(sectionsRef.current.values()).sort(
        (a, b) => a.index - b.index
      );
      const current = sorted
        .slice()
        .reverse()
        .find((s) => {
          const rect = s.element.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.4;
        });
      if (current) setActiveIndex(current.index);
    };

    lenis.on("scroll", onScroll);
    return () => { lenis.off("scroll", onScroll); };
  }, [lenis]);

  const registerSection = useCallback((info: SectionInfo) => {
    sectionsRef.current.set(info.id, info);
    setSections(Array.from(sectionsRef.current.values()));
    return () => {
      sectionsRef.current.delete(info.id);
      setSections(Array.from(sectionsRef.current.values()));
    };
  }, []);

  const snapToSection = useCallback((index: number, duration: number = 1.0) => {
    if (!lenis) return;
    const sorted = Array.from(sectionsRef.current.values()).sort(
      (a, b) => a.index - b.index
    );
    const target = sorted[index];
    if (!target) return;
    setSnapping(true);
    lenis.scrollTo(target.element, {
      duration,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      onComplete: () => setSnapping(false),
    });
  }, [lenis]);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrollProgress,
        activeIndex,
        isSnapping,
        sections,
        registerSection,
        snapToSection,
        setSnapping,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
