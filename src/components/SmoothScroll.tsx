"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const isAndroid =
      typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

    const lenis = new Lenis({
      duration: isAndroid ? 1 : 1.2,
      lerp: isAndroid ? 0.09 : 0.08,
      smoothWheel: true,
      touchMultiplier: isAndroid ? 1.2 : 1.5,
      wheelMultiplier: 1.05,
      ...(isAndroid
        ? {
            syncTouch: true,
            syncTouchLerp: 0.12,
            touchInertiaExponent: 30,
          }
        : {}),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
