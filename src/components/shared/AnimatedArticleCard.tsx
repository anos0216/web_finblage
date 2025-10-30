"use client";

import React from "react";
import LoadingLink from "./LoadingLink";
import Image from "next/image";
import { NewsItem, ArticleItem } from "@/types/finblage";
import { formatWixImage } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

type Item = NewsItem | ArticleItem;

interface CardProps {
  item: Item;
  basePath: string;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  // FIX: Added timeZone: "UTC" to ensure the date string is formatted
  // consistently on both the server and the client, resolving the
  // hydration error.
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
};

// --- HELPER FUNCTION (Corrected) ---
const extractSlug = (
  data: NewsItem["data"] | ArticleItem["data"],
  itemId: string // <-- FIX: Pass the item.id here
): string | undefined => {
  const isNews = "richtext" in data;

  // 1. Find the correct link key
  const slugKey = isNews
    ? "link-news-richtext-2"
    : Object.keys(data).find(
        (key) => key.startsWith("link-") && key.endsWith("-title")
      );

  if (!slugKey) {
    // FIX: Use the 'itemId' argument for the fallback
    return isNews ? undefined : itemId;
  }

  const linkValue = data[slugKey as keyof typeof data] as string | undefined;

  if (!linkValue) return undefined;

  // 2. Extract, clean, and return the slug
  try {
    const parts = linkValue.split("/");
    const lastPart = parts.pop()?.trim(); // This .trim() is the critical fix
    return lastPart && lastPart.length > 0 ? lastPart : undefined;
  } catch {
    return undefined;
  }
};
// --------------------------

const AnimatedArticleCard: React.FC<CardProps> = ({ item, basePath }) => {
  // --- Handle Data Variations ---
  const isNews = "richtext" in item.data;
  const title = isNews
    ? (item as NewsItem).data.richtext
    : (item as ArticleItem).data.title;
  const description = isNews
    ? (item as NewsItem).data.abstract
    : (item as ArticleItem).data.glimpses;
  const image =
    "image" in item.data ? (item as ArticleItem).data.image : undefined;

  const dateValue =
    item.data.date || (item.data as ArticleItem["data"]).coursePrice;

  // FIX: Pass item.id to the helper function
  const slug = extractSlug(item.data, item.id);

  // This check now correctly handles undefined or empty strings
  if (!slug) return null;

  // --- RENDER NEWS CARD ---
  if (basePath === "/news") {
    const newsData = item.data as NewsItem["data"];
    const patternStyle = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E"), linear-gradient(to bottom right, var(--primary), #000b2c)`,
      backgroundBlendMode: "overlay",
    };
    return (
      <div className="h-full">
        <LoadingLink
          href={`${basePath}/${slug}`} // Slug is now guaranteed to be clean
          className=" group bg-white rounded-[4px] shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
        >
          {/* Top Blue Part - Styled like the image */}
          <div
            className="relative p-4 text-white min-h-[160px] flex flex-col justify-between"
            style={patternStyle}
          >
            <div>
              {newsData.category && (
                <span
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-3 px-3 py-1 rounded"
                >
                  {newsData.category}
                </span>
              )}
              <h3
                className="text-xl text-white leading-tight line-clamp-3"
                style={{ fontFamily: "var(--font-oxygen)", fontWeight: 700 }}
              >
                {title}
              </h3>
            </div>
          </div>

          {/* Bottom White Part */}
          <div className="p-3 flex flex-col flex-grow">
            <p className="text-sm text-text-secondary line-clamp-4 flex-grow">
              {description}
            </p>
            <div className="flex items-center border-gray-200 pt-2 border-t text-sm opacity-80 justify-between mt-4">
              <div className="flex items-center ">
                <Clock className="w-4 h-4 mr-2" />
                <span>{newsData.time?.slice(0, 5)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{formatDate(dateValue)}</span>
              </div>
            </div>
          </div>
        </LoadingLink>
      </div>
    );
  }

  // --- RENDER DEFAULT CARD FOR ALL OTHER SECTIONS ---
  return (
    <div className="h-full">
      <LoadingLink
        href={`${basePath}/${slug}`} // Slug is now guaranteed to be clean
        className=" group bg-white rounded-[4px] shadow-sm border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        {image && (
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={formatWixImage(image)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="text-base text-text-primary mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-oxygen)" }}
          >
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-3 flex-grow">
            {description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 mt-4 border-t border-gray-300">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>{formatDate(dateValue)}</span>
            </div>
            {isNews && (
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>{(item as NewsItem).data.time?.slice(0, 5)}</span>
              </div>
            )}
          </div>
        </div>
      </LoadingLink>
    </div>
  );
};

export default AnimatedArticleCard;