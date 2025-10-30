// src/components/market/EconomicEventCard.tsx
import React from 'react';
import { EconomicEvent } from '@/lib/market-data';

const getCountryFlag = (country: string) => {
  const flags: { [key: string]: string } = {
    'South Korea': '🇰🇷',
    'United States': '🇺🇸',
    'Argentina': '🇦🇷',
    'Japan': '🇯🇵',
    'India': '🇮🇳',
    'China': '🇨🇳',
    'Saudi Arabia': '🇸🇦',
  };
  return flags[country] || '🏳️';
};

const DataColumn: React.FC<{ label: string, value: string | undefined }> = ({ label, value }) => (
  <div className="flex-1 text-center sm:text-left">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value || '-'}</p>
  </div>
);

const EconomicEventCard: React.FC<{ event: EconomicEvent }> = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <span className="text-xl">{getCountryFlag(event.country)}</span>
          <span className="font-semibold text-primary">{event.time}</span>
          <span className="text-sm text-gray-600">{event.country}</span>
        </div>
        <p className="text-base font-semibold text-gray-900 text-left sm:text-right">{event.event}</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between bg-gray-50 p-3 rounded-md">
        <DataColumn label="Actual" value={event.actual} />
        <DataColumn label="Previous" value={event.previous} />
        <DataColumn label="Consensus" value={event.consensus} />
      </div>
    </div>
  );
};

export default EconomicEventCard;