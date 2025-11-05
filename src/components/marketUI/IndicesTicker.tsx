// src/components/marketUI/IndicesTicker.tsx
// NEW FILE
"use client";

import React from "react";
import { StockData } from "@/lib/market-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface IndicesTickerProps {
  indices: StockData[];
}

const TickerItem: React.FC<{ item: StockData }> = ({ item }) => {
  const isPositive = item.isPositive;
  return (
    <div className="flex-shrink-0 flex items-center gap-4 px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3
        className="text-sm font-semibold text-gray-800"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {item.name}
      </h3>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{item.value}</p>
        <div
          className={cn(
            "flex items-center justify-end text-xs font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {isPositive ? (
            <TrendingUp size={14} className="mr-1" />
          ) : (
            <TrendingDown size={14} className="mr-1" />
          )}
          <span>{item.change}</span>
        </div>
      </div>
    </div>
  );
};

const IndicesTicker: React.FC<IndicesTickerProps> = ({ indices }) => {
  // We duplicate the indices list to create a seamless loop
  const tickerItems = [...indices, ...indices];

  return (
    <div className="w-full overflow-hidden relative group">
      {/* Gradient Fades */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />

      {/* Ticker Animation */}
      <style jsx>{`
        .ticker-track {
          animation: scroll 40s linear infinite;
        }
        .group:hover .ticker-track {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="ticker-track flex w-max items-center gap-4 py-2">
        {tickerItems.map((item, index) => (
          <TickerItem key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default IndicesTicker;