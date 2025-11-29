"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext";
import { ArticleItem } from "@/types/finblage";
import { ArticleDetailHero } from "@/components/detail/ArticleDetailHero";
import { ArticleMainContent } from "@/components/detail/ArticleMainContent";
import { ArticleSidebar } from "@/components/detail/ArticleSidebar";
import { ArticleDetailSkeleton } from "@/components/detail/ArticleDetailSkeleton";
import { getMergerAcquisitionItem } from "@/lib/dataService"; // Import direct fetcher

// --- Helper to parse the HTML string from the API ---
const extractFromHtml = (htmlString: string, key: string): string => {
  if (!htmlString || typeof htmlString !== 'string') return "";
  const regex = new RegExp(`${key}\\s*:\\s*<\\/strong>\\s*([^<]+)`, "i");
  const match = htmlString.match(regex);
  if (match && match[1]) {
    // Remove &nbsp; and trim whitespace
    return match[1].replace(/&nbsp;/g, ' ').trim();
  }
  return "";
};

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const itemType = "merger-acquisition";
  const basePath = "/merger-acquisition";
  const sidebarTitle = "More M&A News";

  const {
    getItemBySlug,
    mergerAcquisitions, // This only has Page 1 data
    isLoading: isContextLoading,
    fetchInitialData,
  } = useData();

  // Local state to hold the specific item if it's fetched directly
  const [fetchedItem, setFetchedItem] = useState<ArticleItem | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // 1. Try to get item from Context (fastest)
    const contextItem = getItemBySlug(slug, itemType) as ArticleItem | undefined;

    if (contextItem) {
      setFetchedItem(contextItem);
      setIsFetching(false);
    } else {
      // 2. If not in Context (e.g. from Page 2), fetch directly from API
      const loadSpecificItem = async () => {
        try {
          const response = await getMergerAcquisitionItem(slug);
          if (response && response.dataItem) {
            setFetchedItem(response.dataItem);
          } else {
            // Handle 404 specifically if needed, or leave null to trigger notFound()
            setFetchedItem(null); 
          }
        } catch (error) {
          console.error("Error fetching detail item:", error);
        } finally {
          setIsFetching(false);
        }
      };
      
      loadSpecificItem();
    }

    // Ensure sidebar data is loaded
    if (mergerAcquisitions.length === 0) {
      fetchInitialData();
    }
  }, [slug, getItemBySlug, mergerAcquisitions.length, fetchInitialData]);

  // Show skeleton while figuring out data
  if (isFetching || isContextLoading && mergerAcquisitions.length === 0) {
    return <ArticleDetailSkeleton />;
  }

  // Determine final item to display
  const articleItem = fetchedItem;

  if (!articleItem) {
    notFound();
  }

  const article = articleItem.data;
  const dateValue = article.date || article.coursePrice;
  const data = article as any; 

  const rawHtml = data.dealType || "";
  const cleanDealType = extractFromHtml(rawHtml, "Deal Type");
  const cleanValue = extractFromHtml(rawHtml, "Estimated Value");
  const cleanStatus = extractFromHtml(rawHtml, "Deal Status");

  const otherArticles = mergerAcquisitions
    .filter((item) => item.id !== articleItem.id)
    .slice(0, 5);

  return (
    <>
      <ArticleDetailHero
        title={article.title}
        category={cleanDealType ? undefined : article.category}
        date={dateValue!}
        imageUrl={article.image}
        itemId={articleItem.id}
        
        dealType={cleanDealType || data.subCategory?.[0] || "Acquisition"}
        dealStatus={cleanStatus || "Pending"} 
        estimatedValue={cleanValue || data.subtitle}
      />

      <div className="bg-gray-50 pt-[214px] pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={articleItem} />
            <ArticleSidebar
              currentItemId={articleItem.id}
              allItemsForTrending={mergerAcquisitions}
              title={sidebarTitle}
              items={otherArticles}
              basePath={basePath}
            />
          </div>
        </div>
      </div>
    </>
  );
}