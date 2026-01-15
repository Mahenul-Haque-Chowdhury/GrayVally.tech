"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

// ============================================================================
// DESIGN NOTES:
// - Lenis provides buttery-smooth scrolling without jank
// - Compatible with GSAP ScrollTrigger if needed
// - Uses requestAnimationFrame for smooth updates
// - Configurable duration and easing
// ============================================================================

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: "vertical" | "horizontal";
    smoothWheel?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
  };
}

// Default easing function (ease-out-expo style)
const defaultEasing = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on mobile/touch devices for better performance
    const isMobile = typeof window !== 'undefined' && 
      (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      return; // Skip Lenis on mobile - native scroll is better
    }

    // Initialize Lenis with configuration (desktop only)
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? defaultEasing,
      orientation: options.orientation ?? "vertical",
      smoothWheel: options.smoothWheel ?? true,
      touchMultiplier: options.touchMultiplier ?? 2,
      wheelMultiplier: options.wheelMultiplier ?? 1,
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for GSAP ScrollTrigger integration
    // Usage: window.lenis?.scrollTo(target, { offset, duration })
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete (window as Window & { lenis?: Lenis }).lenis;
      }
    };
  }, [options]);

  return <>{children}</>;
}

// Hook to access Lenis instance
export function useLenis() {
  if (typeof window !== "undefined") {
    return (window as Window & { lenis?: Lenis }).lenis;
  }
  return null;
}

// Utility to scroll to a target
export function scrollTo(
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }
) {
  if (typeof window !== "undefined") {
    const lenis = (window as Window & { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  }
}

export default SmoothScrollProvider;
