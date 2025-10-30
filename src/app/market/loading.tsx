// src/app/market/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Skeleton for content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left/Main content */}
        <div className="md:col-span-2 space-y-6">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
        {/* Right sidebar */}
        <div className="space-y-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}