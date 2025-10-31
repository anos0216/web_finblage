"use client";

import React from 'react';
import Image from 'next/image';
import { UnifiedIpo } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Calendar,
  CheckCircle,
  RefreshCw,
  FileText,
  BarChart2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import the new components
import IpoTimeline from './IpoTimeline';
import IpoFinancials from './IpoFinancials';
import IpoTextSection from './IpoTextSection';

// Placeholder for RichTextRenderer
const RichTextRenderer = ({ content }: { content: any }) => (
  <div className="prose prose-sm max-w-none text-gray-700">
    <p>{content || "No 'About' information available."}</p>
  </div>
);

const IpoDetailClient: React.FC<{ ipo: UnifiedIpo }> = ({ ipo }) => {
  const hasImage = ipo.imageUrl && ipo.imageUrl.length > 0;

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div>
      {/* FIX: Changed text colors for dark background */}
      <p className="text-xs text-gray-300 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-white">{value || 'N/A'}</p>
    </div>
  );

  return (
    // Use a wider container for this layout
    <div className="max-w-6xl mx-auto space-y-6 py-8">
      {/* Header */}
      {/* FIX: Changed to bg-primary, removed border */}
      <div className="relative p-6 rounded-lg shadow-sm bg-primary overflow-hidden">
        {/* FIX: Changed z-50 to z-0 to put pattern in background */}
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          {/* ... svg pattern (static) ... */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-lines"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-lines)"
            ></rect>
          </svg>
        </div>

        {/* FIX: Added relative z-10 to put content above pattern */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
              {hasImage ? (
                <Image
                  src={ipo.imageUrl!}
                  alt={ipo.companyName}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500 text-center leading-tight">
                  No Logo
                </span>
              )}
            </div>
            <div>
              {/* FIX: Changed text-primary to text-white */}
              <h1 className="text-2xl font-bold text-white">
                {ipo.companyName}
              </h1>
              {/* FIX: Changed text-gray-600 to text-gray-200 */}
              <p className="text-sm text-gray-200">{ipo.issueType}</p>
            </div>
          </div>
          {ipo.drhpUrl && (
            // FIX: Styled button for dark background
            <Button
              asChild
              variant="outline"
              className="flex-shrink-0 border-gray-300 text-gray-600 hover:bg-white hover:text-primary"
            >
              <a href={ipo.drhpUrl} target="_blank" rel="noopener noreferrer">
                View DRHP <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          )}
        </div>

        {/* FIX: Added relative z-10 to put content above pattern */}
        <div className="relative z-10 mt-5">
          {/* FIX: Changed text-gray-900 to text-white */}
          <h2 className="text-lg font-semibold text-white mb-2">
            IPO Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
            <InfoItem label="Price Band" value={ipo.priceBand} />
            <InfoItem
              label="Lot Size"
              value={ipo.lotSize ? `${ipo.lotSize} Shares` : 'N/A'}
            />
            <InfoItem label="Issue Size" value={ipo.issueSize} />
            <InfoItem label="Min Investment" value={ipo.minInvestment} />
            <InfoItem label="Status" value={ipo.status} />
            <InfoItem label="Issue Type" value={ipo.ipoType} />
            <InfoItem label="Listing At" value="BSE, NSE" />{' '}
            {/* Example data */}
            <InfoItem label="Registrar" value={ipo.registrar || 'N/A'} />
          </div>
        </div>
      </div>

      {/* --- NEW SECTIONS --- (Unchanged) */}

      {/* IPO Timeline */}
      <IpoTimeline ipo={ipo} />

      {/* About Section */}
      {ipo.about && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About {ipo.companyName}
          </h2>
          <RichTextRenderer content={ipo.about} />
        </div>
      )}

      {/* Financials Section */}
      {ipo.financials && ipo.financials.length > 0 && (
        <IpoFinancials financials={ipo.financials} />
      )}

      {/* Objects of the Offer */}
      <IpoTextSection
        title="Objects of the Offer"
        points={ipo.objectsOfTheOffer}
      />

      {/* Strengths */}
      <IpoTextSection title="Strengths" points={ipo.strengths} />

      {/* Risks */}
      <IpoTextSection title="Risks" points={ipo.risks} />
    </div>
  );
};

export default IpoDetailClient;