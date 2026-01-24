import { MOTION_TOKENS } from "./tokens";

export const MOTION_VARIANTS = {
  sectionContainer: {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.base,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  headline: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  bodyText: {
    initial: { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.base,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  cardItem: {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.base,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  navAppear: {
    initial: { opacity: 0, y: -6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.base,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  heroHeadline: {
    initial: { opacity: 0, y: -18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  heroCardLeft: {
    initial: { opacity: 0, x: -24 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
  heroCardRight: {
    initial: { opacity: 0, x: 24 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.easing.easeOut,
      },
    },
  },
} as const;

export type MotionVariantName = keyof typeof MOTION_VARIANTS;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.25,
} as const;

export function resolveMotionVariants(
  name: MotionVariantName,
  reducedMotion: boolean
) {
  const base = MOTION_VARIANTS[name];
  if (!reducedMotion) return base;

  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: base.animate.transition,
    },
  };
}
