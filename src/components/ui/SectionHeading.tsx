"use client";

import { cn } from "@/lib/utils";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

// ============================================================================
// DESIGN NOTES:
// - Text reveal uses CSS mask/clip-path for the "slide up from invisible"
// - ScrollFloatReveal triggers animation when entering viewport
// - Supports multiple animation styles: reveal, fade, slide
// - GPU-accelerated: only transforms and opacity
// ============================================================================

type AnimationStyle = "reveal" | "word-by-word" | "fade" | "slide" | "scroll-float";

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
  animation = "scroll-float",
  className,
  titleClassName,
  subtitleClassName,
  once = true,
  gradientWords = [],
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      className={cn("flex flex-col", alignmentClasses[align], className)}
    >
      {/* Badge */}
      {badge && (
        <ScrollFloatReveal
          as="span"
          y={REVEAL_CONFIG.translateY}
          duration={MOTION_DURATION.fast}
          once={once}
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6"
        >
          {badge}
        </ScrollFloatReveal>
      )}

      {/* Title with text reveal */}
      {animation === "scroll-float" ? (
        <FloatHeading
          as="h2"
          duration={MOTION_DURATION.display}
          className={cn(
            "my-0",
            align === "center" && "mx-auto",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
          gradientWords={gradientWords}
          once={once}
        >
          {title}
        </FloatHeading>
      ) : animation === "word-by-word" ? (
        <FloatHeading
          as="h2"
          duration={MOTION_DURATION.slow}
          className={cn(
            "my-0",
            align === "center" && "mx-auto",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
          gradientWords={gradientWords}
          once={once}
        >
          {title}
        </FloatHeading>
      ) : animation === "reveal" ? (
        <div className="overflow-hidden">
          <ScrollFloatReveal
            as="h2"
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.normal}
            once={once}
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
              titleClassName
            )}
          >
            {title}
          </ScrollFloatReveal>
        </div>
      ) : animation === "fade" ? (
        <ScrollFloatReveal
          as="h2"
          y={0}
          duration={MOTION_DURATION.normal}
          once={once}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
        >
          {title}
        </ScrollFloatReveal>
      ) : (
        <ScrollFloatReveal
          as="h2"
          x={-REVEAL_CONFIG.translateX}
          duration={MOTION_DURATION.normal}
          once={once}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
            titleClassName
          )}
        >
          {title}
        </ScrollFloatReveal>
      )}

      {/* Subtitle */}
      {subtitle && (
        <ScrollFloatReveal
          as="p"
          y={REVEAL_CONFIG.translateY}
          delay={0.15}
          duration={MOTION_DURATION.normal}
          once={once}
          className={cn(
            "mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed",
            subtitleClassName
          )}
        >
          {subtitle}
        </ScrollFloatReveal>
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
  return (
    <ScrollFloatReveal
      as="span"
      y={REVEAL_CONFIG.translateY}
      delay={delay}
      duration={MOTION_DURATION.fast}
      className={cn("inline-block overflow-hidden", className)}
    >
      <span className="inline-block">{children}</span>
    </ScrollFloatReveal>
  );
}

export default SectionHeading;
