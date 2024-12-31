import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '425px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '2000px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          DEFAULT: "#200932",
          dark: "#0D0216",
          light: "#431E61"
        },
        yellow: {
          light: "#FBDB7A",
          DEFAULT: "#FFCB2E",
          dark: "#FFBF00",
        },
        accent: "#830C0C",
      },
    },
  },
  plugins: [],
} satisfies Config;
