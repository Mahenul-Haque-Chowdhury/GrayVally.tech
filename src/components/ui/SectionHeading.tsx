"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

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
  animation: _animation = "scroll-float",
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
        <Reveal
          as="span"
          variant="bodyText"
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6"
        >
          {badge}
        </Reveal>
      )}

      {/* Title with text reveal */}
      <Reveal
        as="h2"
        variant="headline"
        gradientWords={gradientWords}
        className={cn(
          "my-0",
          align === "center" && "mx-auto",
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary",
          titleClassName
        )}
      >
        {title}
      </Reveal>

      {/* Subtitle */}
      {subtitle && (
        <Reveal
          as="p"
          variant="bodyText"
          delay={0.15}
          className={cn(
            "mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed",
            subtitleClassName
          )}
        >
          {subtitle}
        </Reveal>
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
    <Reveal
      as="span"
      variant="bodyText"
      delay={delay}
      className={cn("inline-block overflow-hidden", className)}
    >
      <span className="inline-block">{children}</span>
    </Reveal>
  );
}

export default SectionHeading;
