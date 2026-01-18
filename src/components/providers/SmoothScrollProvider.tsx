"use client";

import { useEffect, useRef, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// DESIGN NOTES:
// - Lenis provides buttery-smooth scrolling without jank
// - Integrated with GSAP ScrollTrigger for scroll-linked animations
// - Uses requestAnimationFrame for smooth updates
// - Route change cleanup to prevent memory leaks
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

// Premium easing function (ease-out-expo style)
const defaultEasing = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// Check reduced motion preference
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Cleanup function for route changes
  const cleanup = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    ScrollTrigger.refresh();
  }, []);

  // Cleanup on route change
  useEffect(() => {
    cleanup();
  }, [pathname, cleanup]);

  useEffect(() => {
    // Skip Lenis if reduced motion is preferred
    if (prefersReducedMotion()) {
      return;
    }

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

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Set up GSAP ticker to update Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for smoother animations
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for other components
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      const href = anchor?.getAttribute("href");

      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Refresh ScrollTrigger when images load
    const images = document.querySelectorAll("img");
    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    if (loadedCount === totalImages) {
      ScrollTrigger.refresh();
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
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
