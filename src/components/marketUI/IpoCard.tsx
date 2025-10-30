// src/components/market/IpoCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedIpo } from '@/lib/market-data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const IpoCard: React.FC<{ ipo: UnifiedIpo }> = ({ ipo }) => {
  // Check if imageUrl exists and is not an empty string
  const hasImage = ipo.imageUrl && ipo.imageUrl.length > 0;
  
  let statusColor = 'text-gray-600 bg-gray-100 border-gray-300';
  if (ipo.status === 'Open') statusColor = 'text-green-700 bg-green-100 border-green-300';
  if (ipo.status === 'Closed') statusColor = 'text-red-700 bg-red-100 border-red-300';
  if (ipo.status === 'Listing Soon') statusColor = 'text-blue-700 bg-blue-100 border-blue-300';
  if (ipo.status === 'Listed') statusColor = 'text-purple-700 bg-purple-100 border-purple-300';

  const InfoItem = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="flex-1 min-w-[100px]"> {/* Added min-w for better wrapping */}
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value || 'N/A'}</p>
    </div>
  );

  return (
    <Link 
      href={`/market/ipo/${ipo.slug}`} 
      className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
            {/* FIX: Removed '!' from ipo.imageUrl */}
            {hasImage ? (
              <Image src={ipo.imageUrl!} alt={ipo.companyName} width={48} height={48} className="object-contain" />
            ) : (
              <span className="text-xs text-gray-500 text-center leading-tight">No Logo</span>
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold text-primary group-hover:underline">{ipo.companyName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', statusColor)}>
                {ipo.status}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600 border-gray-300">
                {ipo.ipoType}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center text-sm text-gray-500 group-hover:text-primary transition-colors flex-shrink-0 ml-4">
          Details <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
      
      {/* Info Grid */}
      <div className="flex flex-wrap gap-y-4 gap-x-2">
        {ipo.status === 'Open' && (
          <>
            <InfoItem label="Price Band" value={ipo.priceBand} />
            <InfoItem label="Min Investment" value={ipo.minInvestment} />
            <InfoItem label="Issue Size" value={ipo.issueSize} />
          </>
        )}
        {ipo.status === 'Closed' && (
          <>
            <InfoItem label="Issue Price" value={ipo.priceBand} />
            <InfoItem label="Issue Size" value={ipo.issueSize} />
            <InfoItem label="Closed On" value={ipo.issueCloseDate} />
          </>
        )}
        {ipo.status === 'Listing Soon' && (
          <>
            <InfoItem label="Listing Date" value={ipo.listingDate} />
            <InfoItem label="Issue Price" value={ipo.issuePrice} />
            <InfoItem label="Issue Size" value={ipo.issueSize} />
          </>
        )}
        {ipo.status === 'Listed' && (
          <>
            <InfoItem label="LTP" value={ipo.ltp} />
            <InfoItem label="Issue Price" value={ipo.issuePrice} />
            <InfoItem label="Gain %" value={ipo.gainPercent} />
          </>
        )}
      </div>
    </Link>
  );
};

export default IpoCard;