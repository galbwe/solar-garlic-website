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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple w-screen h-screen`}
      >
        <Nav 
          title="Solar Garlic"
          items={NAV_ITEMS}
        /> 
        
        {children}
      </body>
    </html>
  );
}
