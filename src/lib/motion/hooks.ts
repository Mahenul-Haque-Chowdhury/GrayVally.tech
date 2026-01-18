// ============================================================================
// MOTION HOOKS - Premium Micro-interactions
// Hover physics, parallax, tilt, and ambient motion
// ============================================================================

"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import { gsap } from "gsap";
import {
  HOVER_CONFIG,
  PARALLAX_CONFIG,
  prefersReducedMotion,
  getMotionDuration,
  MOTION_DURATION,
  GSAP_EASE,
} from "./constants";

// -----------------------------------------
// MAGNETIC HOVER (for buttons/links)
// -----------------------------------------

interface MagneticConfig {
  strength?: number;
  ease?: number;
  trigger?: "self" | "parent";
}

/**
 * Hook for magnetic/sticky hover effect
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  config: MagneticConfig = {}
) {
  const elementRef = useRef<T>(null);
  const { strength = 0.3, ease = 0.15 } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    let bounds: DOMRect;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const updatePosition = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;

      gsap.set(element, {
        x,
        y,
      });

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      targetX = (e.clientX - centerX) * strength;
      targetY = (e.clientY - centerY) * strength;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [strength, ease]);

  return elementRef;
}

// -----------------------------------------
// TILT EFFECT (for cards)
// -----------------------------------------

interface TiltConfig {
  intensity?: number;
  max?: number;
  smooth?: number;
  scale?: number;
  perspective?: number;
}

export interface TiltState {
  rotateX: number;
  rotateY: number;
  mouseX: number;
  mouseY: number;
}

/**
 * Hook for 3D tilt effect with pointer follow highlight
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(
  config: TiltConfig = {}
) {
  const elementRef = useRef<T>(null);
  const [state, setState] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    mouseX: 0.5,
    mouseY: 0.5,
  });

  const {
    intensity = HOVER_CONFIG.tiltIntensity,
    max = HOVER_CONFIG.tiltMax,
    smooth = HOVER_CONFIG.tiltSmooth,
    scale = 1.02,
    perspective = 1000,
  } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    let bounds: DOMRect;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseXNorm = 0.5;
    let mouseYNorm = 0.5;
    let rafId: number;

    element.style.transformStyle = "preserve-3d";
    element.style.perspective = `${perspective}px`;

    const updateTilt = () => {
      currentX += (targetX - currentX) * smooth;
      currentY += (targetY - currentY) * smooth;

      gsap.set(element, {
        rotateX: currentX,
        rotateY: currentY,
        transformPerspective: perspective,
      });

      setState({
        rotateX: currentX,
        rotateY: currentY,
        mouseX: mouseXNorm,
        mouseY: mouseYNorm,
      });

      rafId = requestAnimationFrame(updateTilt);
    };

    const handleMouseMove = (e: MouseEvent) => {
      bounds = element.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      mouseXNorm = x / bounds.width;
      mouseYNorm = y / bounds.height;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const deltaX = (x - centerX) * intensity;
      const deltaY = (y - centerY) * intensity;

      targetX = Math.max(-max, Math.min(max, -deltaY));
      targetY = Math.max(-max, Math.min(max, deltaX));
    };

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: GSAP_EASE.out,
      });
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      mouseXNorm = 0.5;
      mouseYNorm = 0.5;

      gsap.to(element, {
        scale: 1,
        duration: 0.5,
        ease: GSAP_EASE.out,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updateTilt);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
      gsap.set(element, { rotateX: 0, rotateY: 0, scale: 1 });
    };
  }, [intensity, max, smooth, scale, perspective]);

  return { ref: elementRef, state };
}

// -----------------------------------------
// PARALLAX EFFECT
// -----------------------------------------

interface ParallaxConfig {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

/**
 * Hook for scroll-linked parallax
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  config: ParallaxConfig = {}
) {
  const elementRef = useRef<T>(null);
  const { speed = PARALLAX_CONFIG.speed, direction = "vertical" } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollProgress = 1 - rect.top / window.innerHeight;
      const offset = scrollProgress * speed * 100;

      if (direction === "vertical") {
        gsap.set(element, { y: offset });
      } else {
        gsap.set(element, { x: offset });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction]);

  return elementRef;
}

// -----------------------------------------
// AMBIENT MOTION (for hero elements)
// -----------------------------------------

interface AmbientConfig {
  drift?: number;
  scale?: number;
  duration?: number;
}

/**
 * Hook for subtle ambient floating motion
 */
export function useAmbientMotion<T extends HTMLElement = HTMLDivElement>(
  config: AmbientConfig = {}
) {
  const elementRef = useRef<T>(null);
  const { drift = 4, scale = 0.02, duration = 6 } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(element, {
      y: drift,
      scale: 1 + scale,
      duration,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [drift, scale, duration]);

  return elementRef;
}

// -----------------------------------------
// BUTTON SHEEN EFFECT
// -----------------------------------------

interface SheenConfig {
  duration?: number;
  angle?: number;
}

/**
 * Hook for animated button sheen on hover
 */
export function useButtonSheen<T extends HTMLElement = HTMLButtonElement>(
  config: SheenConfig = {}
) {
  const elementRef = useRef<T>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const { duration = MOTION_DURATION.normal, angle = 110 } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    // Create sheen element
    const sheen = document.createElement("div");
    sheen.className = "button-sheen";
    sheen.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    `;

    const sheenGradient = document.createElement("div");
    sheenGradient.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        ${angle}deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      transform: skewX(-15deg);
    `;

    sheen.appendChild(sheenGradient);
    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(sheen);
    sheenRef.current = sheenGradient;

    const handleMouseEnter = () => {
      gsap.fromTo(
        sheenGradient,
        { left: "-100%" },
        {
          left: "200%",
          duration,
          ease: GSAP_EASE.smooth,
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      sheen.remove();
    };
  }, [duration, angle]);

  return elementRef;
}

// -----------------------------------------
// ANIMATED UNDERLINE (for links)
// -----------------------------------------

interface UnderlineConfig {
  height?: number;
  color?: string;
  duration?: number;
  origin?: "center" | "left" | "right";
}

/**
 * Hook for animated underline that draws from center
 */
export function useAnimatedUnderline<T extends HTMLElement = HTMLAnchorElement>(
  config: UnderlineConfig = {}
) {
  const elementRef = useRef<T>(null);
  const {
    height = 1,
    color = "currentColor",
    duration = 0.3,
    origin = "center",
  } = config;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    // Create underline element
    const underline = document.createElement("span");
    underline.className = "animated-underline";
    underline.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: ${height}px;
      background: ${color};
      transform: scaleX(0);
      transform-origin: ${origin};
    `;

    element.style.position = "relative";
    element.appendChild(underline);

    const handleMouseEnter = () => {
      gsap.to(underline, {
        scaleX: 1,
        duration,
        ease: GSAP_EASE.out,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(underline, {
        scaleX: 0,
        duration,
        ease: GSAP_EASE.out,
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      underline.remove();
    };
  }, [height, color, duration, origin]);

  return elementRef;
}

// -----------------------------------------
// HIGHLIGHT OVERLAY (for cards)
// -----------------------------------------

/**
 * Component props for highlight overlay
 */
export interface HighlightOverlayProps {
  mouseX: number;
  mouseY: number;
  size?: number;
  opacity?: number;
}

/**
 * Render a radial gradient highlight that follows the cursor
 */
export function getHighlightStyle({
  mouseX,
  mouseY,
  size = HOVER_CONFIG.highlightSize,
  opacity = 0.15,
}: HighlightOverlayProps): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(
      circle at ${mouseX * 100}% ${mouseY * 100}%,
      rgba(255, 255, 255, ${opacity}) 0%,
      transparent ${size}%
    )`,
    opacity: 1,
    transition: "opacity 0.3s ease",
  };
}
