"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const AnimatedArticleCard: React.FC<CardProps> = ({ item, basePath }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    },
    { scope: cardRef }
  );

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

  const slugKey = Object.keys(item.data).find(
    (key) => key.startsWith("link-") && key.endsWith("-title")
  );
  const slug = isNews
    ? (item as NewsItem).data["link-news-richtext-2"]?.split("/").pop()
    : slugKey
    ? (item.data[slugKey as keyof typeof item.data] as string)?.split("/").pop()
    : item.id;

  if (!slug) return null;

  // --- RENDER NEWS CARD ---
  if (basePath === "/news") {
    const newsData = item.data as NewsItem["data"];
    const patternStyle = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E"), linear-gradient(to bottom right, var(--primary), #000b2c)`,
      backgroundBlendMode: "overlay",
    };
    return (
      <div ref={cardRef} className="opacity-0 h-full">
        <LoadingLink
          href={`${basePath}/${slug}`}
          className=" group bg-white rounded-[4px] shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
        >
          {/* Top Blue Part - Styled like the image */}
          <div
            className="relative p-4 text-white min-h-[160px] flex flex-col justify-between"
            style={patternStyle}
          >
            <div>
              {newsData.category && (
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-3 px-3 py-1 rounded">
                  {newsData.category}
                </span>
              )}
              {/* --- FONT CHANGE IS HERE --- */}
              <h3
                className="text-xl text-white leading-tight line-clamp-3"
                style={{ fontFamily: "var(--font-oxygen-bold)" }}
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
    <div ref={cardRef} className="opacity-0 h-full">
      <LoadingLink
        href={`${basePath}/${slug}`}
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
          <h3 className="text-base font-bold text-text-primary mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
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
