import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral white base with coral as the one confident accent
        cream: "#FFFFFF",
        ink: "#2B2A26",
        coral: "#FF7A59",
        peach: "#FFD8C2",
        sky: "#8ECae6",
        leaf: "#8AB17D",
        butter: "#FFE9A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        title: ["var(--font-title)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(43, 42, 38, 0.10)",
        chip: "0 6px 20px rgba(43, 42, 38, 0.12)",
      },
      borderRadius: {
        blob: "2rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-sm": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-1.5px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        // Subtler amplitude/pace for small icons inside cards — the
        // full `float` bounce (used for the hero's decorative sparkles)
        // reads as too much motion at that size.
        "float-sm": "float-sm 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
