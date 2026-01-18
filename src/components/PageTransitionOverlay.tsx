"use client";

import { motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { prefersReducedMotion } from "@/lib/motion/constants";

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

  useEffect(() => {
    if (phase === "entering" && lastPathRef.current !== pathname) {
      window.setTimeout(() => setPhase("exiting"), 0);
      lastPathRef.current = pathname;
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
        fallbackRef.current = null;
      }
      return;
    }

    if (phase === "idle") {
      lastPathRef.current = pathname;
    }
  }, [pathname, phase]);

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

    const handleClick = (event: MouseEvent) => {
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

      pendingHrefRef.current = `${url.pathname}${url.search}${url.hash}`;
      setPhase("entering");

      timeoutRef.current = window.setTimeout(() => {
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
          pendingHrefRef.current = null;
        }
      }, OVERLAY_DURATION * 1000);

      fallbackRef.current = window.setTimeout(() => {
        setPhase("exiting");
      }, OVERLAY_DURATION * 1000 + 4000);
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

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [phase, reducedMotion]);

  const overlayVariants = useMemo(
    () => ({
      enter: { opacity: 0, y: "100%" },
      show: { opacity: 1, y: "0%" },
      exit: { opacity: 0, y: "-100%" },
    }),
    []
  );

  const handleOverlayComplete = useCallback(() => {
    if (phase === "exiting") {
      setPhase("idle");
    }
  }, [phase]);

  return (
    <>
      {phase !== "idle" && !reducedMotion && (
        <motion.div
          className="fixed inset-0 z-[2147483647] bg-background"
          variants={overlayVariants}
          initial="enter"
          animate={phase === "exiting" ? "exit" : "show"}
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
