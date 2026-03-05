import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0A1A2A",
          slate: "#1A2F44",
          amber: "#D7A33D",
          mint: "#77C8B3",
          fog: "#E8F2F6"
        }
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 70px -30px rgba(119, 200, 179, 0.5)",
        glass: "0 20px 40px -25px rgba(0, 0, 0, 0.5)"
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(145deg, rgba(10,26,42,0.85) 5%, rgba(10,26,42,0.5) 45%, rgba(10,26,42,0.88) 100%)",
        grain:
          "radial-gradient(circle at 20% 20%, rgba(215, 163, 61, 0.09) 0px, transparent 40%), radial-gradient(circle at 80% 0%, rgba(119, 200, 179, 0.11) 0px, transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
