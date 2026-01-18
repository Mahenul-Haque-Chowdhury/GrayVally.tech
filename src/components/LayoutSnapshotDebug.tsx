"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type FontSnapshot = {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
};

type LayoutSnapshot = {
  headerHeight: number | null;
  heroHeight: number | null;
  heroBottom: number | null;
  scrollHeight: number;
  fonts: {
    body: FontSnapshot;
    h1: FontSnapshot | null;
    h2: FontSnapshot | null;
  };
};

const getFontSnapshot = (element: Element | null): FontSnapshot | null => {
  if (!element) return null;
  const style = window.getComputedStyle(element);
  return {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
  };
};

const measureSnapshot = (): LayoutSnapshot => {
  const header =
    document.querySelector(".pill-nav-container") ??
    document.querySelector("header") ??
    document.querySelector("nav");
  const hero =
    document.querySelector("[data-hero]") ??
    document.querySelector("main > section") ??
    document.querySelector("section");

  const headerRect = header?.getBoundingClientRect();
  const heroRect = hero?.getBoundingClientRect();

  return {
    headerHeight: headerRect ? Math.round(headerRect.height) : null,
    heroHeight: heroRect ? Math.round(heroRect.height) : null,
    heroBottom: heroRect ? Math.round(heroRect.bottom) : null,
    scrollHeight: Math.round(document.documentElement.scrollHeight),
    fonts: {
      body: getFontSnapshot(document.body) ?? { fontFamily: "", fontSize: "", lineHeight: "" },
      h1: getFontSnapshot(document.querySelector("h1")),
      h2: getFontSnapshot(document.querySelector("h2")),
    },
  };
};

const diffSnapshot = (base: LayoutSnapshot, next: LayoutSnapshot) => {
  const diffs: Record<string, { before: string | number | null; after: string | number | null; delta?: number }> = {};

  const addDiff = (key: string, before: number | null, after: number | null) => {
    if (before !== after) {
      diffs[key] = { before, after, delta: before !== null && after !== null ? after - before : undefined };
    }
  };

  addDiff("headerHeight", base.headerHeight, next.headerHeight);
  addDiff("heroHeight", base.heroHeight, next.heroHeight);
  addDiff("heroBottom", base.heroBottom, next.heroBottom);
  addDiff("scrollHeight", base.scrollHeight, next.scrollHeight);

  const fontKeys: Array<keyof LayoutSnapshot["fonts"]> = ["body", "h1", "h2"];
  for (const key of fontKeys) {
    const baseFont = base.fonts[key];
    const nextFont = next.fonts[key];
    if (!baseFont || !nextFont) {
      if (baseFont !== nextFont) {
        diffs[`fonts.${key}`] = { before: baseFont ? "present" : "null", after: nextFont ? "present" : "null" };
      }
      continue;
    }

    if (baseFont.fontFamily !== nextFont.fontFamily) {
      diffs[`fonts.${key}.fontFamily`] = { before: baseFont.fontFamily, after: nextFont.fontFamily };
    }
    if (baseFont.fontSize !== nextFont.fontSize) {
      diffs[`fonts.${key}.fontSize`] = { before: baseFont.fontSize, after: nextFont.fontSize };
    }
    if (baseFont.lineHeight !== nextFont.lineHeight) {
      diffs[`fonts.${key}.lineHeight`] = { before: baseFont.lineHeight, after: nextFont.lineHeight };
    }
  }

  return diffs;
};

export function LayoutSnapshotDebug() {
  const pathname = usePathname();
  const baselineRef = useRef<LayoutSnapshot | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    baselineRef.current = null;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    const capture = (label: string) => {
      const snapshot = measureSnapshot();
      if (!baselineRef.current) {
        baselineRef.current = snapshot;
        console.info(`[LayoutSnapshot] baseline (${label})`, snapshot);
        return;
      }

      const diffs = diffSnapshot(baselineRef.current, snapshot);
      const diffKeys = Object.keys(diffs);
      if (diffKeys.length > 0) {
        console.warn(`[LayoutSnapshot] diffs (${label})`, diffs);
      } else {
        console.info(`[LayoutSnapshot] stable (${label})`);
      }
    };

    const raf = window.requestAnimationFrame(() => capture("raf"));
    const onLoad = () => capture("load");
    window.addEventListener("load", onLoad, { once: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => capture("fonts-ready")).catch(() => {});
    }

    timersRef.current.push(window.setTimeout(() => capture("settled-1200ms"), 1200));
    timersRef.current.push(window.setTimeout(() => capture("settled-2400ms"), 2400));

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, [pathname]);

  return null;
}
