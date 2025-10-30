// src/components/market/IpoDetailClient.tsx
"use client"; // Needs to be client for URL launcher and future charts

import React from 'react';
import Image from 'next/image';
import { UnifiedIpo } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, CheckCircle, RefreshCw, FileText, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
// import RichTextRenderer from '@/components/shared/RichTextRenderer'; // Assuming you have this

// Placeholder for RichTextRenderer
const RichTextRenderer = ({ content }: { content: any }) => (
  <div className="prose prose-sm max-w-none">
    <p>Rich text content goes here. (This is a placeholder)</p>
    {/* You would map through content.nodes here */}
  </div>
);

// Placeholder for FinancialsChart
const FinancialsChart = ({ financials }: { financials: any }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
    <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
    <p className="mt-2 text-sm">Financials Chart Placeholder</p>
  </div>
);

const IpoDetailClient: React.FC<{ ipo: UnifiedIpo }> = ({ ipo }) => {
  const hasImage = ipo.imageUrl && ipo.imageUrl.length > 0;

  const InfoItem = ({ label, value }: { label: string, value: string | undefined }) => (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value || 'N/A'}</p>
    </div>
  );

  const TimelineItem = ({ icon: Icon, label, value, color }: any) => (
    <div className="flex items-start gap-3">
      <div className={cn("p-2 rounded-full", color.bg)}>
        <Icon size={20} className={color.text} />
      </div>
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">{value || 'TBA'}</p>
      </div>
    </div>
  );
  
  const timelineColors = {
    green: { bg: 'bg-green-100', text: 'text-green-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
              {hasImage ? (
                <Image src={ipo.imageUrl!} alt={ipo.companyName} width={64} height={64} className="object-contain" />
              ) : (
                <span className="text-sm text-gray-500 text-center leading-tight">No Logo</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">{ipo.companyName}</h1>
              <p className="text-sm text-gray-600">{ipo.issueType}</p>
            </div>
          </div>
          {ipo.drhpUrl && (
            <Button asChild variant="outline" className="flex-shrink-0">
              <a href={ipo.drhpUrl} target="_blank" rel="noopener noreferrer">
                View DRHP <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* IPO Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">IPO Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
          <InfoItem label="Price Band" value={ipo.priceBand} />
          <InfoItem label="Issue Size" value={ipo.issueSize} />
          <InfoItem label="Min Investment" value={ipo.minInvestment} />
          <InfoItem label="Lot Size" value={`${ipo.lotSize || "N/A"} Shares`} />
          <InfoItem label="Open Date" value={ipo.issueOpenDate} />
          <InfoItem label="Close Date" value={ipo.issueCloseDate} />
        </div>
      </div>

      {/* IPO Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">IPO Timeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
          <TimelineItem icon={Calendar} label="Offer Starts" value={ipo.issueOpenDate} color={timelineColors.green} />
          <TimelineItem icon={Calendar} label="Offer Ends" value={ipo.issueCloseDate} color={timelineColors.red} />
          <TimelineItem icon={CheckCircle} label="Allotment Finalization" value={ipo.basisOfAllotmentDate} color={timelineColors.orange} />
          <TimelineItem icon={RefreshCw} label="Refunds Initiation" value={ipo.refundsInitiatedDate} color={timelineColors.blue} />
          <TimelineItem icon={FileText} label="Shares Credited" value={ipo.sharesCreditedDate} color={timelineColors.blue} />
          <TimelineItem icon={BarChart2} label="Listing Date" value={ipo.listingDate} color={timelineColors.purple} />
        </div>
      </div>

      {/* Financials (Placeholder) */}
      {ipo.financials && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Financials (in ₹ Cr)</h2>
          <FinancialsChart financials={ipo.financials} />
          {/* You can also render the table here if needed */}
        </div>
      )}

      {/* About (Placeholder) */}
      {ipo.richContent && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About the IPO</h2>
          <RichTextRenderer content={ipo.richContent} />
        </div>
      )}
    </div>
  );
};

export default IpoDetailClient;