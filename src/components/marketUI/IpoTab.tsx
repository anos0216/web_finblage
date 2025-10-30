// src/components/marketUI/IpoTab.tsx
"use client";

import React from 'react';
import { UnifiedIpo } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import IpoCard from './IpoCard';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type IpoStatus = 'Open' | 'Closed';
type IpoType = 'All' | 'Mainboard' | 'SME';

interface IpoTabProps {
  initialIpos: UnifiedIpo[];
  // Removed initialStatus and initialType props
}

const IpoTab: React.FC<IpoTabProps> = ({ initialIpos }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // FIX: Read active state directly from URL search params
  // This is the single source of truth.
  const activeStatus: IpoStatus = searchParams.get('status') === 'Closed' ? 'Closed' : 'Open';
  const activeType: IpoType = 
    searchParams.get('type') === 'Mainboard' ? 'Mainboard' :
    searchParams.get('type') === 'SME' ? 'SME' : 'All';

  // This function handles filter clicks and triggers navigation
  const handleFilterChange = (key: 'status' | 'type', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/market/ipo?${params.toString()}`, { scroll: false });
  };

  // Re-usable filter button component
  const FilterButton = ({ label, value, activeValue, onClick }: {
    label: string,
    value: string,
    activeValue: string,
    onClick: (value: string) => void
  }) => (
    <Button
      variant="ghost"
      onClick={() => onClick(value)}
      className={cn(
        'flex-1 text-sm font-medium',
        activeValue === value // This now uses the live activeStatus/activeType
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      )}
    >
      {label}
    </Button>
  );

  return (
    // UI FIX: Added max-w-4xl and mx-auto
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Filters */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <FilterButton 
          label="Open" 
          value="Open" 
          activeValue={activeStatus} // Use activeStatus from useSearchParams
          onClick={(value) => handleFilterChange('status', value)} 
        />
        <FilterButton 
          label="Closed" 
          value="Closed" 
          activeValue={activeStatus} // Use activeStatus from useSearchParams
          onClick={(value) => handleFilterChange('status', value)} 
        />
      </div>
      
      {/* Type Filters */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <FilterButton 
          label="All" 
          value="All" 
          activeValue={activeType} // Use activeType from useSearchParams
          onClick={(value) => handleFilterChange('type', value)} 
        />
        <FilterButton 
          label="Mainboard" 
          value="Mainboard" 
          activeValue={activeType} // Use activeType from useSearchParams
          onClick={(value) => handleFilterChange('type', value)} 
        />
        <FilterButton 
          label="SME" 
          value="SME" 
          activeValue={activeType} // Use activeType from useSearchParams
          onClick={(value) => handleFilterChange('type', value)} 
        />
      </div>

      {/* IPO List */}
      <div className="space-y-4">
        {initialIpos.length > 0 ? (
          initialIpos.map(ipo => <IpoCard key={ipo.slug} ipo={ipo} />)
        ) : (
          <div className="text-center py-12 text-gray-500">
            No IPOs found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default IpoTab;