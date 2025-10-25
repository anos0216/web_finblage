import React from 'react';
import { getNews } from '@/lib/dataService';
import Pagination from '@/components/shared/Pagination';
import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard';
import ListHero from '@/components/shared/ListHero'; // 1. Import the new hero

export default async function NewsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 0;
  const { dataItems: newsData, pagingMetadata } = await getNews(page);

  return (
    // 2. Wrap in a Fragment (or div)
    <>
      <ListHero 
        title="Latest Market News"
        subtitle="Stay updated with the latest financial news and market insights."
      />
      
      {/* 3. Keep the main content area */}
      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-16">
          {/* 4. The old header is removed */}

          {newsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsData.map((item) => (
                <AnimatedArticleCard key={item.id} item={item} basePath="/news" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-gray-500 text-lg">No news articles found.</p></div>
          )}

          <Pagination 
            currentPage={page}
            hasNextPage={pagingMetadata?.hasNext ?? false}
            basePath="/news"
          />
        </main>
      </div>
    </>
  );
}