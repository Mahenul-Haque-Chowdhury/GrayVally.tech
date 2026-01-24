let lockCount = 0;
let previousOverflow: string | null = null;
let previousPaddingRight: string | null = null;

export const lockScroll = () => {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;

  const { body, documentElement } = document;
  previousOverflow = body.style.overflow;
  previousPaddingRight = body.style.paddingRight;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
};

export const unlockScroll = () => {
  if (typeof document === "undefined") return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const { body } = document;
  body.style.overflow = previousOverflow ?? "";
  body.style.paddingRight = previousPaddingRight ?? "";
  previousOverflow = null;
  previousPaddingRight = null;
};
