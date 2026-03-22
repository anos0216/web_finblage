import React from 'react';
// FIX: Changed from getMarketOutlook to getMarketInsights
import { getMarketInsights } from '@/lib/dataService'; //
import Pagination from '@/components/shared/Pagination';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import ListHero from '@/components/shared/ListHero';

export default async function MarketInsightsPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string }> 
}) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 0;
    // FIX: Changed from getMarketOutlook to getMarketInsights
    const { dataItems: articles, pagingMetadata } = await getMarketInsights(page); //

    return (
      <>
        <ListHero 
          // FIX: Updated title and subtitle
          title="Market Insights"
          subtitle="In-depth analysis and reports on current market trends and economic indicators."
        />

        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-16">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* FIX: Updated basePath */}
                        {articles.map(article => <AnimatedArticleCard key={article.id} item={article} basePath="/market-insights" />)}
                    </div>
                ) : (
                    <div className="text-center py-12"><p className="text-gray-500 text-lg">No insights found.</p></div>
                )}

                <Pagination
                    currentPage={page}
                    hasNextPage={pagingMetadata?.hasNext ?? false}
                    // FIX: Updated basePath
                    basePath="/market-insights"
                />
            </main>
        </div>
      </>
    );
}