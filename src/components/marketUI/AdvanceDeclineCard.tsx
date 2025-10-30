// src/components/market/AdvanceDeclineCard.tsx
import React from 'react';
import { SectorModel } from '@/lib/market-data';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

const AdvanceDeclineCard: React.FC<{ sector: SectorModel }> = ({ sector }) => {
  const isPositive = sector.dayChangePercent >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const total = sector.advance + sector.decline;
  const advPercent = total > 0 ? (sector.advance / total) * 100 : 0;
  const decPercent = total > 0 ? (sector.decline / total) * 100 : 0;

  const Info = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
    <div className="text-center">
      <p className={cn("text-lg font-semibold", color)}>{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-primary">{sector.sectorName}</h3>
        <div className={cn("flex items-center text-sm font-medium", changeColor)}>
          {isPositive ? <ArrowUp size={16} className="mr-0.5" /> : <ArrowDown size={16} className="mr-0.5" />}
          {sector.dayChangePercent.toFixed(2)}%
        </div>
      </div>

      {/* Bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-red-100 mb-4">
        <div className="bg-green-500" style={{ width: `${advPercent}%` }} />
        <div className="bg-red-500" style={{ width: `${decPercent}%` }} />
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center px-2">
        <Info label="Advance" value={sector.advance} color="text-green-600" />
        <Info label="Total" value={total} color="text-gray-800" />
        <Info label="Decline" value={sector.decline} color="text-red-600" />
      </div>
    </div>
  );
};

export default AdvanceDeclineCard;