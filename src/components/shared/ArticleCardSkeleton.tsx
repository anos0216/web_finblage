import React from 'react';

const ArticleCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col p-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="h-40 w-full bg-gray-200 rounded-md mb-4"></div>
    
    <div className="flex flex-col flex-grow">
      {/* Title Placeholder */}
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
      
      {/* Description Placeholder */}
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-4 flex-grow"></div>

      {/* Footer Placeholder */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default ArticleCardSkeleton;