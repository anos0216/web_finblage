// src/app/market/layout.tsx
import React from 'react';
import MarketTabNav from '@/components/marketUI/MarketTabNav';

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* This navigation component is a Client Component (`"use client"`)
        to track the active path and style the tabs accordingly.
      */}
      <MarketTabNav />

      {/* This `children` prop will be the content from the active
        tab's page.tsx file (e.g., page.tsx, ipo/page.tsx, etc.)
      */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}