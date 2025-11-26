// src/components/stock/PeerComparison.tsx
import React from 'react';
import { StockPeer } from '@/types/stock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const PeerComparison: React.FC<{ peers: StockPeer[] }> = ({ peers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Peer Comparison</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Company</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">Price (INR)</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">% Change</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">Market Cap (Cr)</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">P/E</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">P/B</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">ROE (TTM)</th>
            </tr>
          </thead>
          <tbody>
            {peers.map(peer => {
              const isPositive = peer.percentChange >= 0;
              return (
                <tr key={peer.tickerId} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      <Image 
                        src={peer.imageUrl} 
                        alt={peer.companyName} 
                        width={24} 
                        height={24} 
                        className="rounded-full" 
                      />
                      <span>{peer.companyName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">{peer.price.toLocaleString('en-IN')}</td>
                  <td className={cn(
                    "py-3 px-4 text-right font-medium",
                    isPositive ? "text-green-600" : "text-red-600"
                  )}>
                    {peer.percentChange.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    {(peer.marketCap / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right">{peer.priceToEarningsValueRatio?.toFixed(2) || 'N/A'}</td>
                  <td className="py-3 px-4 text-right">{peer.priceToBookValueRatio?.toFixed(2) || 'N/A'}</td>
                  <td className="py-3 px-4 text-right">{peer.returnOnAverageEquityTrailing12Month?.toFixed(2) || 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};