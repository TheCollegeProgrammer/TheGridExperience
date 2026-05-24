"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";

const sections = [
  { id: "hero", label: "Home", index: 0 },
  { id: "transformation", label: "The Machine", index: 1 },
  { id: "teams", label: "Teams", index: 2 },
  { id: "garage", label: "Garage", index: 3 },
  { id: "festival", label: "Track", index: 4 },
  { id: "interactive", label: "Experience", index: 5 },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      const current = sections
        .slice()
        .reverse()
        .find((s) => {
          const el = document.getElementById(s.id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.4;
        });
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <div className="flex items-center justify-between px-8 md:px-12 h-20">
        <span className="text-sm font-bold tracking-wider text-white">F1·RB·25</span>
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNav(s.id)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                active === s.id ? "text-white" : "text-zinc-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
