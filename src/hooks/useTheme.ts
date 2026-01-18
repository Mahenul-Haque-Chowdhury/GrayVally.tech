import { useSyncExternalStore } from "react";

export function useTheme() {
  const subscribe = (onStoreChange: () => void) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          onStoreChange();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  };

  const getSnapshot = (): "light" | "dark" =>
    document.documentElement.classList.contains("theme-light") ? "light" : "dark";

  // Server snapshot should match what the blocking script will set
  // Default to dark since that's the CSS default
  const getServerSnapshot = (): "light" | "dark" => "dark";

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
