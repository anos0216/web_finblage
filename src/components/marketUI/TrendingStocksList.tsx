// src/components/market/TrendingStocksList.tsx
import React from 'react';
import { StockData } from '@/lib/market-data';
import { cn } from '@/lib/utils';

interface TrendingStocksListProps {
  title: string;
  stocks: StockData[];
}

const TrendingStocksList: React.FC<TrendingStocksListProps> = ({ title, stocks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
        {title}
      </h3>
      <div className="space-y-3">
        {stocks.map((stock) => (
          <div key={stock.id} className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">{stock.name}</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900 block">{stock.value}</span>
              <span
                className={cn(
                  'text-xs',
                  stock.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {stock.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocksList;