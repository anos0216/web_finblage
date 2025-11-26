// src/components/stock/StockKeyMetrics.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockPeer } from '@/types/stock'; // Using peer type as it has marketCap

interface StockKeyMetricsProps {
  // We can take the peer data for the main company
  companyData: StockPeer; 
}

const MetricItem: React.FC<{ label: string; value: string | number | null }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">
      {typeof value === 'number' ? value.toLocaleString('en-IN') : value || 'N/A'}
    </p>
  </div>
);

export const StockKeyMetrics: React.FC<StockKeyMetricsProps> = ({ companyData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricItem 
          label="Market Cap (Cr)" 
          value={companyData.marketCap ? (companyData.marketCap / 10000000).toFixed(2) : 'N/A'} 
        />
        <MetricItem label="P/E Ratio" value={companyData.priceToEarningsValueRatio} />
        <MetricItem label="P/B Ratio" value={companyData.priceToBookValueRatio} />
        <MetricItem label="ROE (TTM)" value={companyData.returnOnAverageEquityTrailing12Month} />
        <MetricItem label="52-Week High" value={companyData.yhigh} />
        <MetricItem label="52-Week Low" value={companyData.ylow} />
      </CardContent>
    </Card>
  );
};