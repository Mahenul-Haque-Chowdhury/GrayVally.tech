"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(
    null
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 16 });

  const rotateX = useTransform(
    springY,
    [0, viewport?.height || 1],
    [8, -8]
  );
  const rotateY = useTransform(
    springX,
    [0, viewport?.width || 1],
    [-8, 8]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        rotateX,
        rotateY
      }}
    >
      <div className="bg-grid absolute inset-[-40px] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,179,255,0.3),_transparent_60%)] mix-blend-screen" />
    </motion.div>
  );
}
