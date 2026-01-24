"use client";

import type { ElementType, ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

// Deprecated: use <Section>, <Reveal>, and <Stagger> from components/motion instead.
type ScrollFloatProps = {
  as?: ElementType;
} & Omit<HTMLMotionProps<"div">, "children"> & { children?: ReactNode };

const ScrollFloat = ({ as = "div", children, ...rest }: ScrollFloatProps) => {
  return (
    <Reveal as={as} {...rest}>
      {children}
    </Reveal>
  );
};

type HeadingLevel = "h1" | "h2" | "h3";

interface FloatHeadingProps extends Omit<HTMLMotionProps<"div">, "children"> {
  as?: HeadingLevel;
  gradientWords?: number[];
  gradientClassName?: string;
  duration?: number;
  once?: boolean;
  children?: ReactNode;
}

export const FloatHeading = ({
  as = "h2",
  children,
  gradientWords,
  gradientClassName,
  ...rest
}: FloatHeadingProps) => (
  <Reveal
    as={as}
    gradientWords={gradientWords}
    gradientClassName={gradientClassName}
    {...rest}
  >
    {children}
  </Reveal>
);

interface ScrollFloatRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  as?: ElementType;
  delay?: number;
  duration?: number;
  ease?: string;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  children?: ReactNode;
}

export const ScrollFloatReveal = ({
  as = "div",
  children,
  ...rest
}: ScrollFloatRevealProps) => (
  <Reveal as={as} {...rest}>
    {children}
  </Reveal>
);

export default ScrollFloat;
