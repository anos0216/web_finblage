// src/components/detail/MarketOutlookDetailClient.tsx
"use client";

import React from "react";
import { ArticleItem } from "@/types/finblage";
import {
  FiiDiiSummary,
  HistoricalActivity,
  StockData,
  TrendingStocks,
} from "@/lib/market-data";
import { ArticleDetailHero } from "@/components/detail/ArticleDetailHero";
// ArticleSidebar is no longer imported
import MarketOutlookRichText from "@/components/detail/MarketOutlookRichText";
import FiiDiiWidget from "@/components/detail/FiiDiiWidget";
import MarketIndexCard from "@/components/marketUI/MarketIndexCard";
import TrendingStocksList from "@/components/marketUI/TrendingStocksList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketOutlookDetailClientProps {
  item: ArticleItem;
  fiiDiiData: {
    summary: FiiDiiSummary;
    daily: HistoricalActivity[];
    monthly: HistoricalActivity[];
  };
  indices: StockData[];
  trendingStocks: TrendingStocks;
  allItems: ArticleItem[]; // allItems is no longer used but kept for prop consistency
}

const MarketOutlookDetailClient: React.FC<MarketOutlookDetailClientProps> = ({
  item,
  fiiDiiData,
  indices,
  trendingStocks,
  // allItems is no longer used
}) => {
  const article = item.data;
  // Use glimpse first, then fall back to glimpses
  const abstract = article.glimpse ?? article.glimpses;
  const dateValue = article.date || article.coursePrice;

  return (
    <>
      <ArticleDetailHero
        title={article.title}
        category={article.subtitle || article.category}
        date={dateValue!}
        imageUrl={article.image}
        itemId={item.id}
      />

      <div className="bg-gray-50 pt-18 pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* --- Main Content (Left) --- */}
            <main className="lg:w-2/3">
              <article className="space-y-8">
                {/* Abstract/Intro */}
                {abstract && (
                  <p
                    className="text-lg text-gray-700 border-l-4 border-primary pl-4"
                    style={{
                      fontFamily: "var(--font-oxygen)",
                      fontWeight: 400,
                    }}
                  >
                    {abstract}
                  </p>
                )}

                {/* Main Content Body (Market Wrap, What's Ahead, etc.) */}
                <div className="prose prose-lg max-w-none text-gray-800">
                  <MarketOutlookRichText content={article.body} />
                </div>

                {/* --- Data Widgets Moved to Main Column --- */}
                <div className="space-y-6 pt-8">
                  <TrendingStocksList
                    title="Top Gainers"
                    stocks={trendingStocks.topGainers}
                  />
                  <TrendingStocksList
                    title="Top Losers"
                    stocks={trendingStocks.topLosers}
                  />
                  <TrendingStocksList
                    title="Price Shockers"
                    stocks={trendingStocks.priceShockers}
                  />
                  <TrendingStocksList
                    title="NSE Most Active (Volume)"
                    stocks={trendingStocks.nseMostActive}
                  />
                  <TrendingStocksList
                    title="BSE Most Active (Volume)"
                    stocks={trendingStocks.bseMostActive}
                  />
                </div>
              </article>
            </main>

            {/* --- Sidebar (Right) --- */}
            <aside className="lg:w-1/3 lg:sticky lg:top-2 lg:self-start space-y-6">
              {/* FII/DII Widget */}
              <FiiDiiWidget data={fiiDiiData} />

              {/* Indices */}
              <Card>
                <CardHeader>
                  <CardTitle>Indices</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {indices.map((item) => (
                    <MarketIndexCard key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>

              {/* "More Outlooks" (ArticleSidebar) has been removed as requested */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketOutlookDetailClient;