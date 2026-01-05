"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Hyperspeed, { hyperspeedPresets } from "./Hyperspeed";
import LogoLoop from "./LogoLoop";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background - Hyperspeed Effect */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 w-full">
        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center pt-16 sm:pt-20 md:pt-16 lg:pt-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 max-w-5xl font-display font-bold tracking-tight text-text-primary"
          >
            <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              We Build{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Digital
              </span>
            </span>
            <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-secondary mt-1 sm:mt-2">
              Infrastructure
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed px-4"
          >
            From scalable backends to pixel-perfect frontends, we architect
            resilient systems that power ambitious businesses worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-background transition-all duration-300 hover:scale-105 active:scale-95"
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
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
            <Link
              href="/audit"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-text-secondary/50 hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm border border-border/30">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-mono text-lg sm:text-xl font-bold text-text-primary">99.99%</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Uptime SLA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm border border-border/30">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-mono text-lg sm:text-xl font-bold text-text-primary">Global</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Deployment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-surface/40 backdrop-blur-sm border border-border/30">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-mono text-lg sm:text-xl font-bold text-text-primary">24/7</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Capsule - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 mb-8 flex justify-center px-2"
        >
          <div className="hero-tech-capsule w-full max-w-4xl overflow-hidden rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <LogoLoop
              logos={[
                { node: <i className="hero-tech-icon devicon-html5-plain" aria-hidden />, title: "HTML5" },
                { node: <i className="hero-tech-icon devicon-css3-plain" aria-hidden />, title: "CSS3" },
                { node: <i className="hero-tech-icon devicon-javascript-plain" aria-hidden />, title: "JavaScript" },
                { node: <i className="hero-tech-icon devicon-react-original" aria-hidden />, title: "React" },
                { node: <i className="hero-tech-icon devicon-nextjs-original" aria-hidden />, title: "Next.js" },
                { node: <i className="hero-tech-icon devicon-typescript-plain" aria-hidden />, title: "TypeScript" },
                { node: <i className="hero-tech-icon devicon-tailwindcss-plain" aria-hidden />, title: "Tailwind" },
                { node: <i className="hero-tech-icon devicon-php-plain" aria-hidden />, title: "PHP" },
                { node: <i className="hero-tech-icon devicon-laravel-plain" aria-hidden />, title: "Laravel" },
                { node: <i className="hero-tech-icon devicon-mysql-plain" aria-hidden />, title: "MySQL" },
                { node: <i className="hero-tech-icon devicon-postgresql-plain" aria-hidden />, title: "PostgreSQL" },
                { node: <i className="hero-tech-icon devicon-python-plain" aria-hidden />, title: "Python" },
                { node: <i className="hero-tech-icon devicon-docker-plain" aria-hidden />, title: "Docker" },
                { node: <i className="hero-tech-icon devicon-git-plain" aria-hidden />, title: "Git" },
              ]}
              speed={60}
              direction="left"
              logoHeight={18}
              gap={28}
              hoverSpeed={0}
              fadeOut={false}
              scaleOnHover
              ariaLabel="Core technologies"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
