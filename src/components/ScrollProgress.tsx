// ============================================================================
// SCROLL PROGRESS - Minimal Top Bar Progress Indicator
// ============================================================================

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SCROLL_PROGRESS_CONFIG, prefersReducedMotion } from "@/lib/motion/constants";

// Safe hydration-friendly mount detection
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted || prefersReducedMotion()) return;

    const updateProgress = () => {
      if (!progressRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      progressRef.current.style.transform = `scaleX(${progress / 100})`;
    };

    // Use Lenis scroll event if available, otherwise fallback to window
    const lenis = (window as Window & { lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).lenis;
    
    if (lenis) {
      lenis.on("scroll", updateProgress);
    } else {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }

    updateProgress();

    return () => {
      if (lenis) {
        lenis.off("scroll", updateProgress);
      } else {
        window.removeEventListener("scroll", updateProgress);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="scroll-progress-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: SCROLL_PROGRESS_CONFIG.height,
        zIndex: SCROLL_PROGRESS_CONFIG.zIndex,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    >
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "left",
          transform: "scaleX(0)",
          background: `linear-gradient(90deg, ${SCROLL_PROGRESS_CONFIG.color}, rgb(34, 211, 238))`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
