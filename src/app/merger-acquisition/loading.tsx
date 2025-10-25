import React from 'react';
import ArticleCardSkeleton from '@/components/shared/ArticleCardSkeleton'; // Import the default skeleton

// This component will be shown by Next.js while the page.tsx data is loading
export default function Loading() {
  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        {/* Skeleton for the header */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 w-1/2 mx-auto bg-gray-200 rounded-md"></div>
          <div className="h-6 w-3/4 max-w-2xl mx-auto bg-gray-200 rounded-md mt-4"></div>
        </div>

        {/* Skeleton for the grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
        </div>
      </main>
    </div>
  );
}