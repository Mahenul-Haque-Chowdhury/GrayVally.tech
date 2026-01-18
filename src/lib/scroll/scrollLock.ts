import Lenis from "lenis";

let lockCount = 0;

export const lockScroll = () => {
  if (typeof window === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;

  const lenis = (window as Window & { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.stop();
  }
};

export const unlockScroll = () => {
  if (typeof document === "undefined") return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const lenis = (window as Window & { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.start();
  }
};
