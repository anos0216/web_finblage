// src/app/market/(overview)/layout.tsx
import React from 'react';
import MarketTabNav from '@/components/marketUI/MarketTabNav';

// This layout wraps all pages inside the (overview) group
export default function MarketOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* The MarketTabNav now lives here */}
      <MarketTabNav />

      {/* This main wrapper is also moved from the parent layout */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}
