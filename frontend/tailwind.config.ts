import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        rg: {
          purple500: "#3d1c66",
          purple600: "#2D4B9A",
          purple700: "#1A2A56",
          accent: "#f97316",
          grayBg: "#f7f8fb",
        },
      },
      boxShadow: {
        "sm-soft":
          "0 2px 6px -1px rgba(0,0,0,0.05),0 4px 12px -2px rgba(0,0,0,0.05)",
        card: "0 8px 24px -6px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
export default config;
