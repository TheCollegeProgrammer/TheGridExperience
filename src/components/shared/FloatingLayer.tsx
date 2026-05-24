"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/utils";

interface FloatingLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  amplitude?: number;
}

export default function FloatingLayer({
  children,
  className,
  speed = 6,
  amplitude = 15,
}: FloatingLayerProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      y: [0, -amplitude, 0],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, amplitude, speed]);

  return (
    <motion.div
      className={cn("absolute inset-0 pointer-events-none", className)}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
