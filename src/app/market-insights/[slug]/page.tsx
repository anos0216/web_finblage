"use client";

import React, { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext"; //
import { ArticleItem } from "@/types/finblage"; //
import { ArticleDetailHero } from "@/components/detail/ArticleDetailHero"; //
import { ArticleMainContent } from "@/components/detail/ArticleMainContent"; //
import { ArticleSidebar } from "@/components/detail/ArticleSidebar"; //
import { ArticleDetailSkeleton } from "@/components/detail/ArticleDetailSkeleton"; //

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const itemType = "market-insights";
  const basePath = "/market-insights";
  const sidebarTitle = "More Insights";

  const {
    getItemBySlug,
    marketInsights,
    isLoading,
    fetchInitialData,
    mergerAcquisitions
  } = useData(); //

  useEffect(() => {
    if (marketInsights.length === 0) {
      fetchInitialData(); //
    }
  }, [marketInsights.length, fetchInitialData]);

  if (isLoading || marketInsights.length === 0) {
    return <ArticleDetailSkeleton />;
  }

  const articleItem = getItemBySlug(slug, itemType) as ArticleItem | undefined; //

  if (!articleItem) {
    notFound();
  }

  const article = articleItem.data;
  const dateValue = article.date || article.coursePrice; //

  const otherArticles = marketInsights
    .filter((item) => item.id !== articleItem.id)
    .slice(0, 5); 

  return (
    <>
      <ArticleDetailHero
        title={article.title}
        category={article.category}
        date={dateValue!}
        imageUrl={article.image}
        itemId={articleItem.id} // <-- FIX: Changed from article.title to articleItem.id
      />

      <div className="bg-gray-50  pt-[214px] pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={articleItem} />
            <ArticleSidebar
            currentItemId={article.title}
            allItemsForTrending={marketInsights}
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