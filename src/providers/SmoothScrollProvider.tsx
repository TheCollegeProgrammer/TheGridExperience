"use client";

import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenisInstance() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis] = useState(() => {
    if (typeof window === "undefined") return null;

    gsap.registerPlugin(ScrollTrigger);

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    instance.on("scroll", () => ScrollTrigger.update());
    return instance;
  });

  useEffect(() => {
    if (!lenis) return;

    gsap.ticker.lagSmoothing(0);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
