export const MOTION_TOKENS = {
  duration: {
    fast: 0.24,
    base: 0.42,
    slow: 0.7,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1] as const,
  },
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.06,
  },
  distance: {
    liftSm: 8,
    liftMd: 16,
  },
  blur: {
    blurIn: 10,
  },
} as const;

export type MotionTokens = typeof MOTION_TOKENS;
