import { Noto_Sans, Noto_Sans_Display, Teko } from "next/font/google";

// Font Weight Inventory
// ---------------------
// notoSans (body / general text):
//   300 — font-light  (venue links, extra card text in EventCard)
//   400 — normal      (default body text)
//   600 — font-semibold (band name in EventCard)
//   700 — font-bold   (member names in About, submit/ticket buttons)
//
// notoSansDisplay (event dates and venue info in EventCard, Accordion):
//   400 — normal      (display text; no explicit weight utilities applied)
//
// teko (headings, Nav):
//   400 — regular     (all heading elements; no font-weight utilities applied to Teko nodes)

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
