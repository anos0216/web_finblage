import React from 'react';

export default function Loading() {
  return (
    <>
      {/* Hero Skeleton - Mimics ListHero dimensions and dark theme */}
      <div className="relative bg-gray-900 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 animate-pulse">
           {/* Title Placeholder */}
           <div className="h-10 md:h-12 w-64 md:w-96 mx-auto bg-white/10 rounded-md mb-4"></div>
           {/* Subtitle Placeholder */}
           <div className="h-6 w-3/4 max-w-2xl mx-auto bg-white/10 rounded-md"></div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col gap-6 animate-pulse">
            
            {/* Toolbar Skeleton (Search & Buttons) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
              <div className="w-full sm:w-72 h-10 bg-gray-200 rounded-md"></div>
              <div className="flex gap-2">
                <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 grid grid-cols-6 gap-4">
                <div className="h-4 bg-gray-300 rounded w-16"></div> {/* Date */}
                <div className="h-4 bg-gray-300 rounded w-24"></div> {/* Target */}
                <div className="h-4 bg-gray-300 rounded w-24"></div> {/* Acquirer */}
                <div className="h-4 bg-gray-300 rounded w-20"></div> {/* Sector */}
                <div className="h-4 bg-gray-300 rounded w-20"></div> {/* Deal Size */}
                <div className="h-4 bg-gray-300 rounded w-16"></div> {/* Status */}
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 grid grid-cols-6 gap-4 items-center">
                     {/* Date Column */}
                     <div className="h-4 bg-gray-200 rounded w-20"></div>
                     
                     {/* Target Company Column (Name + Ticker) */}
                     <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-100 rounded w-12"></div>
                     </div>
                     
                     {/* Acquirer Company Column (Name + Ticker) */}
                     <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-3 bg-gray-100 rounded w-12"></div>
                     </div>

                     {/* Sector Column */}
                     <div className="h-4 bg-gray-200 rounded w-24"></div>
                     
                     {/* Deal Size Column */}
                     <div className="h-4 bg-gray-200 rounded w-16"></div>

                     {/* Status Badge Column */}
                     <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                ))}
              </div>

              {/* Table Footer / Pagination */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
                <div className="flex gap-2">
                   <div className="h-8 w-20 bg-gray-200 rounded"></div>
                   <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}