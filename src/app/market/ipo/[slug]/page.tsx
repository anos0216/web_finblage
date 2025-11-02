// src/app/market/ipo/[slug]/page.tsx
import React from 'react';
import { getIpoBySlug } from '@/lib/market-data';
import { getPortfolioNews } from '@/lib/dataService';
import { notFound } from 'next/navigation';
import IpoDetailClient from '@/components/marketUI/IpoDetailClient';

export default async function IpoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
  const ipo = await getIpoBySlug(resolvedParams.slug);

  if (!ipo) {
    notFound();
  }

  // Fetch related news (using "TCS" as an example for Tata Capital)
  const newsResponse = await getPortfolioNews(ipo.companyName === "Tata Capital Ltd." ? ["TCS"] : []);
  const relatedNews = newsResponse.dataItems || [];

  return <IpoDetailClient ipo={ipo} relatedNews={relatedNews} />;
}