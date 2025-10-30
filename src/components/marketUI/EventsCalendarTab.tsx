// src/components/market/EventsCalendarTab.tsx
"use client";

import React, { useState } from 'react';
import { CorporateEvent, ResultsEvent, EconomicEvent } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EconomicEventCard from './EconomicEventCard';
import { Briefcase, BarChart2, Globe } from 'lucide-react';

type EventTab = 'Corporate' | 'Results' | 'Economic';

interface EventsCalendarTabProps {
  corporate: CorporateEvent[];
  results: ResultsEvent[];
  economic: EconomicEvent[];
}

const CorporateEventCard: React.FC<{ event: CorporateEvent }> = ({ event }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
    <Briefcase className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
    <div>
      <p className="font-semibold text-gray-800">{event.stockSymbol}</p>
      <p className="text-sm text-gray-600">{event.title}</p>
      <p className="text-xs text-gray-400 mt-1">{event.date} | {event.category}</p>
    </div>
  </div>
);

const ResultEventCard: React.FC<{ event: ResultsEvent }> = ({ event }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
    <BarChart2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
    <div>
      <p className="font-semibold text-gray-800">{event.company}</p>
      <p className="text-sm text-gray-600">{event.type}</p>
      <p className="text-xs text-gray-400 mt-1">{event.date}</p>
    </div>
  </div>
);

const EventsCalendarTab: React.FC<EventsCalendarTabProps> = ({ corporate, results, economic }) => {
  const [activeTab, setActiveTab] = useState<EventTab>('Corporate');

  const FilterButton: React.FC<{ label: string, onClick: () => void, isActive: boolean, icon: React.ElementType }> = ({ label, onClick, isActive, icon: Icon }) => (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'flex-1 text-sm font-medium h-11 gap-2',
        isActive
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );

  return (
    // UI FIX: Added max-w-4xl and mx-auto
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub-tab Filters */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <FilterButton label="Corporate" icon={Briefcase} onClick={() => setActiveTab('Corporate')} isActive={activeTab === 'Corporate'} />
        <FilterButton label="Results" icon={BarChart2} onClick={() => setActiveTab('Results')} isActive={activeTab === 'Results'} />
        <FilterButton label="Economic" icon={Globe} onClick={() => setActiveTab('Economic')} isActive={activeTab === 'Economic'} />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'Corporate' && (corporate.length > 0 ? corporate.map(event => (
          <CorporateEventCard key={event.id} event={event} />
        )) : <p className="text-gray-500 text-center py-4">No corporate events found.</p>)}
        
        {activeTab === 'Results' && (results.length > 0 ? results.map(event => (
          <ResultEventCard key={event.id} event={event} />
        )) : <p className="text-gray-500 text-center py-4">No results events found.</p>)}
        
        {activeTab === 'Economic' && (economic.length > 0 ? economic.map(event => (
          <EconomicEventCard key={event.id} event={event} />
        )) : <p className="text-gray-500 text-center py-4">No economic events found.</p>)}
      </div>
    </div>
  );
};

export default EventsCalendarTab;