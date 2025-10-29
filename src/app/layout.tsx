// src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oxygen, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { DataProvider } from "@/context/DataContext";

const inter = Inter({
  subsets: ["latin"],
  // FIX: Added weights 300, 500, and 600
  weight: ["300", "400", "500", "600"],
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: "normal",
  variable: "--font-oxygen",
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
  title: "Finblage",
  description:
    "Your trusted source for market insights, news, and in-depth financial analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DataProvider>
        <body
          className={` ${inter.variable} ${oxygen.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </DataProvider>
    </html>
  );
}
