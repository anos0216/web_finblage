"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { NewsItem, ArticleItem } from "@/types/finblage"; //
import AnimatedArticleCard from "@/components/shared/AnimatedArticleCard"; //
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; //

interface TrendingCarouselProps {
  title: string;
  items: (NewsItem | ArticleItem)[];
  basePath: string;
  currentItemId: string; // <-- ADDED: ID to exclude
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  title,
  items,
  basePath,
  currentItemId, // <-- ADDED
}) => {
  // FIX: Filter out the current item BEFORE slicing
  const filteredItems = items.filter(item => item.id !== currentItemId);
  // Take the first 6 of the remaining items
  const trendingItems = filteredItems.slice(0, 6);

  if (trendingItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3
        className="text-xl font-bold text-primary mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: trendingItems.length > 1, // Loop only if more than 1 item
        }}
        plugins={trendingItems.length > 1 ? [ // Only add autoplay if more than 1 item
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ] : []}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {trendingItems.map((item) => (
            <CarouselItem key={item.id} className="pl-3 basis-full">
              <div className="h-full">
                <AnimatedArticleCard item={item} basePath={basePath} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {trendingItems.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white" />
          </>
        )}
      </Carousel>
    </div>
  );
};