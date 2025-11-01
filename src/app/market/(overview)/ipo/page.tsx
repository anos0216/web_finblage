// src/app/market/ipo/page.tsx
import React from 'react';
import IpoTab from '@/components/marketUI/IpoTab';
import { getFilteredIpos } from '@/lib/market-data';

export default async function IpoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Get filter state from URL search params
  const resolvedParams = await searchParams;
  const status = resolvedParams.status === 'Closed' ? 'Closed' : 'Open';
  const type = 
    resolvedParams.type === 'Mainboard' ? 'Mainboard' :
    resolvedParams.type === 'SME' ? 'SME' : 'All';

  // Fetch pre-filtered data on the server
  const ipos = await getFilteredIpos(status, type);

  // We only pass the IPOs. The client component will read the
  // status/type from useSearchParams to ensure UI is in sync.
  return <IpoTab initialIpos={ipos} />;
}