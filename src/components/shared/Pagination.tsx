import Link from "next/link";
import React from "react";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNextPage,
  basePath,
}) => {
  const prevPage = currentPage > 0 ? currentPage - 1 : 0;
  const nextPage = currentPage + 1;

  // Don't render if there's only one page and no next page
  if (currentPage === 0 && !hasNextPage) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <a
        href={`${basePath}?page=${prevPage}`}
        className={`px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
        }`}
        aria-disabled={currentPage === 0}
        tabIndex={currentPage === 0 ? -1 : undefined}
      >
        ← Previous
      </a>

      <span className="text-gray-600 font-medium">Page {currentPage + 1}</span>

      <a
        href={`${basePath}?page=${nextPage}`}
        className={`px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition ${
          !hasNextPage
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
        }`}
        aria-disabled={!hasNextPage}
        tabIndex={!hasNextPage ? -1 : undefined}
      >
        Next →
      </a>
    </div>
  );
};

export default Pagination;
