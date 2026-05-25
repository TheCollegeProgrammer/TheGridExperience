"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { ScrollProvider } from "@/providers/ScrollProvider";
import { MagneticScrollGuard } from "@/hooks/useMagneticScroll";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { HeroSection } from "@/components/sections";

const TransformationSection = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.TransformationSection })),
  { ssr: false }
);

const TeamsSection = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.TeamsSection })),
  { ssr: false }
);

const GarageSection = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.GarageSection })),
  { ssr: false }
);

const FestivalSection = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.FestivalSection })),
  { ssr: false }
);

const InteractiveSection = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.InteractiveSection })),
  { ssr: false }
);

function HeroSectionShell() {
  const ref = useSectionSnap("hero", 0);
  return (
    <section id="hero" ref={ref} data-section-index={0} className="relative w-full h-screen border-x-[10px] border-b-[10px] border-transparent">
      <HeroSection />
    </section>
  );
}

function TransformationSectionShell() {
  return <TransformationSection />;
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <ScrollProvider>
        <MagneticScrollGuard />
        <Navigation />
        <main>
          <HeroSectionShell />
          <TransformationSectionShell />
          <TeamsSection />
          <GarageSection />
          <FestivalSection />
          <InteractiveSection />
        </main>
      </ScrollProvider>
    </SmoothScrollProvider>
  );
}
