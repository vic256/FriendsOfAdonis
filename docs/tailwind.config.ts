import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [
    createPreset({
      addGlobalColors: true,
      preset: "dusk",
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "repeat-gradient-to-r":
          "repeating-linear-gradient(to right, var(--tw-gradient-stops))",
        "repeat-gradient-to-br":
          "repeating-linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
      keyframes: {
        stroke: {
          from: {
            "stroke-dasharray": "1000",
          },
          to: {
            "stroke-dasharray": "1000",
            "stroke-dashoffset": "2000",
          },
        },
      },
      animation: {
        stroke: "stroke 5s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
