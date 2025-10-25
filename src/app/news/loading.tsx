import React from 'react';
import NewsCardSkeleton from '@/components/shared/NewsCardSkeleton'; // Import the new skeleton

// This component will be shown by Next.js while the page.tsx data is loading
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Skeleton for the header */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-1/2 mx-auto bg-gray-200 rounded-md"></div>
          <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded-md mt-4"></div>
        </div>

        {/* Skeleton for the grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <NewsCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}