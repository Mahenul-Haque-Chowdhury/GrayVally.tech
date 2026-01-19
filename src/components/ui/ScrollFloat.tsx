"use client";

import React, { ElementType, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { MOTION_DURATION } from "@/lib/motion/constants";

type ScrollFloatElement = ElementType;

interface ScrollFloatProps extends React.HTMLAttributes<HTMLElement> {
  as?: ScrollFloatElement;
  scrollContainerRef?: RefObject<HTMLElement>;
  once?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  rootMargin?: string;
  threshold?: number;
}

const DEFAULT_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  as = "div",
  children,
  className = "",
  scrollContainerRef,
  once = true,
  delay = 0,
  duration = MOTION_DURATION.normal,
  ease = DEFAULT_EASE,
  x = 0,
  y = 12,
  opacity = 0,
  scale = 1,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0.2,
  style,
  ...rest
}) => {
  const Component = as;
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const setVisibleIfInView = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const inView =
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight &&
        rect.left <= viewportWidth;

      if (inView) {
        setIsVisible(true);
      }
    };

    setVisibleIfInView();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: scrollContainerRef?.current ?? null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, scrollContainerRef, threshold]);

  const mergedStyle = {
    "--scroll-float-x": `${x}px`,
    "--scroll-float-y": `${y}px`,
    "--scroll-float-scale": `${scale}`,
    "--scroll-float-opacity": `${opacity}`,
    "--scroll-float-duration": `${Math.max(0, duration)}s`,
    "--scroll-float-delay": `${Math.max(0, delay)}s`,
    "--scroll-float-ease": ease,
    transitionProperty: "transform, opacity",
    transitionDuration: "var(--scroll-float-duration)",
    transitionDelay: "var(--scroll-float-delay)",
    transitionTimingFunction: "var(--scroll-float-ease)",
    willChange: isVisible ? "auto" : "transform, opacity",
    ...style,
  } as React.CSSProperties;

  const classNames = [
    "transform-gpu",
    "transition-[transform,opacity]",
    "motion-reduce:transition-none",
    "motion-reduce:duration-0",
    "motion-reduce:delay-0",
    "motion-reduce:translate-x-0",
    "motion-reduce:translate-y-0",
    "motion-reduce:scale-100",
    "motion-reduce:opacity-100",
    isVisible
      ? "opacity-100 translate-x-0 translate-y-0 scale-100"
      : "opacity-[var(--scroll-float-opacity)] translate-x-[var(--scroll-float-x)] translate-y-[var(--scroll-float-y)] scale-[var(--scroll-float-scale)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return React.createElement(
    Component as ElementType,
    {
      ...(rest as Record<string, unknown>),
      ref: containerRef as unknown as React.Ref<HTMLElement>,
      className: classNames,
      style: mergedStyle,
      "data-scrollfloat": "true",
    },
    children
  );
};

type HeadingLevel = "h1" | "h2" | "h3";

interface FloatHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  scrollContainerRef?: RefObject<HTMLElement>;
  once?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  y?: number;
  rootMargin?: string;
  threshold?: number;
  gradientWords?: number[];
  gradientClassName?: string;
}

const DEFAULT_GRADIENT_CLASS =
  "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent";

export const FloatHeading: React.FC<FloatHeadingProps> = ({
  as = "h2",
  children,
  gradientWords = [],
  gradientClassName = DEFAULT_GRADIENT_CLASS,
  ...rest
}) => {
  const content = useMemo(() => {
    if (typeof children !== "string" || gradientWords.length === 0) {
      return children;
    }

    const words = children.split(" ");
    const gradientSet = new Set(gradientWords);

    return words.map((word, index) => {
      const wordClassName = gradientSet.has(index) ? gradientClassName : undefined;
      return (
        <React.Fragment key={`word-${index}`}>
          <span className={wordClassName}>{word}</span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>
      );
    });
  }, [children, gradientWords, gradientClassName]);

  return (
    <ScrollFloat as={as} {...rest}>
      {content}
    </ScrollFloat>
  );
};

interface ScrollFloatRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  scrollContainerRef?: RefObject<HTMLElement>;
  scrollStart?: string;
  scrollEnd?: string;
  duration?: number;
  ease?: string;
  delay?: number;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const ScrollFloatReveal: React.FC<ScrollFloatRevealProps> = ({
  as = "div",
  x = 0,
  y = 40,
  opacity = 0,
  scale = 1,
  duration = MOTION_DURATION.normal,
  ease = DEFAULT_EASE,
  delay = 0,
  once = true,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0.2,
  scrollContainerRef,
  ...rest
}) => (
  <ScrollFloat
    as={as}
    x={x}
    y={y}
    opacity={opacity}
    scale={scale}
    duration={duration}
    ease={ease}
    delay={delay}
    once={once}
    rootMargin={rootMargin}
    threshold={threshold}
    scrollContainerRef={scrollContainerRef}
    {...rest}
  />
);

export default ScrollFloat;
