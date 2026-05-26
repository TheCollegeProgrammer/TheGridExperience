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
    <div className="relative w-[180px] h-[180px] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-spin-slow" />
      <div className="absolute inset-[15px] rounded-full border border-white/10 animate-spin-reverse" />

      <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute w-1 h-1 rounded-full bg-cyan-400/40 bottom-[15%] right-[8%] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute w-1 h-1 rounded-full bg-white/30 top-[25%] left-[6%] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden border border-white/10">
        <Image
          src="/img/Section-6-img/user-logo.png"
          alt="Developer"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-[30px] rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />
    </div>
  );
}

function SocialButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-sm text-white/70 font-mono tracking-wide hover:bg-white/[0.07] hover:border-cyan-500/40 hover:text-white transition-all duration-500 group"
    >
      <span className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400/70 transition-colors duration-500" />
      {label}
    </a>
  );
}

function ToolPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-zinc-400 hover:bg-white/[0.06] hover:border-cyan-500/20 hover:text-zinc-200 transition-all duration-300 cursor-default">
      <span className="w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
      {name}
    </div>
  );
}

function QuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-5 mb-5 px-5 py-4 rounded-xl bg-white/[0.02] border border-cyan-500/10 backdrop-blur-sm"
    >
      <p className="text-sm text-zinc-300 leading-relaxed font-light italic text-center">
        {'\u201C'}Always learning. Always building. Always shipping.{'\u201D'}
      </p>
    </motion.div>
  );
}

export default function DeveloperInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex flex-col h-full w-[24%] min-w-[320px] bg-[#050505]/90 border-r border-white/[0.03] overflow-y-auto"
    >
      <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col flex-1 px-6 py-8 gap-5">
        <DeveloperLogo />

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-2xl font-bold tracking-tight text-white text-center"
        >
          Devansh Avchat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs text-blue-200/60 text-center font-light leading-relaxed"
        >
          CS Student {'\u2022'} Full-Stack Developer {'\u2022'} AI & Data Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs text-zinc-400 leading-relaxed text-center px-2"
        >
          I build intelligent, data-driven digital experiences that merge engineering precision with cinematic interaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center gap-3"
        >
          <SocialButton href="https://linkedin.com/in/devansh-avchat" label="LinkedIn" />
          <SocialButton href="https://github.com/devansh-avchat" label="GitHub" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-1"
        >
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 mb-3 text-center">
            <span className="text-cyan-400">{'\u2014'}</span> I BUILD USING
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {tools.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </div>
        </motion.div>

        <div className="flex-1" />
      </div>

      <QuoteCard />
    </motion.aside>
  );
}
