"use client";

import type { ElementType, ReactNode, ComponentType } from "react";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { MotionVariantName, VIEWPORT_ONCE, resolveMotionVariants } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  as?: ElementType;
  variant?: MotionVariantName;
  delay?: number;
  useParent?: boolean;
  triggerOnMount?: boolean;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  gradientWords?: number[];
  gradientClassName?: string;
  children: ReactNode;
}

const DEFAULT_GRADIENT_CLASS =
  "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent";

export function Reveal({
  as = "div",
  variant,
  className,
  delay,
  useParent = false,
  triggerOnMount = false,
  duration: _duration,
  y: _y,
  x: _x,
  scale: _scale,
  once: _once,
  rootMargin: _rootMargin,
  threshold: _threshold,
  gradientWords,
  gradientClassName = DEFAULT_GRADIENT_CLASS,
  children,
  ...rest
}: RevealProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const resolvedVariant =
    variant ??
    (typeof as === "string" &&
    ["h1", "h2", "h3", "h4", "h5", "h6"].includes(as)
      ? "headline"
      : "bodyText");
  const baseVariants = resolveMotionVariants(resolvedVariant, reducedMotion);

  const variants = delay
    ? {
        initial: baseVariants.initial,
        animate: {
          ...baseVariants.animate,
          transition: { ...baseVariants.animate.transition, delay },
        },
      }
    : baseVariants;

  const content = useMemo(() => {
    if (!gradientWords?.length || typeof children !== "string") {
      return children;
    }

    const words = children.split(" ");
    const gradientSet = new Set(gradientWords);

    return words.map((word, index) => (
      <span key={`word-${index}`} className={gradientSet.has(index) ? gradientClassName : undefined}>
        {word}
        {index < words.length - 1 ? " " : null}
      </span>
    ));
  }, [children, gradientWords, gradientClassName]);

  const motionMap = motion as unknown as Record<string, ComponentType<any>>;
  const MotionComponent =
    typeof as === "string" ? motionMap[as] ?? motion.div : motion.div;

  return (
    <MotionComponent
      variants={variants}
      initial={useParent ? undefined : "initial"}
      animate={useParent || !triggerOnMount ? undefined : "animate"}
      whileInView={useParent || triggerOnMount ? undefined : "animate"}
      viewport={useParent || triggerOnMount ? undefined : VIEWPORT_ONCE}
      className={cn(className)}
      {...rest}
    >
      {content}
    </MotionComponent>
  );
}

export type { MotionVariantName } from "@/lib/motion/variants";
