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
        // Warm, whimsical palette
        cream: "#FBF6EF",
        ink: "#2B2A26",
        coral: "#FF7A59",
        peach: "#FFD8C2",
        sky: "#8ECae6",
        leaf: "#8AB17D",
        butter: "#FFE9A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
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
      },
      animation: {
        wiggle: "wiggle 1.2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
