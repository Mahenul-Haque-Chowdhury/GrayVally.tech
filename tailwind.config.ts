import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-space)", "sans-serif"],
      },
      colors: {
        background: "var(--bg)",
        surface: "var(--card-bg)",
        surfaceHighlight: "var(--surface-highlight)",
        text: {
          primary: "var(--text)",
          secondary: "var(--text-secondary)",
          muted: "#52525B", // Keep as is or make variable if needed
        },
        accent: {
          DEFAULT: "#3B82F6", // Blue
          glow: "rgba(59, 130, 246, 0.5)",
        },
        border: "var(--border)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, var(--surface-highlight) 1px, transparent 1px), linear-gradient(to bottom, var(--surface-highlight) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
