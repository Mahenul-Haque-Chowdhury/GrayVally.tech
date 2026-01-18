// ============================================================================
// PREMIUM CARD - Enhanced Card with Tilt and Highlight Effects
// ============================================================================

"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import {
  HOVER_CONFIG,
  prefersReducedMotion,
  GSAP_EASE,
} from "@/lib/motion/constants";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  tiltMax?: number;
  scale?: number;
  highlightOpacity?: number;
  highlightSize?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export function PremiumCard({
  children,
  className,
  tiltIntensity = HOVER_CONFIG.tiltIntensity,
  tiltMax = HOVER_CONFIG.tiltMax,
  scale = 1.02,
  highlightOpacity = 0.12,
  highlightSize = HOVER_CONFIG.highlightSize,
  onClick,
}: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const highlight = highlightRef.current;
    if (!card || prefersReducedMotion()) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let rafId: number;
    let bounds: DOMRect;

    const smooth = HOVER_CONFIG.tiltSmooth;

    const updateTilt = () => {
      currentX += (targetX - currentX) * smooth;
      currentY += (targetY - currentY) * smooth;

      gsap.set(card, {
        rotateX: currentX,
        rotateY: currentY,
        transformPerspective: 1000,
      });

      if (highlight && isHovered) {
        highlight.style.background = `radial-gradient(
          circle at ${mouseX * 100}% ${mouseY * 100}%,
          rgba(255, 255, 255, ${highlightOpacity}) 0%,
          transparent ${highlightSize}%
        )`;
      }

      rafId = requestAnimationFrame(updateTilt);
    };

    const handleMouseMove = (e: MouseEvent) => {
      bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      mouseX = x / bounds.width;
      mouseY = y / bounds.height;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const deltaX = (x - centerX) * tiltIntensity;
      const deltaY = (y - centerY) * tiltIntensity;

      targetX = Math.max(-tiltMax, Math.min(tiltMax, -deltaY));
      targetY = Math.max(-tiltMax, Math.min(tiltMax, deltaX));
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        scale,
        duration: 0.3,
        ease: GSAP_EASE.out,
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetX = 0;
      targetY = 0;

      gsap.to(card, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: GSAP_EASE.out,
      });

      if (highlight) {
        highlight.style.background = "transparent";
      }
    };

    card.style.transformStyle = "preserve-3d";
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updateTilt);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isHovered, tiltIntensity, tiltMax, scale, highlightOpacity, highlightSize]);

  return (
    <div
      ref={cardRef}
      className={cn("relative", className)}
      onClick={onClick}
      style={{ willChange: isHovered ? "transform" : "auto" }}
    >
      <div
        ref={highlightRef}
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}
