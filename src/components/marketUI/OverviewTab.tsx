// src/components/marketUI/OverviewTab.tsx
import React from 'react';
import { StockData, TrendingStocks } from '@/lib/market-data';
import MarketIndexCard from './MarketIndexCard'; // RE-ADDED
// import IndicesTicker from './IndicesTicker'; // REMOVED
import TrendingStocksList from './TrendingStocksList';

interface OverviewTabProps {
  indices: StockData[];
  trendingStocks: TrendingStocks;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ indices, trendingStocks }) => {
  return (
    <div className="space-y-8">
      {/* Indices Section - Reverted to Card Grid */}
      <section>
        <h2 className="text-xl font-semibold text-primary mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Indices
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {indices.map((item) => (
            <MarketIndexCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Trending Stocks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TrendingStocksList title="Top Gainers" stocks={trendingStocks.topGainers} />
        <TrendingStocksList title="Top Losers" stocks={trendingStocks.topLosers} />
        <TrendingStocksList title="Price Shockers" stocks={trendingStocks.priceShockers} />
        <TrendingStocksList title="NSE Most Active" stocks={trendingStocks.nseMostActive} />
        <TrendingStocksList title="BSE Most Active" stocks={trendingStocks.bseMostActive} />
      </div>
    </div>
  );
};

export default OverviewTab;