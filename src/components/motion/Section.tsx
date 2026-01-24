"use client";

import type { ElementType, ReactNode, ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { MotionVariantName, VIEWPORT_ONCE, resolveMotionVariants } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"div"> {
  as?: ElementType;
  variant?: MotionVariantName;
  children: ReactNode;
}

export function Section({
  as = "section",
  variant = "sectionContainer",
  className,
  children,
  ...rest
}: SectionProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const variants = resolveMotionVariants(variant, reducedMotion);
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
