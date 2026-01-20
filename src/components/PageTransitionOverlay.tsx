"use client";

import { motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { prefersReducedMotion } from "@/lib/motion/constants";
import { lockScroll, unlockScroll } from "@/lib/scroll/scrollLock";

const OVERLAY_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const OVERLAY_DURATION = 1.2;

type TransitionPhase = "idle" | "entering" | "exiting";

type PageTransitionOverlayProps = {
  children: ReactNode;
};

const isModifiedEvent = (event: MouseEvent) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;

const shouldHandleLink = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  return true;
};

export function PageTransitionOverlay({ children }: PageTransitionOverlayProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = prefersReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const lastPathRef = useRef<string | null>(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);
  const enterResolveRef = useRef<(() => void) | null>(null);
  const phaseRef = useRef<TransitionPhase>(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // When pathname changes while we were in the entering phase, wait for the
  // next paint (two RAFs) to ensure the new route is rendered, then start
  // the exit animation. This avoids flashes or unstyled content.
  useEffect(() => {
    if (phaseRef.current === "entering" && lastPathRef.current !== pathname) {
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
        fallbackRef.current = null;
      }

      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("exiting")));
      lastPathRef.current = pathname;
      return;
    }

    if (phaseRef.current === "idle") {
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleClick = async (event: MouseEvent) => {
      if (isModifiedEvent(event)) return;
      const target = event.target as Element | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (!shouldHandleLink(anchor)) return;

      const url = new URL(anchor.href, window.location.origin);
      const current = new URL(window.location.href);
      const nextPath = `${url.pathname}${url.search}`;
      const currentPath = `${current.pathname}${current.search}`;

      if (url.origin !== current.origin || nextPath === currentPath) return;

      event.preventDefault();

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
      }

      // Start navigation flow: animate overlay in, then navigate.
      pendingHrefRef.current = `${url.pathname}${url.search}${url.hash}`;
      setPhase("entering");

      // Promise that resolves when enter animation completes
      const enterPromise = new Promise<void>((resolve) => {
        enterResolveRef.current = resolve;
      });

      // Fallback in case animation complete event doesn't fire
      fallbackRef.current = window.setTimeout(() => {
        enterResolveRef.current?.();
        fallbackRef.current = null;
      }, OVERLAY_DURATION * 1000 + 3000);

      await enterPromise;

      if (pendingHrefRef.current) {
        router.push(pendingHrefRef.current);
        pendingHrefRef.current = null;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [reducedMotion, router]);


  useEffect(() => {
    if (reducedMotion) return;
    const handlePopState = () => setPhase("entering");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (phase === "idle") return;

    if (typeof window !== "undefined") {
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (isCoarsePointer) return;
    }

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [phase, reducedMotion]);

  // Reflect transition active state on the document to allow child components
  // (like `PageTransition`) to disable their own animations while the overlay
  // is performing the single-phase transition.
  useEffect(() => {
    if (reducedMotion) return;
    const el = typeof document !== "undefined" ? document.documentElement : null;
    if (!el) return;
    if (phase !== "idle") {
      el.classList.add("rv-transition-active");
    } else {
      el.classList.remove("rv-transition-active");
    }
    return () => el.classList.remove("rv-transition-active");
  }, [phase, reducedMotion]);

  const overlayVariants = useMemo(
    () => ({
      // Idle keeps the overlay mounted but out of view (off-screen to the right).
      idle: { opacity: 0, x: "100%", pointerEvents: "none" },
      // Slide in from right to cover viewport — this preserves the "slide from right" visual
      // while keeping the overlay as the single-phase transition layer.
      show: { opacity: 1, x: "0%", pointerEvents: "auto" },
      // Slide out to the left when revealing the new route.
      exit: { opacity: 0, x: "-100%", pointerEvents: "none" },
    }),
    []
  );

  const handleOverlayComplete = useCallback(() => {
    // If we just finished entering, resolve the enter promise so navigation can proceed
    if (phaseRef.current === "entering") {
      enterResolveRef.current?.();
      enterResolveRef.current = null;
      return;
    }

    // If we finished the exit animation, return to idle
    if (phaseRef.current === "exiting") {
      setPhase("idle");
    }
  }, []);

  return (
    <>
      {!reducedMotion && (
        <motion.div
          className="fixed inset-0 z-[2147483647] bg-background"
          variants={overlayVariants as any}
          initial="idle"
          animate={phase === "exiting" ? "exit" : phase === "entering" ? "show" : "idle"}
          transition={{ duration: OVERLAY_DURATION, ease: OVERLAY_EASE }}
          onAnimationComplete={handleOverlayComplete}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        />
      )}

      {children}
    </>
  );
}

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = prefersReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "entering" && pathname) {
      window.setTimeout(() => setPhase("exiting"), 0);
    }
  }, [pathname, phase]);

  const start = useCallback(() => {
    if (!reducedMotion) {
      setPhase("entering");
    }
  }, [reducedMotion]);

  const push = useCallback(
    (href: string) => {
      if (reducedMotion) {
        router.push(href);
        return;
      }
      start();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        router.push(href);
      }, OVERLAY_DURATION * 1000);
    },
    [router, start, reducedMotion]
  );

  const replace = useCallback(
    (href: string) => {
      if (reducedMotion) {
        router.replace(href);
        return;
      }
      start();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        router.replace(href);
      }, OVERLAY_DURATION * 1000);
    },
    [router, start, reducedMotion]
  );

  return { push, replace, start, phase };
}
