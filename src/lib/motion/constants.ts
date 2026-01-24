import { MOTION_TOKENS } from "./tokens";

export const MOTION_DURATION = {
  instant: MOTION_TOKENS.duration.fast,
  fast: MOTION_TOKENS.duration.fast,
  normal: MOTION_TOKENS.duration.base,
  medium: MOTION_TOKENS.duration.base,
  card: MOTION_TOKENS.duration.base,
  slow: MOTION_TOKENS.duration.slow,
  hero: MOTION_TOKENS.duration.slow,
  display: MOTION_TOKENS.duration.slow,
} as const;

export const REVEAL_CONFIG = {
  translateY: MOTION_TOKENS.distance.liftMd,
  translateX: MOTION_TOKENS.distance.liftMd,
  rotate: 0,
  scale: 1,
  blur: MOTION_TOKENS.blur.blurIn,
  stagger: MOTION_TOKENS.stagger.staggerChildren,
  threshold: 0.25,
} as const;
