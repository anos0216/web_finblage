import React from 'react';
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
import { NewsItem, ArticleItem } from '@/types/finblage';

// We no longer need the old HomePageSection component

export default async function Home() {
  const [
    newsResponse,
    insightsResponse,
    outlookResponse,
    mergerResponse,
    spotlightResponse
  ] = await Promise.all([
    getNews(0),
    getMarketInsights(0),
    getMarketOutlook(0),
    getMergerAcquisitions(0),
    getSpotlight(0),
  ]);

  // Get the 4 latest news items for the grid
  const latestNews = newsResponse.dataItems?.slice(0, 4) || [];

  // Get the single latest item from each of the other collections
  const latestInsight = insightsResponse.dataItems?.[0] || null;
  const latestOutlook = outlookResponse.dataItems?.[0] || null;
  const latestMerger = mergerResponse.dataItems?.[0] || null;
  const latestSpotlight = spotlightResponse.dataItems?.[0] || null;

  // Create an array of the featured items to map over
  const featuredItems = [
    { item: latestInsight, basePath: "/market-insights" },
    { item: latestOutlook, basePath: "/market-outlook" },
    { item: latestMerger, basePath: "/merger-acquisition" },
    { item: latestSpotlight, basePath: "/spotlight" },
  ].filter(i => i.item); // Filter out any sections that might be empty

  return (
    <main>
      <Hero />

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          
          {/* --- LATEST NEWS SECTION --- */}
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

          {/* --- FEATURED INSIGHTS SECTION --- */}
          {featuredItems.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Insights</h2>
                {/* This section is a mix, so no "Show More" link */}
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
    </main>
  );
}