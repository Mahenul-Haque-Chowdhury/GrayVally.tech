"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Code2, Handshake, Layers, Medal, TrendingUp } from "lucide-react";
import { Section } from "@/components/motion/Section";

export function Hero() {
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const heroCards = [
    { id: "hero-card-1", side: "left", size: "primary" },
    { id: "hero-card-2", side: "left", size: "secondary" },
    { id: "hero-card-3", side: "center", size: "small" },
    { id: "hero-card-4", side: "right", size: "secondary" },
    { id: "hero-card-5", side: "right", size: "primary" },
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

  // --- 2. Pocket Peek Animations ---
  const getPeekVariant = (id: string, index: number): Variants => {
    const baseDelay = 1.2; // Start after text finishes
    const stepDelay = 0.2; // Delay between each card
    
    // Serial Delay: 1st card -> 2nd card -> 3rd -> 4th -> 5th
    const specificDelay = baseDelay + (index * stepDelay);

    const transition = { 
      duration: 0.7, 
      ease: [0.21, 0.47, 0.32, 0.98],
      delay: specificDelay 
    };

    if (reducedMotion) {
      return { hidden: { opacity: 0 }, visible: { opacity: 1, transition } };
    }

    if (id === "hero-card-1" || id === "hero-card-2") {
      return { hidden: { x: "-100%" }, visible: { x: "0%", transition } };
    }
    if (id === "hero-card-3") {
      return { hidden: { y: "100%" }, visible: { y: "0%", transition } };
    }
    if (id === "hero-card-4" || id === "hero-card-5") {
      return { hidden: { x: "100%" }, visible: { x: "0%", transition } };
    }

    return { hidden: { opacity: 0 }, visible: { opacity: 1, transition } };
  };

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

          

          <div className="mx-auto flex w-full max-w-5xl items-end justify-center gap-3 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-4 sm:gap-y-6 md:gap-6 lg:flex lg:max-w-none lg:flex-row lg:items-end lg:justify-center lg:gap-[48px]">
            {heroCards.map((card, index) => {
              // --- FIX: MUTUALLY EXCLUSIVE SIZE CLASSES ---
              // Each block contains full responsive logic (Base -> sm -> lg) for that specific card size
              let sizeClasses = "";
              
              if (card.size === "primary") {
                 // Primary (Outer Cards): Largest at all breakpoints
                 sizeClasses = "w-[130px] h-[180px] rounded-[18px] sm:w-[170px] sm:h-[230px] sm:rounded-[22px] lg:w-[210px] lg:h-[270px]";
              } else if (card.size === "secondary") {
                 // Secondary (Middle Cards): Medium size
                 sizeClasses = "w-[120px] h-[165px] rounded-[14px] sm:w-[150px] sm:h-[190px] sm:rounded-[18px] lg:w-[170px] lg:h-[205px]";
              } else if (card.size === "small") {
                 // Small (Center Card): Smallest size
                 sizeClasses = "w-[115px] h-[160px] rounded-[12px] sm:w-[135px] sm:h-[180px] sm:rounded-[16px] lg:w-[150px] lg:h-[170px]";
              }

              const pocketClasses = [
                "flex-none relative overflow-hidden",
                card.id === "hero-card-1" || card.id === "hero-card-5" ? "hidden sm:block" : "",
                card.id === "hero-card-2"
                  ? "order-1 sm:order-none sm:justify-self-center"
                  : "",
                card.id === "hero-card-3"
                  ? "order-2 sm:order-none sm:col-span-2 sm:justify-self-center"
                  : "",
                card.id === "hero-card-4"
                  ? "order-3 sm:order-none sm:justify-self-center"
                  : "",
                sizeClasses, // This variable now controls all dimensions purely
              ].join(" ");

              const innerClasses = [
                 "h-full w-full",
                 "bg-surface/20 backdrop-blur-sm",
                 card.id === "hero-card-2" ? "bg-[#0f2d2f] text-white" : "",
                 card.id === "hero-card-3" ? "bg-[#f7f7f2] text-[#1d2b2a]" : "",
                 card.id === "hero-card-4" ? "bg-[#0b1718] text-white" : "",
              ].join(" ");

              return (
                <div key={card.id} className={pocketClasses}>
                  <motion.div
                    className={innerClasses}
                    variants={getPeekVariant(card.id, index)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {card.id === "hero-card-1" ? (
                      <div className="relative h-full w-full">
                        <Image src="/webdev.png" alt="Web development" fill className="absolute inset-0 h-full w-full object-cover object-center" priority />
                        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white">
                          <Code2 className="h-6 w-6" />
                        </div>
                      </div>
                    ) : card.id === "hero-card-2" ? (
                      <div className="flex h-full w-full flex-col justify-between p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                          <Handshake className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl sm:text-3xl font-semibold">25+</div>
                          <div className="mt-2 text-xs sm:text-sm text-white/70">Clients &amp; Trusted Partners</div>
                        </div>
                      </div>
                    ) : card.id === "hero-card-3" ? (
                      <div className="relative flex h-full w-full flex-col justify-between p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfe8d0]">
                          <Layers className="h-6 w-6 text-[#1d2b2a]" />
                        </div>
                        <button onClick={() => setIsCaseMenuOpen((open) => !open)} className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#1d2b2a] hover:bg-black/10">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
                        </button>
                        {isCaseMenuOpen && (
                          <div className="absolute right-3 top-12 z-10 w-48 rounded-xl bg-white/95 p-2 text-sm text-[#1d2b2a] shadow-lg ring-1 ring-black/5">
                            <Link href="/work" className="block rounded-lg px-3 py-2 hover:bg-black/5">Explore Case Studies</Link>
                          </div>
                        )}
                        <div>
                          <div className="text-2xl sm:text-3xl font-semibold text-[#1d2b2a]">50+</div>
                          <div className="mt-2 text-xs sm:text-sm text-[#1d2b2a]/80">Total Projects</div>
                          <div className="mt-1 text-xs sm:text-sm text-[#1d2b2a]/70">Apps • Web • SaaS</div>
                        </div>
                      </div>
                    ) : card.id === "hero-card-4" ? (
                      <div className="flex h-full w-full flex-col justify-between p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                          <Medal className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl sm:text-3xl font-semibold">5+</div>
                          <div className="mt-2 text-xs sm:text-sm text-white/70">Years of Professional Experience</div>
                        </div>
                      </div>
                    ) : card.id === "hero-card-5" ? (
                      <div className="relative h-full w-full">
                        <Image src="/rightbox.png" alt="" fill className="absolute inset-0 h-full w-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-4 z-10 flex flex-col justify-between">
                          <div className="pt-3 pl-3">
                             <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white" />
                             </div>
                          </div>
                          <div className="pb-6 pl-6 pr-6 text-left">
                            <p className="text-white text-base sm:text-lg font-medium leading-snug">Achieve maximum potential of your business.</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Section>
  );
}
