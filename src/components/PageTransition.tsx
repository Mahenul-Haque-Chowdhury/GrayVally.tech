"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import {
  MOTION_EASE,
  ROUTE_TRANSITION,
  prefersReducedMotion,
} from "@/lib/motion/constants";

type PageTransitionProps = {
  children: ReactNode;
};

// Premium route transition variants with subtle lift + blur
const variants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
  },
};

// Reduced motion variants (simple fade)
const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={pathname}
        variants={reducedMotion ? reducedVariants : variants}
        initial="initial" // Set initial explicitly for clarity
        animate="animate"
        exit="exit"
        transition={{
          duration: reducedMotion ? 0.1 : Math.max(0.7, ROUTE_TRANSITION.duration),
          ease: MOTION_EASE.out,
        }}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
        style={{
          willChange: isAnimating ? "opacity, transform" : "auto",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
