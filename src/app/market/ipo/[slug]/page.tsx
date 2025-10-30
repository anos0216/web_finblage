// src/app/market/ipo/[slug]/page.tsx
import React from 'react';
import { getIpoBySlug } from '@/lib/market-data';
import { notFound } from 'next/navigation';
import IpoDetailClient from '@/components/marketUI/IpoDetailClient';

export default async function IpoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
  const ipo = await getIpoBySlug(resolvedParams.slug);

  if (!ipo) {
    notFound();
  }

  // This is a Server Component that fetches data
  // and passes it to a Client Component for any interactivity
  // (like charts or rich text rendering)
  return <IpoDetailClient ipo={ipo} />;
}