"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// DESIGN NOTES:
// - Text reveal uses CSS mask/clip-path for the "slide up from invisible"
// - useInView triggers animation when entering viewport
// - Supports multiple animation styles: reveal, fade, slide
// - GPU-accelerated: only transforms and opacity
// ============================================================================

const revealVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

type AnimationStyle = "reveal" | "word-by-word" | "fade" | "slide";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  animation?: AnimationStyle;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  once?: boolean;
  /** Word indices (0-based) that should have gradient styling */
  gradientWords?: number[];
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  animation = "word-by-word",
  className,
  titleClassName,
  subtitleClassName,
  once = true,
  gradientWords = [],
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const words = title.split(" ");

  return (
    <div
      ref={ref}
      className={cn("flex flex-col", alignmentClasses[align], className)}
    >
      {/* Badge */}
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6"
        >
          {badge}
        </motion.span>
      )}

      {/* Title with text reveal */}
      {animation === "word-by-word" ? (
        <motion.h2
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span 
                variants={wordVariants} 
                className={cn(
                  "inline-block",
                  gradientWords.includes(index) && "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
                )}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
      ) : animation === "reveal" ? (
        <div className="overflow-hidden">
          <motion.h2
            variants={revealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
              titleClassName
            )}
          >
            {title}
          </motion.h2>
        </div>
      ) : animation === "fade" ? (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
        >
          {title}
        </motion.h2>
      ) : (
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
        >
          {title}
        </motion.h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed",
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// Simpler text reveal for inline use
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default SectionHeading;
