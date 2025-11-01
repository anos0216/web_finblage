// src/app/market/advance-decline/page.tsx
import React from 'react';
import AdvanceDeclineTab from '@/components/marketUI/AdvanceDeclineTab';
import { getSectorData } from '@/lib/market-data';

export default async function AdvanceDeclinePage() {
  const sectors = await getSectorData();
  return <AdvanceDeclineTab sectors={sectors} />;
}