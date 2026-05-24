"use client";

import { type ReactNode } from "react";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { cn } from "@/utils";

interface SectionShellProps {
  children: ReactNode;
  id: string;
  index: number;
  className?: string;
}

export default function SectionShell({ children, id, index, className }: SectionShellProps) {
  const ref = useSectionSnap(id, index);

  return (
    <section
      id={id}
      ref={ref}
      data-section-index={index}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}
