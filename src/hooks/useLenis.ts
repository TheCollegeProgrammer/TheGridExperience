"use client";

import { useLenisInstance } from "@/providers/SmoothScrollProvider";

export function useLenis() {
  const { lenis } = useLenisInstance();
  return lenis;
}
