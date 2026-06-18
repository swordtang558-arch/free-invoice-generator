import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary "ink" — a deep, confident indigo-navy. Deliberately deeper
        // and less neon than the default SaaS #4f46e5 so it reads as a serious
        // financial tool rather than a templated startup.
        brand: {
          50: "#eef1fb",
          100: "#dde3f7",
          200: "#c0cbee",
          300: "#97a6e0",
          400: "#6b7ed0",
          500: "#4a5cbf",
          600: "#3a47a3",
          700: "#2f3a85",
          800: "#28316a",
          900: "#212a54",
          950: "#151a36",
        },
        // Signature accent — a restrained warm gold. Money/value signal, used
        // only on the figures and rules that matter (Total, hairlines, marks).
        accent: {
          50: "#faf4e4",
          100: "#f3e6c4",
          200: "#e7cd8c",
          300: "#dab455",
          400: "#cc9d34",
          500: "#c79134",
          600: "#a8771f",
          700: "#825c18",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(21, 26, 54, 0.07), 0 1px 2px rgba(21, 26, 54, 0.04)",
        lift: "0 10px 30px -12px rgba(21, 26, 54, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
