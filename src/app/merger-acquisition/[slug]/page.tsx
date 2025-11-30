"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext";
import { ArticleItem } from "@/types/finblage";
import { ArticleDetailHero } from "@/components/detail/ArticleDetailHero";
import { ArticleMainContent } from "@/components/detail/ArticleMainContent";
import { ArticleSidebar } from "@/components/detail/ArticleSidebar";
import { ArticleDetailSkeleton } from "@/components/detail/ArticleDetailSkeleton";
import { getMergerAcquisitionItem } from "@/lib/dataService"; 

const extractFromHtml = (htmlString: string, key: string): string => {
  if (!htmlString || typeof htmlString !== 'string') return "";
  const regex = new RegExp(`${key}\\s*:\\s*<\\/strong>\\s*([^<]+)`, "i");
  const match = htmlString.match(regex);
  if (match && match[1]) {
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
    mergerAcquisitions, 
    isLoading: isContextLoading,
    fetchInitialData,
  } = useData();

  const [fetchedItem, setFetchedItem] = useState<ArticleItem | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const contextItem = getItemBySlug(slug, itemType) as ArticleItem | undefined;

    if (contextItem) {
      setFetchedItem(contextItem);
      setIsFetching(false);
    } else {
      // Fetch directly if not in context (e.g. on refresh or deep link)
      const loadSpecificItem = async () => {
        try {
          const response = await getMergerAcquisitionItem(slug);
          if (response && response.dataItem) {
            setFetchedItem(response.dataItem);
          } else {
            setFetchedItem(null); 
          }
        } catch (error) {
          console.error("Error fetching detail item:", error);
          setFetchedItem(null);
        } finally {
          setIsFetching(false);
        }
      };
      loadSpecificItem();
    }

    if (mergerAcquisitions.length === 0) {
      fetchInitialData();
    }
  }, [slug, getItemBySlug, mergerAcquisitions.length, fetchInitialData]);

  if (isFetching || (isContextLoading && mergerAcquisitions.length === 0)) {
    return <ArticleDetailSkeleton />;
  }

  if (!fetchedItem) {
    notFound();
  }

  const article = fetchedItem.data;
  const dateValue = article.date || article.coursePrice;
  const data = article as any; 

  const rawHtml = data.dealType || "";
  const cleanDealType = extractFromHtml(rawHtml, "Deal Type");
  const cleanValue = extractFromHtml(rawHtml, "Estimated Value");
  const cleanStatus = extractFromHtml(rawHtml, "Deal Status");

  const otherArticles = mergerAcquisitions
    .filter((item) => item.id !== fetchedItem.id)
    .slice(0, 5);

  return (
    <>
      <ArticleDetailHero
        title={article.title}
        category={cleanDealType ? undefined : article.category}
        date={dateValue!}
        imageUrl={article.image}
        itemId={fetchedItem.id}
        dealType={cleanDealType || data.subCategory?.[0] || "Acquisition"}
        dealStatus={cleanStatus || "Pending"} 
        estimatedValue={cleanValue || data.subtitle}
      />

      <div className="bg-gray-50 pt-[214px] pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={fetchedItem} />
            <ArticleSidebar
              currentItemId={fetchedItem.id}
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