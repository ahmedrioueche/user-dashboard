import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/routers/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f8fafc", // Clean light background
          foreground: "#0f172a", // Dark text for readability
          primary: "#06b6d4", // Energetic cyan for sports/games
          secondary: "#f59e0b", // Vibrant amber for highlights
          accent: "#10b981", // Success green for positive actions
          muted: "#64748b", // Muted text
          border: "#e2e8f0", // Light borders
          card: "#ffffff", // Card backgrounds
          text: {
            primary: "#0f172a",
            secondary: "#64748b",
            muted: "#94a3b8",
          },
        },
        dark: {
          background: "#0f172a", // Deep dark background
          foreground: "#f1f5f9", // Light text
          primary: "#22d3ee", // Bright cyan for contrast
          secondary: "#fbbf24", // Warm amber
          accent: "#34d399", // Bright green
          muted: "#64748b", // Muted elements
          border: "#334155", // Dark borders
          card: "#1e293b", // Card backgrounds
          text: {
            primary: "#f1f5f9",
            secondary: "#cbd5e1",
            muted: "#94a3b8",
          },
        },
        // Game/Sport specific colors
        sports: {
          soccer: "#22c55e",
          basketball: "#f97316",
          tennis: "#eab308",
          volleyball: "#3b82f6",
          badminton: "#a855f7",
          swimming: "#06b6d4",
          running: "#ef4444",
          cycling: "#84cc16",
        },
      },
      fontFamily: {
        dancing: ["Dancing Script", "serif"],
        stix: ["STIX Two Text", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "game-gradient":
          "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
        "sport-gradient": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      },
    },
 
  },
  darkMode: "class",
};

export default config;
