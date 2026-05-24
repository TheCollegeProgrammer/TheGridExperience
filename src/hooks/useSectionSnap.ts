"use client";

import { useEffect, useRef } from "react";
import { useScrollContext } from "@/providers/ScrollProvider";

export function useSectionSnap(sectionId: string, index: number) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection } = useScrollContext();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const unregister = registerSection({ id: sectionId, index, element: el });
    return unregister;
  }, [sectionId, index, registerSection]);

  return ref;
}
