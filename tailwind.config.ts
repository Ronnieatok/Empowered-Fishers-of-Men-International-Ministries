import type { Config } from "tailwindcss";

// EFMI Design System — "Gold on Charcoal"
// Rationale: deep navy/charcoal reads as trustworthy + serious (donor confidence),
// gold/amber signals value + reverence without tipping into gaudy prosperity-gospel territory.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        charcoal: {
          950: "#0B0D12", // deepest bg, hero overlay base
          900: "#12151C", // section bg
          800: "#1B1F29", // card bg
          700: "#262B38", // borders / dividers
        },
        navy: {
          900: "#0E1A2B",
          800: "#152840",
        },
        // Accent
        gold: {
          400: "#F2C879", // hover/light accent
          500: "#D9A94B", // primary accent (buttons, links, icons)
          600: "#B8872F", // pressed state
        },
        offwhite: "#F7F4EC", // body text on dark, and light-section bg
      },
      fontFamily: {
        // Editorial display serif for headlines; clean sans for body/UI
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-fade": "linear-gradient(180deg, rgba(11,13,18,0) 0%, rgba(11,13,18,0.85) 65%, #0B0D12 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(217,169,75,0.25), 0 8px 24px -8px rgba(217,169,75,0.35)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
