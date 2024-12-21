import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solar Garlic",
  description: "Solar Garlic is a funky jam band playing around Denver Colorado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-purple`}
      >
        <Nav 
          title="Solar Garlic"
          items={[
            {title: "Home", href: "/"},
            {title: "Events", href: "/events"},
            {title: "Music", href: "/music"},
            {title: "About", href: "/about"},
            {title: "Contact", href: "/contact"},
            ]
          }/> 
        <div className="px-20 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
