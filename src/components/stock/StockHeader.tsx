// src/components/stock/StockHeader.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface StockHeaderProps {
  companyName: string;
  ticker: string;
  exchange: string;
  currentPrice: number;
  netChange: number;
  percentChange: number;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  companyName,
  ticker,
  exchange,
  currentPrice,
  netChange,
  percentChange,
}) => {
  const isPositive = percentChange >= 0;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>
      <p className="text-sm text-gray-500">
        {exchange}: {ticker}
      </p>
      
      <div className="flex items-end gap-4 mt-4">
        <p className="text-5xl font-bold">
          {currentPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
        </p>
        <div className={cn(
          "flex items-center gap-2 mb-1",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          <span className="text-xl font-semibold">
            {isPositive ? '▲' : '▼'} {netChange.toFixed(2)}
          </span>
          <span className="text-xl font-semibold">
            ({percentChange.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};