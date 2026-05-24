"use client";

import { useEffect, useState, useRef } from "react";

interface Viewport {
  width: number;
  height: number;
  dpr: number;
  isMobile: boolean;
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
    dpr: typeof window !== "undefined" ? window.devicePixelRatio : 1,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function handleResize() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
          dpr: window.devicePixelRatio,
          isMobile: window.innerWidth < 768,
        });
      });
    }

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return viewport;
}
