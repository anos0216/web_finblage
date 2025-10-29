import React from "react";

export const ArticleDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      {/* FIX: Removed 'overflow-hidden' */}
      <div className="relative bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          {/* FIX: REMOVED pb-24 and md:pb-0 from this div */}
          <div className="flex flex-col md:flex-row">
            {/* Text Area */}
            <div className="md:w-3/5 py-12">
              <div className="h-5 w-1/4 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
              <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>

              {/* FIX: Action Buttons skeleton moved here, 'md:hidden' removed */}
              <div className="flex items-center space-x-3 mt-6">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            {/* Image Area */}
            <div className="md:w-2/5 h-64 md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0">
              {/* FIX: Added -mb-24 and md:mb-0 to match the real component */}
              <div className="w-full h-full md:h-[calc(100%+8rem)] bg-gray-300 relative -mb-24 md:mb-0 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      {/* FIX: This padding (pt-32) is now correct because the hero isn't too tall */}
      <div className="bg-gray-50 pt-32 pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column */}
            <main className="lg:w-2/3">
              <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-5/6 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-5 w-full bg-gray-200 rounded"></div>
                <div className="h-5 w-full bg-gray-200 rounded"></div>
                <div className="h-5 w-11/12 bg-gray-200 rounded"></div>
              </div>
            </main>
            {/* Right Column */}
            <aside className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-8 w-1/2 bg-gray-200 rounded mb-5"></div>
                <div className="space-y-4">
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};