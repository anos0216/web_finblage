import React from 'react';
import { getMergerAcquisitions } from '@/lib/dataService';
import Pagination from '@/components/shared/Pagination';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import ListHero from '@/components/shared/ListHero'; // 1. Import

export default async function MergerAcquisitionPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = Number(searchParams?.page) || 0;
    const { dataItems: articles, pagingMetadata } = await getMergerAcquisitions(page);

    return (
      <>
        <ListHero 
          title="Mergers & Acquisitions"
          subtitle="Comprehensive coverage of the latest deals, corporate restructuring, and market consolidation."
        />
        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-16">
                {/* Old header removed */}

                {articles.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map(article => <AnimatedArticleCard key={article.id} item={article} basePath="/merger-acquisition" />)}
                    </div>
                ) : (
                    <div className="text-center py-12"><p className="text-gray-500 text-lg">No M&A news found.</p></div>
                )}

                <Pagination
                    currentPage={page}
                    hasNextPage={pagingMetadata?.hasNext ?? false}
                    basePath="/merger-acquisition"
                />
            </main>
        </div>
      </>
    );
}