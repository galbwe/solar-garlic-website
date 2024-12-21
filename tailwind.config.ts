import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          DEFAULT: "#200932",
          dark: "#0D0216",
          light: "#431E61"
        },
        yellow: "#FFCB2E",
      },
    },
  },
  plugins: [],
} satisfies Config;
