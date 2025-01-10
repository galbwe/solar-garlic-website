import type { Metadata } from "next";
import "./globals.css";

import { NAV_ITEMS } from "@/constants";
import Nav from "@/components/Nav";
import { notoSans } from "@/fonts";

export const metadata: Metadata = {
  title: "Solar Garlic",
  description:
    "Solar Garlic is a funky jam band playing around Denver Colorado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased bg-purple w-screen h-screen text-white`}
      >
        <Nav items={NAV_ITEMS} />

        {children}
      </body>
    </html>
  );
}
