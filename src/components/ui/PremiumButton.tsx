// ============================================================================
// PREMIUM BUTTON - Button with Animated Sheen Effect
// ============================================================================

"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion/constants";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const secondaryHover: Variants = {
  hover: { backgroundColor: "rgba(var(--surface-rgb), 0.5)" },
  tap: { scale: 0.98 },
}

export function PremiumButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: PremiumButtonProps) {
  const reducedMotion = prefersReducedMotion();

  const baseStyles = "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-300";
  
  const variants = {
    primary: "bg-[#006bff] text-white",
    secondary: "border border-border/60 bg-transparent backdrop-blur-sm text-text-primary",
    ghost: "bg-transparent text-text-primary",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 sm:px-8 text-sm sm:text-base",
    lg: "h-14 px-8 sm:px-10 text-base sm:text-lg",
  };

  const motionProps = variant === 'primary' 
    ? { variants: buttonVariants, whileHover: "hover", whileTap: "tap" } 
    : { variants: secondaryHover, whileHover: "hover", whileTap: "tap" };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...(!reducedMotion && motionProps)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Hover overlay */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      
      {/* Premium sheen effect */}
      {!reducedMotion && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </motion.button>
  );
}
