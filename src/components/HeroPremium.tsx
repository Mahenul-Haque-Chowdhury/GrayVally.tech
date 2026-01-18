"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { FloatHeading } from "@/components/ui/ScrollFloat";

// ============================================================================
// DESIGN NOTES:
// - ParticleField is dynamically imported to avoid SSR issues with Three.js
// - Text uses staggered character reveal for premium "Awwwards" feel
// - CTA buttons use subtle hover animations (scale + glow)
// - All animations use GPU-accelerated properties only (transform, opacity)
// ============================================================================

// Dynamic import prevents SSR issues with Three.js
const ParticleField = dynamic(
  () => import("@/components/3d/ParticleField").then((mod) => mod.ParticleField),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
    ),
  }
);

// Animation variants for staggered text reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-flex overflow-hidden", className)}
      style={{ perspective: 1000 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function HeroPremium() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* 3D Particle Background */}
      <ParticleField className="absolute inset-0 z-0" />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(2, 6, 23, 0.8) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2, 6, 23, 0.3) 0%, transparent 30%, transparent 70%, rgba(2, 6, 23, 0.9) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for projects
            </span>
          </motion.div>

          {/* Main Title - Staggered Character Reveal */}
          <FloatHeading as="h1" className="mt-8 sm:mt-12 font-display font-bold tracking-tighter text-white">
            <AnimatedText
              text="GRAYVALLY"
              className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            />
          </FloatHeading>

          {/* Tagline */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="mt-4 sm:mt-6 max-w-xl text-lg sm:text-xl md:text-2xl font-light text-white/60 tracking-wide"
          >
            Digital Infrastructure
            <span className="mx-2 text-cyan-400">•</span>
            Engineering Excellence
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
            className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base text-white/50 leading-relaxed px-4"
          >
            We architect resilient systems and craft pixel-perfect experiences
            that power ambitious businesses worldwide. From scalable backends
            to stunning frontends.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm sm:text-base font-semibold text-slate-950 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start a Project</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              {/* Gradient hover overlay */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="absolute inset-0 translate-x-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 group-hover:translate-x-0 z-10 flex items-center justify-center gap-2 text-white">
                Start a Project
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm sm:text-base font-medium text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <span>View Our Work</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroPremium;
