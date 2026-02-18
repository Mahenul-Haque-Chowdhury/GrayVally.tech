"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    tag: "AI Visibility",
    headline: "Are you showing up in AI search results?",
    subheadline: "If you're invisible, your competitors aren't.",
    body: "AI is becoming everyone's daily driver. ChatGPT, Gemini, Perplexity are answering your customers' questions right now. The question is: are you in that answer?",
    cta: { label: "Get an AI Audit", href: "/audit" },
    accent: "from-blue-500 to-cyan-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    tag: "Web Presence",
    headline: "Your website should sell for you 24/7.",
    subheadline: "Is it converting or costing you customers?",
    body: "A slow, outdated, hard-to-find site drives prospects away every single day. We build fast, modern, conversion-focused websites that capture attention, build trust, and turn visitors into paying clients.",
    cta: { label: "See Our Work", href: "/portfolio" },
    accent: "from-violet-500 to-purple-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 0 1 .284-2.253" />
      </svg>
    ),
  },
  {
    tag: "Custom Software",
    headline: "Custom Software Built Only for Your Business.",
    subheadline: "Stop forcing your team to adapt to generic software.",
    body: "Off-the-shelf platforms often come with limitations that slow your growth. We design custom software solutions, automation pipelines, and internal tools tailored to your unique workflow, so your business operates faster, smarter, and more efficiently.",
    cta: { label: "Explore Solutions", href: "/software-solutions" },
    accent: "from-emerald-500 to-teal-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    tag: "Growth Strategy",
    headline: "Growth Strategy That Delivers Results.",
    subheadline: "Technology alone won't drive growth. Strategy and execution do.",
    body: "We go beyond coding. We analyze your operations, identify bottlenecks, eliminate inefficiencies, and deploy the right technology at the perfect time. The result? Sustainable business growth, designed, not accidental.",
    cta: { label: "Start a Project", href: "/contact" },
    accent: "from-orange-500 to-amber-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    tag: "E-Commerce",
    headline: "Looking for an e-commerce website?",
    subheadline: "Your online store should sell even when you sleep.",
    body: "Slow pages, confusing navigation, and poor mobile experience quietly kill sales every day. We build fast, secure, conversion-focused e-commerce stores that make browsing easy, checkout seamless, and customers confident to buy.",
    cta: { label: "Build My Store", href: "/web-solutions" },
    accent: "from-pink-500 to-rose-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
];

const SLIDE_DURATION = 5000; // ms

export function InsightSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = (index: number) => {
    setCurrent(index);
    setProgress(0);
    startTimeRef.current = null;
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setPaused(false);
  };

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent((c) => (c + 1) % slides.length);
        setProgress(0);
        startTimeRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, paused]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-background via-surface/20 to-background py-6 sm:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Insight slider"
    >
      {/* Background decorative blur */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-10 bg-gradient-to-br ${slide.accent} transition-all duration-700`}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-[13rem] sm:h-[16rem] md:h-[11rem] flex flex-col justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-10"
          >
            {/* Icon badge */}
            <div
              className={`shrink-0 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${slide.accent} text-white shadow-lg`}
            >
              {slide.icon}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block mb-1 text-[10px] sm:mb-2 sm:text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
              >
                {slide.tag}
              </span>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-text-primary leading-tight mb-0.5 sm:mb-1">
                {slide.headline}
              </h2>
              <p className={`text-xs sm:text-base font-semibold bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                {slide.subheadline}
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-none">
                {slide.body}
              </p>
            </div>

            {/* CTA — hidden on mobile */}
            <div className="hidden sm:block shrink-0">
              <a
                href={slide.cta.href}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${slide.accent} shadow-md hover:opacity-90 transition-opacity whitespace-nowrap`}
              >
                {slide.cta.label}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Progress dots + navigation */}
        <div className="mt-4 sm:mt-8 flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="text-text-secondary/60 hover:text-text-primary transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Progress indicators */}
          <div className="flex items-center gap-2 flex-1">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                style={{ width: i === current ? "2.5rem" : "0.5rem", background: "rgba(128,128,128,0.25)" }}
              >
                {i === current && (
                  <motion.span
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${slide.accent}`}
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-xs text-text-secondary/50 tabular-nums select-none">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="text-text-secondary/60 hover:text-text-primary transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
