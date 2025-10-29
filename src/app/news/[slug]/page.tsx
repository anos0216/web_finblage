"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext"; //
import {
  Calendar,
  Clock,
  Share2,
  Sparkles,
  FileText,
  Bookmark,
} from "lucide-react";
import { NewsItem } from "@/types/finblage"; //
import { ArticleMainContent } from "@/components/detail/ArticleMainContent"; //
import { ArticleSidebar } from "@/components/detail/ArticleSidebar"; //

// --- Import Dialog and Editor ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; //
import NoteEditor from "@/components/shared/NoteEditor"; //
import { Button } from "@/components/ui/button"; //

// --- Loading Skeleton Component ---
const NewsDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
            <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <main className="lg:w-2/3">
              <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-5/6 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-5 w-full bg-gray-200 rounded"></div>
                <div className="h-5 w-full bg-gray-200 rounded"></div>
              </div>
            </main>
            <aside className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-8 w-1/2 bg-gray-200 rounded mb-5"></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const {
    getItemBySlug,
    news,
    isLoading,
    fetchInitialData,
    getNote,
    updateNote,
  } = useData(); //

  useEffect(() => {
    if (news.length === 0) {
      fetchInitialData(); //
    }
  }, [news.length, fetchInitialData]);

  if (isLoading || news.length === 0) {
    return <NewsDetailSkeleton />;
  }

  const newsItem = getItemBySlug(slug, "news") as NewsItem | undefined; //

  if (!newsItem) {
    notFound();
  }

  const article = newsItem.data;
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const otherNews = news.filter((item) => item.id !== newsItem.id).slice(0, 5);

  const currentNote = getNote(newsItem.id) || ""; //

  return (
    <>
      {/* --- Hero Section --- */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] py-16 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-lines"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-lines)"
            ></rect>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Category */}
            <span
              className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-4 px-3 py-1 rounded"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              {article.category}
            </span>
            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-oxygen)", fontWeight: 700 }}
            >
              {article.richtext}
            </h1>
            {/* Meta & Actions */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center text-gray-300 text-sm mt-2">
                <div className="flex items-center mr-4">
                  <Calendar className="w-4 h-4 mr-2 opacity-80" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 opacity-80" />
                  <span>{article.time.slice(0, 5)}</span>
                </div>
              </div>
              {/* Action Icons */}
              <div className="flex items-center space-x-3">
                <button
                  aria-label="Share"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                >
                  {" "}
                  <Share2 size={18} />{" "}
                </button>
                <button
                  aria-label="AI Summary"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                >
                  {" "}
                  <Sparkles size={18} />{" "}
                </button>

                {/* --- MODAL IMPLEMENTATION --- */}
                <Dialog
                  open={isNoteModalOpen}
                  onOpenChange={setIsNoteModalOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      aria-label="Create Note"
                      className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                    >
                      {" "}
                      <FileText size={18} />{" "}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Create Note</DialogTitle>
                      <DialogDescription>
                        Add your personal notes for: "{article.richtext}"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto pt-2 -mx-6 px-6">
                      <NoteEditor
                        content={currentNote}
                        onUpdate={(htmlContent) => {
                          updateNote(newsItem.id, htmlContent); /* */
                        }}
                      />
                    </div>
                    {/* --- FOOTER WITH DONE BUTTON --- */}
                    <DialogFooter className="pt-4 border-t mt-2">
                      <DialogClose asChild>
                        <Button type="button" variant="default">
                          Done
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* --- END MODAL --- */}

                <button
                  aria-label="Bookmark"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                >
                  {" "}
                  <Bookmark size={18} />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={newsItem} /> {/* */}
            <ArticleSidebar
            currentItemId={article._id ?? ""}
              allItemsForTrending={news}
              title="More News"
              items={otherNews}
              basePath="/news"
            />{" "}
            {/* */}
          </div>
        </div>
      </div>
    </>
  );
}
