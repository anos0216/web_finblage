// src/components/market/MarketTabNav.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Overview', href: '/market' },
  { name: 'IPO', href: '/market/ipo' },
  { name: 'FII & DII', href: '/market/fii-dii' },
  { name: 'Advance & Decline', href: '/market/advance-decline' },
  { name: 'Events Calendar', href: '/market/events-calendar' },
];

const MarketTabNav = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto -mb-px">
          {tabs.map((tab) => {
            // Handle active state for both base /market and sub-pages
            const isActive = (pathname === tab.href) || 
                             (tab.href !== '/market' && pathname.startsWith(tab.href));

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  'whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MarketTabNav;