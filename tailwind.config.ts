import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        terminal: {
          bg: "var(--terminal-bg, #0a0a0a)",
          bg2: "var(--terminal-bg2, #111111)",
          bg3: "var(--terminal-bg3, #141414)",
          border: "var(--terminal-border, #1e1e1e)",
          green: "var(--terminal-green, #00ff88)",
          cyan: "var(--terminal-cyan, #00d4ff)",
          yellow: "var(--terminal-yellow, #f5c842)",
          red: "var(--terminal-red, #ff5555)",
          muted: "var(--terminal-muted, #555555)",
          dim: "var(--terminal-dim, #333333)",
          text: "var(--terminal-text, #cccccc)",
          white: "var(--terminal-white, #e8e8e8)",
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        fadein: "fadein 0.15s ease forwards",
        glitch: "glitch 5s infinite",
        bootfade: "bootfade 0.5s forwards",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        fadein: {
          from: { opacity: "0", transform: "translateY(3px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%,89%,100%": { textShadow: "none" },
          "90%": { textShadow: "2px 0 #ff5555, -2px 0 #00d4ff" },
          "95%": { textShadow: "-1px 0 #f5c842, 1px 0 #00ff88" },
        },
        bootfade: { to: { opacity: "0", pointerEvents: "none" } },
      },
    },
  },
  plugins: [],
};

export default config;
