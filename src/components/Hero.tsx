"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Section } from "@/components/motion/Section";

export function Hero() {
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselIndexRef = useRef(0);
  const carouselResetRef = useRef<number | null>(null);

  const heroCards = [
    { id: "hero-card-2", side: "left", size: "secondary" },
    { id: "hero-card-3", side: "center", size: "small" },
    { id: "hero-card-4", side: "right", size: "secondary" },
  ] as const;

  // --- 1. Text Animations ---
  const fadeInFromTop = useMemo(
    () =>
      reducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          },
    [reducedMotion]
  );

  const textContainer = useMemo(
    () => ({
      visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    }),
    []
  );

  // --- 2. Stat Text Animations ---
  const getTextRevealVariant = (index: number): Variants => {
    const baseDelay = isMobile ? 0.2 : 1.2;
    const stepDelay = isMobile ? 0.1 : 0.2;
    const transition = {
      duration: isMobile ? 0.35 : 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
      delay: baseDelay + index * stepDelay,
    };

    if (reducedMotion) {
      return { hidden: { opacity: 0 }, visible: { opacity: 1, transition } };
    }

    return { hidden: { opacity: 0, y: isMobile ? 24 : 60 }, visible: { opacity: 1, y: 0, transition } };
  };

  useEffect(() => {
    if (reducedMotion) return;
    const container = carouselRef.current;
    if (!container || typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 639px)");
    const handleMobile = () => setIsMobile(media.matches);
    handleMobile();
    let intervalId: number | null = null;

    const getStep = () => {
      const firstCard = container.querySelector<HTMLElement>(".hero-stat-card");
      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      if (!firstCard) return 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const scrollNext = () => {
      const step = getStep();
      if (!step) return;
      const baseCount = heroCards.length;
      const nextIndex = carouselIndexRef.current + 1;

      if (carouselResetRef.current) {
        window.clearTimeout(carouselResetRef.current);
        carouselResetRef.current = null;
      }

      container.scrollTo({ left: step * nextIndex, behavior: "smooth" });
      carouselIndexRef.current = nextIndex;

      if (nextIndex >= baseCount) {
        carouselResetRef.current = window.setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "auto" });
          carouselIndexRef.current = 0;
        }, 600);
      }
    };

    const start = () => {
      if (!media.matches) return;
      intervalId = window.setInterval(scrollNext, 3000);
    };

    const stop = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      if (carouselResetRef.current) {
        window.clearTimeout(carouselResetRef.current);
        carouselResetRef.current = null;
      }
    };

    const handleChange = () => {
      stop();
      start();
    };

    handleChange();
    media.addEventListener("change", handleMobile);
    media.addEventListener("change", handleChange);

    return () => {
      stop();
      media.removeEventListener("change", handleMobile);
      media.removeEventListener("change", handleChange);
    };
  }, [reducedMotion]);

  return (
    <Section className="hero relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))",
          }}
        />
      </div>
      
      {/* === FLOATING BACKGROUND ICONS === */}
      <motion.div
        className="pointer-events-none absolute left-6 top-64 z-10 text-cyan-300/35 sm:left-10 sm:top-68 md:left-16 md:top-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [-6, 6] }}
        transition={{ 
          y: { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
          opacity: { duration: 0.6, delay: 2.4, ease: "easeOut" } // Loads instantly after cards
        }}
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l2.4 9.6a1 1 0 0 0 .98.76H18a1 1 0 0 0 .96-.72L21 8H7" />
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-24 bottom-64 z-10 text-cyan-300/35 sm:left-32 sm:bottom-60 md:left-36 md:bottom-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [-6, 6] }}
        transition={{ 
          y: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
          opacity: { duration: 0.6, delay: 2.5, ease: "easeOut" } // Slight stagger
        }}
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7l4 5-4 5" />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-36 bottom-64 z-10 text-cyan-300/35 sm:right-40 sm:bottom-60 md:right-44 md:bottom-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [-6, 6] }}
        transition={{ 
          y: { duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
          opacity: { duration: 0.6, delay: 2.6, ease: "easeOut" } // Slight stagger
        }}
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l9 4-9 4-9-4 9-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v4.5c0 .8 2.7 2.5 6 2.5s6-1.7 6-2.5V12" />
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 w-full">
        
        {/* === TEXT CONTENT === */}
        <motion.div
          className="flex flex-col items-center text-center -mt-2 pt-0 sm:mt-0 sm:pt-24 md:pt-22 lg:pt-20"
          variants={textContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInFromTop}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeInFromTop} className="mt-2 sm:mt-4 max-w-5xl font-display font-bold tracking-tight text-text-primary text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Building Products that Drive{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Business Growth
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeInFromTop} className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed px-4">
            Scalable backends and precise frontends, engineered as one system.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInFromTop} className="mt-8 sm:mt-10 flex items-start justify-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1">
              <a href="https://calendly.com/grayvally-tech/30min" target="_blank" rel="noopener noreferrer" className="group relative inline-flex h-10 sm:h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#006bff] px-3 sm:px-8 text-[11px] sm:text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0">
                <span className="relative z-10 whitespace-nowrap">Book a meeting</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <span className="text-[11px] text-text-secondary">Powered by Calendly</span>
            </div>
            <Link href="/audit" className="group relative inline-flex h-10 sm:h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-border/60 bg-transparent backdrop-blur-sm px-3 sm:px-8 text-[11px] sm:text-base font-semibold text-text-primary transition-colors duration-300 hover:border-text-secondary/50">
              <span className="whitespace-nowrap">Free Website Audit</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
          </motion.div>
        </motion.div>

        {/* === CARDS SECTION === */}
        <div className="relative -mt-4 sm:-mt-6 mb-12 sm:mb-8 w-full pt-12 sm:pt-16">
          
          {/*
          Rating Badge (We are 5-star on Google) - temporarily disabled.
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 1.2, duration: 0.5 }} 
            className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6 z-20"
          >
            <a href="https://share.google/GZYrGCYlWKAbnqKhD" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col items-center gap-0 rounded-full bg-background/40 px-5 py-1 hover:scale-105 transition-transform duration-200">
              <span className="text-sm text-text-secondary leading-tight">We are</span>
              <span className="inline-flex items-center gap-1 leading-tight">
                <span className="text-black dark:text-white text-lg sm:text-xl font-bold leading-tight">5.00</span>
                <span className="inline-flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0L4.184 18.95c-.784.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L.203 9.294c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L7.205 2.927z" /></svg>
                  ))}
                </span>
              </span>
              <span className="mt-3 sm:mt-0 text-xs text-text-secondary flex items-center gap-1 leading-tight">
                 <span className="inline-flex items-center font-semibold text-base sm:text-lg">on</span>
                 <span className="inline-flex items-center font-semibold text-base sm:text-lg">
                   <span className="text-[#4285F4]">G</span><span className="text-[#DB4437]">o</span><span className="text-[#F4B400]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#0F9D58]">l</span><span className="text-[#DB4437]">e</span>
                 </span>
              </span>
            </a>
          </motion.div>
          */}

          

          <div
            ref={carouselRef}
            className="hero-stat-carousel mx-auto flex w-full max-w-5xl items-end justify-start gap-3 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 sm:items-start sm:justify-center sm:gap-x-4 sm:gap-y-6 sm:overflow-visible md:gap-6 lg:flex lg:max-w-none lg:flex-row lg:items-end lg:justify-center lg:gap-[48px]"
          >
            {[...heroCards, ...heroCards].map((card, index) => {
              const isDuplicate = index >= heroCards.length;
              // Keep widths for layout rhythm, but remove card "shape" styles.
              let sizeClasses = "";
              
              if (card.size === "primary") {
                 sizeClasses = "w-[calc(50%-0.5rem)] min-w-[calc(50%-0.5rem)] sm:w-[220px] sm:min-w-0 lg:w-[240px]";
              } else if (card.size === "secondary") {
                 sizeClasses = "w-[calc(50%-0.5rem)] min-w-[calc(50%-0.5rem)] sm:w-[220px] sm:min-w-0 lg:w-[240px]";
              } else if (card.size === "small") {
                 sizeClasses = "w-[calc(50%-0.5rem)] min-w-[calc(50%-0.5rem)] sm:w-[220px] sm:min-w-0 lg:w-[240px]";
              }

              const pocketClasses = [
                "hero-stat-card flex-none relative",
                isDuplicate ? "sm:hidden" : "",
                card.id === "hero-card-2"
                  ? "sm:justify-self-center"
                  : "",
                card.id === "hero-card-3"
                  ? "sm:col-span-2 sm:justify-self-center"
                  : "",
                card.id === "hero-card-4"
                  ? "sm:justify-self-center"
                  : "",
                sizeClasses, // This variable now controls all dimensions purely
              ].join(" ");

              const innerClasses =
                "w-full min-h-[170px] rounded-2xl bg-surface/20 backdrop-blur-sm text-text-primary overflow-hidden sm:min-h-[200px] lg:min-h-[220px]";

              return (
                <div key={`${card.id}-${index}`} className={pocketClasses}>
                  <div className={innerClasses}>
                    {card.id === "hero-card-2" ? (
                      <div className="flex w-full flex-col items-center gap-4 p-4 text-center">
                        <motion.div
                          variants={getTextRevealVariant(index)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="flex flex-col items-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/30 backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="url(#hero-icon-gradient-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <defs>
                                <linearGradient id="hero-icon-gradient-2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                  <stop offset="0%" stopColor="#60a5fa" />
                                  <stop offset="50%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#2dd4bf" />
                                </linearGradient>
                              </defs>
                              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                              <path d="m21 3 1 11h-2" />
                              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                              <path d="M3 4h8" />
                            </svg>
                          </div>
                          <div className="text-2xl sm:text-3xl font-semibold text-text-primary">25+</div>
                          <div className="mt-2 text-xs sm:text-sm text-text-secondary/90">Clients &amp; Trusted Partners</div>
                        </motion.div>
                      </div>
                    ) : card.id === "hero-card-3" ? (
                      <div className="relative flex w-full flex-col items-center gap-4 p-4 text-center">
                        <button onClick={() => setIsCaseMenuOpen((open) => !open)} className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface/40 text-text-secondary hover:bg-surface/60">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
                        </button>
                        {isCaseMenuOpen && (
                          <div className="absolute right-3 top-12 z-10 w-48 rounded-xl bg-white/95 p-2 text-sm text-[#1d2b2a] shadow-lg ring-1 ring-black/5">
                            <Link href="/portfolio#case-studies" className="block rounded-lg px-3 py-2 hover:bg-black/5">Explore Case Studies</Link>
                          </div>
                        )}
                        <motion.div
                          variants={getTextRevealVariant(index)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="flex flex-col items-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/30 backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="url(#hero-icon-gradient-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <defs>
                                <linearGradient id="hero-icon-gradient-3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                  <stop offset="0%" stopColor="#60a5fa" />
                                  <stop offset="50%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#2dd4bf" />
                                </linearGradient>
                              </defs>
                              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                              <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                              <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
                            </svg>
                          </div>
                          <div className="text-2xl sm:text-3xl font-semibold text-text-primary">50+</div>
                          <div className="mt-2 text-xs sm:text-sm text-text-secondary/90">Total Projects</div>
                          <div className="mt-1 text-xs sm:text-sm text-text-secondary/70">Apps • Web • SaaS</div>
                        </motion.div>
                      </div>
                    ) : card.id === "hero-card-4" ? (
                      <div className="flex w-full flex-col items-center gap-4 p-4 text-center">
                        <motion.div
                          variants={getTextRevealVariant(index)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="flex flex-col items-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/30 backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="url(#hero-icon-gradient-4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <defs>
                                <linearGradient id="hero-icon-gradient-4" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                  <stop offset="0%" stopColor="#60a5fa" />
                                  <stop offset="50%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#2dd4bf" />
                                </linearGradient>
                              </defs>
                              <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                              <path d="M11 12 5.12 2.2" />
                              <path d="m13 12 5.88-9.8" />
                              <path d="M8 7h8" />
                              <circle cx="12" cy="17" r="5" />
                              <path d="M12 18v-2h-.5" />
                            </svg>
                          </div>
                          <div className="text-2xl sm:text-3xl font-semibold text-text-primary">7+</div>
                          <div className="mt-2 text-xs sm:text-sm text-text-secondary/90">Years of Combined Professional Experience</div>
                        </motion.div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Section>
  );
}
