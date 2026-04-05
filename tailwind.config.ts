import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(15, 23, 42, 0.08)"
      },
      colors: {
        ink: "#07111f",
        muted: "#5a6779",
        brand: "#2563eb",
        brandDark: "#1d4ed8",
        line: "#dbe4f0",
        surface: "#f7fafc"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(37,99,235,0.22), transparent 45%), linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
