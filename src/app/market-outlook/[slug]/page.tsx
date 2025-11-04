"use client"; // 1. Converted to Client Component

import React, { useEffect, useState } from "react"; // 2. Imported hooks
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext"; // 3. Imported useData
import { ArticleItem } from "@/types/finblage";
import {
  FiiDiiSummary,
  HistoricalActivity,
  StockData,
  TrendingStocks,
} from "@/lib/market-data";
import {
  getFiiDiiData,
  getIndicesData,
  getTrendingStocksData,
} from "@/lib/market-data"; // 4. Using client-side data fetchers
import MarketOutlookDetailClient from "@/components/detail/MarketOutlookDetailClient";
import { ArticleDetailSkeleton } from "@/components/detail/ArticleDetailSkeleton"; // 5. Added Skeleton for loading

// This is now a Client Component
export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const itemType = "market-outlook";

  // 6. Get data from DataContext
  const {
    getItemBySlug,
    marketOutlook,
    isLoading: isContextLoading,
    fetchInitialData,
  } = useData();

  // 7. Add state for supplemental data (FII/DII, Indices, etc.)
  const [supplementalData, setSupplementalData] = useState<{
    fiiDiiData: {
      summary: FiiDiiSummary;
      daily: HistoricalActivity[];
      monthly: HistoricalActivity[];
    };
    indices: StockData[];
    trendingStocks: TrendingStocks;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // 8. Fetch context data if it's not already loaded
      if (marketOutlook.length === 0) {
        await fetchInitialData();
      }
      
      // 9. Fetch all supplemental data in parallel
      try {
        const [fiiDii, indicesData, trending] = await Promise.all([
          getFiiDiiData(),
          getIndicesData(),
          getTrendingStocksData(),
        ]);
        setSupplementalData({
          fiiDiiData: fiiDii,
          indices: indicesData,
          trendingStocks: trending,
        });
      } catch (error) {
        console.error("Failed to fetch supplemental data:", error);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, [marketOutlook.length, fetchInitialData]);

  // 10. Show skeleton while loading
  if (isLoading || isContextLoading || !supplementalData) {
    return <ArticleDetailSkeleton />;
  }

  // 11. Get the specific article from the now-populated context
  const articleItem = getItemBySlug(slug, itemType) as ArticleItem | undefined;

  if (!articleItem) {
    notFound();
  }

  const allItems = marketOutlook;

  // 12. Render the client component with all data
  return (
    <MarketOutlookDetailClient
      item={articleItem}
      fiiDiiData={supplementalData.fiiDiiData}
      indices={supplementalData.indices}
      trendingStocks={supplementalData.trendingStocks}
      allItems={allItems}
    />
  );
}