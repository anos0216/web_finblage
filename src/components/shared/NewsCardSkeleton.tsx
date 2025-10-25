import React from 'react';

const NewsCardSkeleton = () => (
  <div className="bg-white rounded-[4px] shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    {/* Top Blue Part Placeholder */}
    <div className="bg-gray-200 min-h-[190px] p-4 flex flex-col justify-between">
      <div>
        <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Bottom White Part Placeholder */}
    <div className="p-5">
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default NewsCardSkeleton;