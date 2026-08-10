import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#030712",
          900: "#050505",
          800: "#0a0d12",
          700: "#10141b",
          600: "#171c25",
        },
        signal: {
          300: "#7dffb8",
          400: "#39ff8f",
          500: "#00ff66",
          600: "#00d957",
          900: "#062712",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(0,255,102,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,102,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,102,0.16), transparent 70%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        "glow-sm": "0 0 12px rgba(0,255,102,0.35)",
        glow: "0 0 24px rgba(0,255,102,0.35), 0 0 60px rgba(0,255,102,0.12)",
        "glow-lg": "0 0 48px rgba(0,255,102,0.45), 0 0 120px rgba(0,255,102,0.18)",
      },
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 2.4s linear infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 26s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
