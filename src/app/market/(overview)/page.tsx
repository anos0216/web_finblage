// src/app/market/page.tsx
import React from 'react';
import OverviewTab from '@/components/marketUI/OverviewTab';
import { getIndicesData, getTrendingStocksData } from '@/lib/market-data';

// This is a Server Component. It fetches data and passes it down.
export default async function MarketOverviewPage() {
  // Fetch data in parallel
  const [indices, trendingStocks] = await Promise.all([
    getIndicesData(),
    getTrendingStocksData(),
  ]);

  return <OverviewTab indices={indices} trendingStocks={trendingStocks} />;
}