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
}) => {
  const article = item.data;
  const dateValue = article.date || article.coursePrice;

  // --- Split indices into Major and Sectoral ---
  const majorIndicesNames = ["NIFTY 50", "SENSEX", "NIFTY BANK", "FINNIFTY"];
  const majorIndices = indices.filter(item => majorIndicesNames.includes(item.name));
  const sectoralIndices = indices.filter(item => !majorIndicesNames.includes(item.name));
  // --------------------------------------------------

  return (
    <>
      <ArticleDetailHero
        title={article.title}
        category={article.subtitle || article.category}
        date={dateValue!}
        imageUrl={article.image}
        itemId={item.id}
      />

      <div className="bg-gray-50 pt-32 pb-12 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* --- Main Content (Left) --- */}
            <main className="lg:w-2/3">
              {/* --- Sectoral Indices --- */}
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-primary">
                  Sectoral Indices
                </h2>
                {/* FIX: Made grid responsive. 2 cols on mobile, 3 on tablet+ */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {sectoralIndices.map((item) => (
                    <MarketIndexCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
              {/* -------------------------------------- */}

              <article className="space-y-8">
                <div className="prose prose-lg max-w-none text-gray-800">
                  <MarketOutlookRichText content={article.body} />
                </div>

                {/* FIX: Made grid responsive. 1 col on mobile, 2 on tablet+ */}
                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {/* --- Major Indices --- */}
              <section>
                <h2 className="text-lg font-bold mb-4 text-primary">
                  Major Indices
                </h2>
                {/* This 2-col grid is fine, as the sidebar stacks on mobile */}
                <div className="grid grid-cols-2 gap-4">
                  {majorIndices.map((item) => (
                    <MarketIndexCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
              {/* ----------------------------------- */}

              {/* FII/DII Widget */}
              <FiiDiiWidget data={fiiDiiData} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketOutlookDetailClient;