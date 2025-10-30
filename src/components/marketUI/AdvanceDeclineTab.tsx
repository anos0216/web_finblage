// src/components/marketUI/AdvanceDeclineTab.tsx
"use client";

import React, { useState, useMemo } from 'react';
// ... (all other imports are correct)
import { SectorModel } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AdvanceDeclineCard from './AdvanceDeclineCard';


type ChartView = 'Advanced' | 'Declined';

const ChartBar: React.FC<{ label: string, value: number, maxValue: number, color: string }> = ({ label, value, maxValue, color }) => {
  // ... (ChartBar component is correct)
  // Ensure maxValue is not zero to avoid division by zero
  const safeMaxValue = maxValue === 0 ? 1 : maxValue;
  const barWidth = (value / safeMaxValue) * 100;

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1/3 truncate text-sm text-gray-700" title={label}>{label}</div>
      <div className="w-2/3 flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={cn("h-3 rounded-full transition-all duration-500", color)}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className={cn("text-sm font-semibold w-12 text-right", color.replace('bg-', 'text-'))}>
          {value.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const AdvanceDeclineTab: React.FC<{ sectors: SectorModel[] }> = ({ sectors }) => {
  const [chartView, setChartView] = useState<ChartView>('Advanced');

  const { mostAdvanced, mostDeclined, maxRatio } = useMemo(() => {
    // ... (useMemo logic is correct)
    const sectorsWithRatio = sectors.map(s => ({
      ...s,
      adRatio: s.decline > 0 ? s.advance / s.decline : (s.advance > 0 ? s.advance : 0), // Handle division by zero
    }));
    
    const advanced = [...sectorsWithRatio].sort((a, b) => b.adRatio - a.adRatio).slice(0, 5);
    const declined = [...sectorsWithRatio].sort((a, b) => a.adRatio - b.adRatio).slice(0, 5);
    
    const maxAdv = advanced[0]?.adRatio || 1;
    // Use the most negative (smallest) adRatio for declined
    const maxDec = declined[0]?.adRatio || 0; 
    
    return {
      mostAdvanced: advanced,
      mostDeclined: declined,
      // Use the largest absolute value for scaling
      maxRatio: chartView === 'Advanced' ? maxAdv : declined[0]?.adRatio || 1, 
    };
  }, [sectors, chartView]);
  
  const chartData = chartView === 'Advanced' ? mostAdvanced : mostDeclined;
  const currentMaxRatio = chartView === 'Advanced' ? maxRatio : Math.max(...chartData.map(d => d.adRatio));

  return (
    // UI FIX: Added max-w-6xl and mx-auto
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-20">
        {/* ... (Filter buttons are correct) */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
          <Button
            variant="ghost"
            onClick={() => setChartView('Advanced')}
            className={cn('flex-1 text-sm h-9', chartView === 'Advanced' ? 'bg-primary text-white' : 'bg-gray-100')}
          >
            Most Advanced
          </Button>
          <Button
            variant="ghost"
            onClick={() => setChartView('Declined')}
            className={cn('flex-1 text-sm h-9', chartView === 'Declined' ? 'bg-primary text-white' : 'bg-gray-100')}
          >
            Most Declined
          </Button>
        </div>
        <div className="space-y-1">
          {chartData.map(sector => (
            <ChartBar
              key={sector.id}
              label={sector.sectorName}
              value={sector.adRatio}
              maxValue={currentMaxRatio} // Use the max of the current view
              color={chartView === 'Advanced' ? 'bg-green-500' : 'bg-red-500'}
            />
          ))}
        </div>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 space-y-4">
        {sectors.map(sector => (
          <AdvanceDeclineCard key={sector.id} sector={sector} />
        ))}
      </div>
    </div>
  );
};

export default AdvanceDeclineTab;