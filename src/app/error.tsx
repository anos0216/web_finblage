'use client'; 

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-lg text-center">
        <h2 className="text-red-800 font-bold text-2xl mb-4">Something went wrong!</h2>
        <p className="text-red-700 mb-6">
          We encountered an issue while loading the page. This could be a temporary problem.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}