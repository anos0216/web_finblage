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
  const itemType = "spotlight";
  const basePath = "/spotlight";
  const sidebarTitle = "More Spotlight";

  const { getItemBySlug, spotlight, isLoading, fetchInitialData } = useData(); //

  useEffect(() => {
    if (spotlight.length === 0) {
      fetchInitialData(); //
    }
  }, [spotlight.length, fetchInitialData]);

  if (isLoading || spotlight.length === 0) {
    return <ArticleDetailSkeleton />;
  }

  const articleItem = getItemBySlug(slug, itemType) as ArticleItem | undefined; //

  if (!articleItem) {
    notFound();
  }

  const article = articleItem.data;
  const dateValue = article.coursePrice || article.date; //

  const otherArticles = spotlight
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

      <div className="bg-gray-50 pt-18 pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={articleItem} />
            <ArticleSidebar
            currentItemId={article.title}
              allItemsForTrending={spotlight}
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
