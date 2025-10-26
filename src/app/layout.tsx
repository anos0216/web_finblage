// src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oxygen, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  // FIX: Added weights 300, 500, and 600
  weight: ["300", "400", "500", "600"],
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  // SEO FIX: Add a default meta description for your site
  description: "Your trusted source for market insights, news, and in-depth financial analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}