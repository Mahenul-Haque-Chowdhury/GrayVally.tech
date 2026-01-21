"use client";

import { motion, Variants, useAnimation } from "framer-motion";
import { Infinity, Layers, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
// Replaced Hyperspeed with a lightweight SVG background using currentColor for theming
import LogoLoop from "./LogoLoop";
import ScrollFloat from "@/components/ui/ScrollFloat";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const backgroundVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 2.1,
      ease: 'easeInOut',
    },
  },
};

const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const fastHeadlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
    },
  },
};

const headlineCharacter: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};




export function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.set("hidden");
    controls.start("visible");
  }, [controls]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background - Hyperspeed Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={backgroundVariant}
        initial="hidden"
        animate={controls}
        aria-hidden
      >
        <div className="absolute inset-0 z-0 text-[#0a141e] dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className="w-full h-full">
            <defs>
              <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={6} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid */}
            <g stroke="currentColor" strokeOpacity="0.06" strokeWidth={1}>
              <path d="M0 80H1200M0 160H1200M0 240H1200M0 320H1200M0 400H1200M0 480H1200M0 560H1200M0 640H1200M0 720H1200" />
              <path d="M80 0V800M160 0V800M240 0V800M320 0V800M400 0V800M480 0V800M560 0V800M640 0V800M720 0V800M800 0V800M880 0V800M960 0V800M1040 0V800M1120 0V800" />
            </g>

            {/* Flow paths */}
            <g fill="none" stroke="currentColor" strokeOpacity="0.10" strokeWidth={2}>
              <path d="M220 540 C 420 420, 520 640, 760 520" />
              <path d="M320 240 C 520 180, 620 320, 860 260" />
              <path d="M540 680 C 620 560, 820 600, 980 440" />
            </g>

            {/* Nodes */}
            <g filter="url(#softGlow)">
              <g fill="currentColor" fillOpacity="0.18">
                <circle cx={220} cy={540} r={6} />
                <circle cx={760} cy={520} r={6} />
                <circle cx={320} cy={240} r={6} />
                <circle cx={860} cy={260} r={6} />
                <circle cx={540} cy={680} r={6} />
                <circle cx={980} cy={440} r={6} />
                <circle cx={620} cy={560} r={5} />
                <circle cx={520} cy={640} r={5} />
              </g>
            </g>
          </svg>
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))",
          }}
        />
      </motion.div>

      <motion.div 
        className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 w-full"
        variants={containerVariant}
        initial="hidden"
        animate={controls}
      >
        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center pt-16 sm:pt-20 md:pt-16 lg:pt-12">
          {/* Badge */}
          <motion.div variants={itemVariant}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <ScrollFloat as="div">
            <motion.h1
              style={{ perspective: "1000px" }}
              variants={itemVariant}
              className="mt-6 sm:mt-8 max-w-5xl font-display font-bold tracking-tight text-text-primary"
              aria-label="We Build Digital Infrastructure"
            >
              <motion.span
                className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                variants={headlineContainer}
              >
                <motion.span className="inline-block" variants={fastHeadlineContainer}>
                  {["Building", "Products", "that", "Drive"].map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      className="inline-block whitespace-nowrap overflow-hidden align-bottom"
                      variants={headlineContainer}
                    >
                      {word.split("").map((char, charIndex) => (
                        <motion.span key={charIndex} className="inline-block" variants={headlineCharacter}>
                          {char}
                        </motion.span>
                      ))}
                      <span className="inline-block">&nbsp;</span>
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span className="inline-block whitespace-nowrap overflow-hidden align-bottom bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent" variants={headlineContainer}>
                  {"Business Growth".split(" ").map((word, wordIndex) => (
                    <motion.span key={wordIndex} className="inline-block" variants={headlineContainer}>
                      {word.split("").map((char, charIndex) => (
                        <motion.span key={charIndex} className="inline-block" variants={headlineCharacter}>
                          {char}
                        </motion.span>
                      ))}
                      <span className="inline-block">&nbsp;</span>
                    </motion.span>
                  ))}
                </motion.span>
              </motion.span>
            </motion.h1>
          </ScrollFloat>

          {/* Subheadline */}
          <motion.p
            variants={itemVariant}
            className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed px-4"
          >
            From scalable backends to pixel-perfect frontends, we architect
            resilient systems that power ambitious businesses worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariant}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-3 sm:gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <a
                href="https://calendly.com/grayvally-tech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#006bff] px-6 sm:px-8 text-sm sm:text-base font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Book a Consultation</span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <span className="text-xs text-text-secondary">Powered by Calendly</span>
            </div>
            <Link
              href="/audit"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-border/60 bg-transparent backdrop-blur-sm px-6 sm:px-8 text-sm sm:text-base font-semibold text-text-primary transition-colors duration-300 hover:border-text-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Complimentary Website Audit</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
          </motion.div>

          {/* Stats Row */}
        <motion.div
          variants={itemVariant}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12 sm:gap-y-4"
        >
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm">
              <Layers className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-xl font-semibold text-text-primary">Scale Ready</p>
              <p className="text-[9px] sm:text-xs text-text-secondary uppercase tracking-wider">Scalable Design</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm">
              <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-xl font-semibold text-text-primary">Rock Solid</p>
              <p className="text-[9px] sm:text-xs text-text-secondary uppercase tracking-wider">Proven reliability</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm">
              <Infinity className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-xl font-semibold text-text-primary">Future Proof</p>
              <p className="text-[9px] sm:text-xs text-text-secondary uppercase tracking-wider">Adaptive systems</p>
            </div>
          </div>
        </motion.div>
        </div>

        {/* Tech Stack Capsule - Bottom */}
        <div className="relative mt-8 sm:mt-10 mb-12 sm:mb-8 flex justify-center px-2">
          <motion.div variants={itemVariant} className="w-full max-w-4xl">
            <div className="hero-tech-capsule w-full overflow-hidden rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4">
              <LogoLoop
                logos={[
                  { node: <i className="hero-tech-icon devicon-html5-plain colored" aria-hidden />, title: "HTML5" },
                  { node: <i className="hero-tech-icon devicon-css3-plain colored" aria-hidden />, title: "CSS3" },
                  { node: <i className="hero-tech-icon devicon-javascript-plain colored" aria-hidden />, title: "JavaScript" },
                  { node: <i className="hero-tech-icon devicon-react-original colored" aria-hidden />, title: "React" },
                  { node: <i className="hero-tech-icon devicon-nextjs-original" aria-hidden />, title: "Next.js" },
                  { node: <i className="hero-tech-icon devicon-typescript-plain colored" aria-hidden />, title: "TypeScript" },
                  { node: <i className="hero-tech-icon devicon-tailwindcss-plain colored" aria-hidden />, title: "Tailwind" },
                  { node: <i className="hero-tech-icon devicon-php-plain colored" aria-hidden />, title: "PHP" },
                  { node: <i className="hero-tech-icon devicon-laravel-plain colored" aria-hidden />, title: "Laravel" },
                  { node: <i className="hero-tech-icon devicon-mysql-plain colored" aria-hidden />, title: "MySQL" },
                  { node: <i className="hero-tech-icon devicon-postgresql-plain colored" aria-hidden />, title: "PostgreSQL" },
                  { node: <i className="hero-tech-icon devicon-python-plain colored" aria-hidden />, title: "Python" },
                  { node: <i className="hero-tech-icon devicon-docker-plain colored" aria-hidden />, title: "Docker" },
                  { node: <i className="hero-tech-icon devicon-git-plain colored" aria-hidden />, title: "Git" },
                ]}
                speed={60}
                direction="left"
                logoHeight={18}
                gap={28}
                hoverSpeed={0}
                fadeOut={false}
                scaleOnHover
                colorMode="brand"
                ariaLabel="Core technologies"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
