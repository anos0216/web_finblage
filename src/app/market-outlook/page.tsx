import React from 'react';
import { getMarketOutlook } from '@/lib/dataService';
import Pagination from '@/components/shared/Pagination';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import ListHero from '@/components/shared/ListHero'; // 1. Import

export default async function MarketOutlookPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string }> 
}) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 0;
    const { dataItems: articles, pagingMetadata } = await getMarketOutlook(page);

    return (
      <>
        <ListHero 
          title="Market Outlook"
          subtitle="Forward-looking analysis and predictions on market movements and economic forecasts."
        />

        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-16">
                {/* Old header removed */}

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map(article => <AnimatedArticleCard key={article.id} item={article} basePath="/market-outlook" />)}
                    </div>
                ) : (
                    <div className="text-center py-12"><p className="text-gray-500 text-lg">No outlook reports found.</p></div>
                )}

                <Pagination
                    currentPage={page}
                    hasNextPage={pagingMetadata?.hasNext ?? false}
                    basePath="/market-outlook"
                />
            </main>
        </div>
      </>
    );
}