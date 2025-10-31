import React from 'react';
import { UnifiedIpo } from '@/lib/market-data';
import { Calendar, CheckCircle, RefreshCw, FileText, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define event data with colors
const timelineEvents = [
  { key: 'issueOpenDate', label: 'Offer Starts', icon: Calendar, color: 'bg-green-100 text-green-700' },
  { key: 'issueCloseDate', label: 'Offer Ends', icon: Calendar, color: 'bg-red-100 text-red-700' },
  { key: 'basisOfAllotmentDate', label: 'Allotment', icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
  { key: 'refundsInitiatedDate', label: 'Refunds', icon: RefreshCw, color: 'bg-yellow-100 text-yellow-700' },
  { key: 'sharesCreditedDate', label: 'Shares Credit', icon: FileText, color: 'bg-indigo-100 text-indigo-700' },
  { key: 'listingDate', label: 'Listing Date', icon: BarChart2, color: 'bg-purple-100 text-purple-700' },
];

const IpoTimeline: React.FC<{ ipo: UnifiedIpo }> = ({ ipo }) => {
  const events = timelineEvents
    .map(event => ({
      ...event,
      date: ipo[event.key as keyof UnifiedIpo] as string | undefined,
    }))
    .filter(event => event.date); // Only show events that have a date

  if (events.length === 0) return null;

  return (
    <div className="bg-white px-6 pt-6 pb-[96px] rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">IPO Timeline</h2>

      {/* --- Horizontal Timeline (Desktop) --- */}
      <div className="hidden md:flex flex-col">
        <div className="flex justify-between items-start">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center flex-1"
            >
              {/* Dot and Icon */}
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center z-10", event.color)}>
                <event.icon className="w-6 h-6" />
              </div>
              {/* Text */}
              <div className="text-center mt-3 absolute top-12">
                <p className="text-sm font-semibold text-gray-800">{event.label}</p>
                <p className="text-xs text-gray-600">{event.date || 'TBA'}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connecting Line */}
        <div className="relative w-full h-0.5 bg-gray-300 mt-[-24px] z-0">
           {/* This is the base line. We can add highlights later if needed. */}
        </div>
      </div>

      {/* --- Vertical Timeline (Mobile) --- */}
      <div className="md:hidden relative flex flex-col gap-8">
        {/* Connecting Line */}
        <div className="absolute top-0 left-6 w-0.5 h-full bg-gray-300 -translate-x-1/2" />

        {events.map((event, index) => (
          <div key={index} className="relative z-10 flex items-start gap-4">
            {/* Dot */}
            <div className={cn(
              "w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-white",
              event.color
            )}>
              <event.icon className="w-6 h-6" />
            </div>
            {/* Text */}
            <div className="pt-2">
              <p className="text-base font-semibold text-gray-800">{event.label}</p>
              <p className="text-sm text-gray-600">{event.date || 'TBA'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpoTimeline;