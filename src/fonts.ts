import { Noto_Sans, Noto_Sans_Display, Teko } from "next/font/google";

// Font Weight Inventory
// ---------------------
// notoSans (body / general text):
//   300 — font-light     (light-weight accents)
//   400 — normal         (default body text)
//   600 — font-semibold  (medium-emphasis text)
//   700 — font-bold      (high-emphasis text and buttons)
//
// notoSansDisplay (display / event metadata):
//   400 — normal         (display text; no explicit weight utilities applied)
//
// teko (headings / navigation):
//   400 — regular        (all heading elements; no font-weight utilities applied)

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
