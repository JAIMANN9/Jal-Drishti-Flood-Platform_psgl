import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // opt-in only; nothing auto-switches
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        "border-accent": "var(--border-accent)",
      },
    },
  },
  plugins: [],
};
export default config;
