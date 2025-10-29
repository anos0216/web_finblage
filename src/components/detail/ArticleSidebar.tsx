import React from "react";
import { NewsItem, ArticleItem } from "@/types/finblage"; //
import LoadingLink from "@/components/shared/LoadingLink"; //
import { Calendar, Clock } from "lucide-react";
import { extractSlugFromItem } from "@/context/DataContext"; //
import { TrendingCarousel } from "./TrendingCarousel"; //

// --- SidebarItem component (Unchanged) ---
const SidebarItem: React.FC<{
  item: NewsItem | ArticleItem;
  basePath: string;
}> = ({ item, basePath }) => {
  const slug = extractSlugFromItem(item); //
  if (!slug) return null;

  const isNews = "richtext" in item.data;
  const data = item.data as any;

  const title = isNews ? data.richtext : data.title;
  const date = data.date || data.coursePrice;
  const time = isNews ? data.time : null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <LoadingLink
      href={`${basePath}/${slug}`}
      className="block group mb-4 pb-4 border-b border-gray-200 last:border-b-0"
    >
      <h4
        className="text-sm font-semibold text-gray-800 group-hover:text-accent transition-colors leading-snug mb-1 line-clamp-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {title}
      </h4>
      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={12} className="mr-1.5" />
        <span>{formatDate(date)}</span>
        {time && (
          <>
            <span className="mx-1.5">|</span>
            <Clock size={12} className="mr-1.5" />
            <span>{time.slice(0, 5)}</span>
          </>
        )}
      </div>
    </LoadingLink>
  );
};

// --- Main Sidebar Component (Updated) ---
interface ArticleSidebarProps {
  title: string;
  items: (NewsItem | ArticleItem)[]; // Items for the "More Items" list
  basePath: string;
  allItemsForTrending: (NewsItem | ArticleItem)[];
  currentItemId: string; // <-- ADDED: ID of the currently viewed item
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  title,
  items,
  basePath,
  allItemsForTrending,
  currentItemId, // <-- ADDED
}) => {
  return (
    // FIX: Added sticky positioning classes
    <aside className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
      {/* --- Trending Carousel --- */}
      <TrendingCarousel
        title="Trending"
        items={allItemsForTrending}
        basePath={basePath}
        currentItemId={currentItemId} // <-- Pass current item ID
      />
      {/* ----------------------- */}

      {/* --- More Items List --- */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3
          className="text-xl font-bold text-primary mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h3>
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <SidebarItem key={item.id} item={item} basePath={basePath} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No other articles found.</p>
          )}
        </div>
      </div>
       {/* --------------------- */}
    </aside>
  );
};