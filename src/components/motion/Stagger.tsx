"use client";

import type { ElementType, ReactNode, ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/motion/tokens";
import { VIEWPORT_ONCE } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface StaggerProps extends HTMLMotionProps<"div"> {
  as?: ElementType;
  delayChildren?: number;
  staggerChildren?: number;
  children: ReactNode;
}

export function Stagger({
  as = "div",
  className,
  delayChildren,
  staggerChildren,
  children,
  ...rest
}: StaggerProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const resolvedDelayChildren = delayChildren ?? MOTION_TOKENS.stagger.delayChildren;
  const resolvedStaggerChildren =
    staggerChildren ?? MOTION_TOKENS.stagger.staggerChildren;
  const variants = {
    initial: {},
    animate: {
      transition: reducedMotion
        ? {}
        : {
            staggerChildren: resolvedStaggerChildren,
            delayChildren: resolvedDelayChildren,
          },
    },
  };

  const motionMap = motion as unknown as Record<string, ComponentType<any>>;
  const MotionComponent =
    typeof as === "string" ? motionMap[as] ?? motion.div : motion.div;

  return (
    <MotionComponent
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={VIEWPORT_ONCE}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
