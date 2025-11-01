// src/app/market/layout.tsx
import React from 'react';

// This layout wraps ALL /market routes
// It no longer contains the MarketTabNav
export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* The children will either be:
        1. The (overview) layout (which has tabs)
        2. The ipo/[slug] page (which does not)
      */}
      {children}
    </div>
  );
}
