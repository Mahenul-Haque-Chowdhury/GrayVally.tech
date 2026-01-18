// ============================================================================
// PREMIUM CARD - Enhanced Card with Tilt and Highlight Effects using Framer Motion
// ============================================================================

"use client";

import { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  scale?: number;
  highlightOpacity?: number;
  highlightSize?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export function PremiumCard({
  children,
  className,
  tiltIntensity = 5,
  scale = 1.02,
  highlightOpacity = 0.1,
  highlightSize = 35,
  onClick,
}: PremiumCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(x, [-100, 100], [-tiltIntensity, tiltIntensity]);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const highlight = useTransform(
    [mouseX, mouseY],
    ([newX, newY]) =>
      `radial-gradient(circle at ${newX}px ${newY}px, rgba(255, 255, 255, ${highlightOpacity}) 0%, transparent ${highlightSize}%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left - bounds.width / 2);
    y.set(e.clientY - bounds.top - bounds.height / 2);
    mouseX.set(e.clientX - bounds.left);
    mouseY.set(e.clientY - bounds.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale }}
      className={cn("relative", className)}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{ background: highlight }}
      />
      {children}
    </motion.div>
  );
}
