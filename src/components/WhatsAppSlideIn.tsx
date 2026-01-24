"use client";

import { useEffect, useState } from "react";

type Props = {
  whatsappNumber: string;
  message?: string;
  appearAfterMs?: number;
};

export default function WhatsAppSlideIn({
  whatsappNumber,
  message = "Hi! I want to talk about a project.",
  appearAfterMs = 1400,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), appearAfterMs);

    const onIntroDone = () => setVisible(true);
    window.addEventListener("gv:intro-done", onIntroDone);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("gv:intro-done", onIntroDone);
    };
  }, [appearAfterMs]);

  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Talk on WhatsApp"
      className={[
        "fixed right-0 bottom-20 z-50",
        "inline-flex items-center gap-2",
        "rounded-l-xl px-3 py-2.5",
        "bg-slate-900 text-white shadow-lg border border-black/10",
        "dark:border-white/30 dark:bg-white/85 dark:text-slate-900",
        "transition-transform duration-300 ease-out",
        "sm:right-4 sm:bottom-20 sm:rounded-xl sm:px-4 sm:py-3",
        visible ? "translate-x-0" : "translate-x-[140%]",
      ].join(" ")}
    >
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="#25D366"
          d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.458.66 4.858 1.916 6.966L3.333 29.333l6.53-1.716A13.28 13.28 0 0 0 16 29.333c7.364 0 13.333-5.969 13.333-13.333S23.364 2.667 16 2.667Z"
        />
        <path
          fill="#fff"
          d="M23.02 18.765c-.1-.167-.365-.267-.765-.467-.4-.2-2.365-1.167-2.73-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.266 1.567-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.99-1.19-1.062-1.99-2.373-2.223-2.773-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.675-.9-.687l-.765-.013c-.267 0-.7.1-1.066.5-.367.4-1.4 1.366-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.823 4.31 6.835 6.044.954.41 1.7.655 2.28.838.958.305 1.83.262 2.52.159.77-.115 2.365-.967 2.698-1.9.333-.933.333-1.733.233-1.9Z"
        />
      </svg>

      <span className="text-xs font-medium sm:text-sm">
        <span className="sm:hidden">Talk @Whatsapp</span>
        <span className="hidden sm:inline">Talk @Whatsapp now</span>
      </span>
    </a>
  );
}
