import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {NAV_ITEMS} from '@/constants';
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
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-screen bg-purple`}
      >
        <Nav 
          title="Solar Garlic"
          items={NAV_ITEMS}/> 
        <div className="xl:px-20 py-10 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
