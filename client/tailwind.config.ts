import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#f3e8ff",
        gray: {
          100: "#ffffff", 
          200: "#e0c8ff",
          300: "#ceabff",
          400: "#ba89ff", 
          500: "#ba89ff", 
          700: "#374151",
          800: "#1f2937",
        },
        blue: {
          200: "#ff6e1b",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        "dark-bg": "#121212",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;