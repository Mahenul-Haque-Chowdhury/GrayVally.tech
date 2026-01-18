// ============================================================================
// MOTION CONSTANTS - Central Tuning Parameters
// All animation timing, easing, and configuration values in one place
// ============================================================================

// -----------------------------------------
// TIMING (seconds)
// -----------------------------------------
export const MOTION_DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  hero: 1.2,
} as const;

// -----------------------------------------
// EASING - Framer Motion format [x1, y1, x2, y2]
// -----------------------------------------
export const MOTION_EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  reveal: [0.22, 1, 0.36, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
} as const;

// -----------------------------------------
// EASING - GSAP format (strings)
// -----------------------------------------
export const GSAP_EASE = {
  out: "power3.out",
  in: "power3.in",
  inOut: "power3.inOut",
  reveal: "expo.out",
  bounce: "back.out(1.7)",
  smooth: "sine.inOut",
  elastic: "elastic.out(1, 0.3)",
} as const;

// -----------------------------------------
// LENIS SMOOTH SCROLL
// -----------------------------------------
export const LENIS_CONFIG = {
  lerp: 0.1,
  duration: 1.2,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
} as const;

// -----------------------------------------
// REVEAL ANIMATIONS
// -----------------------------------------
export const REVEAL_CONFIG = {
  translateY: 40,
  translateX: 30,
  rotate: 3,
  scale: 1.05,
  blur: 10,
  stagger: 0.08,
  threshold: 0.2,
} as const;

// -----------------------------------------
// PARALLAX
// -----------------------------------------
export const PARALLAX_CONFIG = {
  speed: 0.5,
  scale: 1.1,
} as const;

// -----------------------------------------
// HOVER INTERACTIONS
// -----------------------------------------
export const HOVER_CONFIG = {
  tiltMax: 8,
  tiltIntensity: 0.02,
  tiltSmooth: 0.15,
  highlightSize: 60,
  magnetStrength: 0.3,
} as const;

// -----------------------------------------
// ROUTE TRANSITIONS
// -----------------------------------------
export const ROUTE_TRANSITION = {
  duration: 0.5,
  enterDelay: 0.1,
  exitDuration: 0.3,
  blur: 8,
} as const;

// -----------------------------------------
// PIN/SCRUB SECTIONS
// -----------------------------------------
export const PIN_CONFIG = {
  scrubSmooth: 1,
  anticipatePin: 1,
} as const;

// -----------------------------------------
// REDUCED MOTION
// -----------------------------------------
export const REDUCED_MOTION_CONFIG = {
  duration: 0.01,
  stagger: 0,
} as const;

// -----------------------------------------
// SCROLL PROGRESS
// -----------------------------------------
export const SCROLL_PROGRESS_CONFIG = {
  height: 3,
  color: "rgb(59, 130, 246)",
  zIndex: 9999,
} as const;

// -----------------------------------------
// COUNTER ANIMATIONS
// -----------------------------------------
export const COUNTER_CONFIG = {
  duration: 2,
  ease: "power2.out",
} as const;

// -----------------------------------------
// HELPERS
// -----------------------------------------

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get duration respecting reduced motion preference
 */
export function getMotionDuration(duration: number): number {
  return prefersReducedMotion() ? REDUCED_MOTION_CONFIG.duration : duration;
}

/**
 * Get transition config for Framer Motion
 */
export function getTransition(
  duration: number = MOTION_DURATION.normal,
  ease: readonly number[] = MOTION_EASE.out
) {
  return {
    duration: getMotionDuration(duration),
    ease: prefersReducedMotion() ? "linear" : ease,
  };
}
