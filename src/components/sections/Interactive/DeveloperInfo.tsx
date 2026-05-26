"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tools = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Python", "PostgreSQL", "Tailwind", "Framer Motion",
  "GSAP", "Three.js", "Docker", "MongoDB",
];

function DeveloperLogo() {
  return (
    <div className="relative w-[200px] h-[200px] mx-auto flex items-center justify-center" style={{ transform: 'translateX(45px)' }}>
      <div className="absolute inset-0 rounded-full border border-white/[0.08] animate-spin-slow" />
      <div className="absolute inset-[16px] rounded-full border border-white/5 animate-spin-reverse" />

      <div className="absolute w-1.5 h-1.5 rounded-full bg-white/40 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden border border-white/5">
        <Image
          src="/img/Section-6-img/user-logo.png"
          alt="Developer"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
    </div>
  );
}

function SocialButton({ href, label }: { href?: string; label: string }) {
  const baseClass = "flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/60 font-mono tracking-wider hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/90 transition-all duration-500";

  if (!href) {
    return <button className={baseClass}>{label}</button>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClass}
    >
      {label}
    </a>
  );
}

function ToolPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-white/70 hover:bg-white/[0.04] hover:border-white/[0.08] hover:text-white transition-all duration-300 cursor-default">
      {name}
    </div>
  );
}

export default function DeveloperInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative z-50 flex flex-col h-full w-[20%] min-w-[350px] bg-[#050505] border-r border-white/[0.02] overflow-x-visible overflow-y-auto"
    >
      <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent pointer-events-none" />

      <div className="flex flex-col flex-1 px-6 pt-6 pb-2 gap-3">
        <DeveloperLogo />

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative text-3xl font-bold tracking-tight text-white text-center z-30 mt-2 break-all"
        >
          TheCollegeProgrammer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[11px] text-zinc-400 text-center font-light leading-relaxed"
        >
          CS Student {'\u2022'} Full-Stack Developer {'\u2022'} AI & Data Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm text-white/90 leading-relaxed text-center px-2"
        >
          I build intelligent, data-driven digital experiences that merge engineering precision with cinematic interaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center gap-2"
        >
          <SocialButton label="LinkedIn" />
          <SocialButton href="https://github.com/TheCollegeProgrammer" label="GitHub" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/70 mb-2.5 text-center" style={{ marginLeft: '-60px' }}>
            {'\u2014'} Build Tools {'\u2014'}
          </p>
          <div className="grid grid-cols-2 gap-1.5" style={{ marginLeft: '23px' }}>
            {tools.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </div>
        </motion.div>

        <div className="flex-1" />
      </div>

      <div className="h-3" />
    </motion.aside>
  );
}
