export const MOTION_TOKENS = {
  duration: {
    fast: 0.18,
    base: 0.32,
    slow: 0.55,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1] as const,
  },
  stagger: {
    staggerChildren: 0.06,
    delayChildren: 0.04,
  },
  distance: {
    liftSm: 6,
    liftMd: 12,
  },
  blur: {
    blurIn: 8,
  },
} as const;

export type MotionTokens = typeof MOTION_TOKENS;
