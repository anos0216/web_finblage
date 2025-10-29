import React from 'react';
import { getNews } from '@/lib/dataService';
import Pagination from '@/components/shared/Pagination';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import ListHero from '@/components/shared/ListHero';
// import FilterBar from '@/components/shared/FilterBar'; // REMOVE THIS IMPORT

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const resolvedParams = await searchParams;
  // FIX: Changed to be 0-based, consistent with other list pages
  const apiPage = Number(resolvedParams.page || '1');
  // const displayPage = apiPage + 1; // No longer needed here
  
  const { dataItems: newsData, pagingMetadata } = await getNews(apiPage);

  return (
    <>
      <ListHero
        title="Financial News"
        subtitle="Stay updated with the latest financial news and market insights."
        showFilters={true} // <-- ADD THIS PROP
      />

      <div className="bg-gray-50">
        {/* REMOVE the FilterBar component from here */}
        {/* <FilterBar /> */}

        <main className="container mx-auto px-4 pb-16 pt-8"> {/* Added pt-8 */}
          {newsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsData.map((item) => (
                <AnimatedArticleCard key={item.id} item={item} basePath="/news" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
            </div>
          )}

          <Pagination
            currentPage={apiPage} // FIX: Pass the 0-based apiPage
            hasNextPage={pagingMetadata?.hasNext ?? false}
            basePath="/news"
          />
        </main>
      </div>
    </>
  );
}