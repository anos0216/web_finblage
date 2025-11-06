// src/components/marketUI/MarketIndexCard.tsx
import React from 'react';
import { StockData } from '@/lib/market-data';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketIndexCardProps {
  item: StockData;
}

const MarketIndexCard: React.FC<MarketIndexCardProps> = ({ item }) => {
  const isPositive = item.isPositive;
  return (
    <div className="bg-white py-2 rounded-lg shadow-sm border border-gray-200 text-center">
      <h3 className="text-sm font-semibold text-gray-800 truncate" style={{ fontFamily: 'var(--font-inter)' }}>
        {item.name}
      </h3>
      <p className="text-lg font-bold text-gray-900 my-1">{item.value}</p>
      <div
        className={cn(
          'flex items-center justify-center text-xs font-medium',
          isPositive ? 'text-green-600' : 'text-red-600'
        )}
      >
        {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
        <span>{item.change}</span>
      </div>
    </div>
  );
};

export default MarketIndexCard;