import React from 'react';
import NewsCardSkeleton from './NewsCardSkeleton';
import ArticleCardSkeleton from './ArticleCardSkeleton';

const HomepageContentSkeleton = () => (
  <div className="bg-white py-16 animate-pulse">
    <div className="container mx-auto px-4">
      {/* Skeleton for Latest News Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded-md"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <NewsCardSkeleton key={`news-skel-${i}`} />)}
        </div>
      </section>

      {/* Skeleton for Featured Insights Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded-md"></div>
          {/* No "Show More" skeleton needed here */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ArticleCardSkeleton key={`featured-skel-${i}`} />)}
        </div>
      </section>
    </div>
  </div>
);

export default HomepageContentSkeleton;