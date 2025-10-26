import React, { Suspense } from 'react'; // Import Suspense
import Hero from '@/components/Hero';
import {
  getNews,
  getMarketInsights,
  getMarketOutlook,
  getMergerAcquisitions,
  getSpotlight
} from '@/lib/dataService';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import LoadingLink from '@/components/shared/LoadingLink';
import { ArrowRight } from 'lucide-react';
import HomepageContentSkeleton from '@/components/shared/HomepageContentSkeleton'; // Import the new skeleton

// 1. Create an Async Component for Data Fetching and Rendering Content
async function HomepageContent() {
  const [
    newsResponse,
    insightsResponse,
    outlookResponse,
    mergerResponse,
    spotlightResponse
  ] = await Promise.all([
    getNews(1),
    getMarketInsights(1),
    getMarketOutlook(1),
    getMergerAcquisitions(1),
    getSpotlight(1),
  ]);

  const latestNews = newsResponse.dataItems?.slice(0, 4) || [];
  const latestInsight = insightsResponse.dataItems?.[0] || null;
  const latestOutlook = outlookResponse.dataItems?.[0] || null;
  const latestMerger = mergerResponse.dataItems?.[0] || null;
  const latestSpotlight = spotlightResponse.dataItems?.[0] || null;

  const featuredItems = [
    { item: latestInsight, basePath: "/market-insights" },
    { item: latestOutlook, basePath: "/market-outlook" },
    { item: latestMerger, basePath: "/merger-acquisition" },
    { item: latestSpotlight, basePath: "/spotlight" },
  ].filter(i => i.item);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* LATEST NEWS SECTION */}
        {latestNews.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Latest Market News</h2>
              <LoadingLink href="/news" className="group text-primary font-semibold flex items-center gap-2 hover:text-opacity-80 transition text-sm md:text-base">
                Show More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </LoadingLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestNews.map((item) => (
                <AnimatedArticleCard key={item.id} item={item} basePath="/news" />
              ))}
            </div>
          </section>
        )}

        {/* FEATURED INSIGHTS SECTION */}
        {featuredItems.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Insights</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map(({ item, basePath }) => (
                <AnimatedArticleCard key={item!.id} item={item!} basePath={basePath} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// 2. Modify the Default Export (Main Page Component)
export default function Home() {
  return (
    <main>
      {/* Hero renders immediately */}
      <Hero />

      {/* Wrap the data-dependent component in Suspense */}
      <Suspense fallback={<HomepageContentSkeleton />}>
        {/* HomepageContent will fetch data and render when ready */}
        <HomepageContent />
      </Suspense>
    </main>
  );
}