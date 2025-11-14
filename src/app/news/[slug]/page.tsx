"use client";

import React, { useEffect, useState } from "react"; // Removed useRef
import { useParams, notFound } from "next/navigation";
import { useData } from "@/context/DataContext";
import {
  Minimize2, // Cleaned up imports
  Maximize2,
} from "lucide-react";
import { NewsItem } from "@/types/finblage";
import { ArticleMainContent } from "@/components/detail/ArticleMainContent";
import { ArticleSidebar } from "@/components/detail/ArticleSidebar";
import { ArticleDetailHero } from "@/components/detail/ArticleDetailHero"; // <-- IMPORTED
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import NoteEditor from "@/components/shared/NoteEditor";
import { Button } from "@/components/ui/button";

// --- Loading Skeleton Component (Unchanged) ---
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
  const [isNoteMinimized, setIsNoteMinimized] = useState(false);
  // --- DELETED isSticky state and useEffect ---

  const {
    getItemBySlug,
    news,
    isLoading,
    fetchInitialData,
    getNote,
    updateNote,
    // openChatbot is now called from within ArticleDetailHero
  } = useData();

  useEffect(() => {
    if (news.length === 0) {
      fetchInitialData();
    }
  }, [news.length, fetchInitialData]);

  if (isLoading || news.length === 0) {
    return <NewsDetailSkeleton />;
  }

  const newsItem = getItemBySlug(slug, "news") as NewsItem | undefined;

  if (!newsItem) {
    notFound();
  }

  const article = newsItem.data;
  const otherNews = news.filter((item) => item.id !== newsItem.id).slice(0, 5);
  const currentNote = getNote(newsItem.id) || "";

  // --- DELETED ActionIcons component definition ---

  return (
    <>
      {/* --- REPLACED Hero Section --- */}
      <ArticleDetailHero
        title={article.richtext}
        category={article.category}
        date={article.date}
        time={article.time.slice(0, 5)} // Pass formatted time
        itemId={newsItem.id}
        // No imageUrl is passed, so it will use the full-width layout
      />

      {/* --- DELETED Sticky Header --- */}

      {/* --- Main Content Area (Unchanged) --- */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={newsItem} />
            <ArticleSidebar
              currentItemId={article._id ?? ""}
              allItemsForTrending={news}
              title="More News"
              items={otherNews}
              basePath="/news"
            />
          </div>
        </div>
      </div>
      
      {/* --- MODAL (MOVED logic inside ArticleDetailHero) --- */}
      {/* We only need the dialog content for the *minimized* state */}
      <Dialog
        open={isNoteModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsNoteMinimized(false);
          setIsNoteModalOpen(open);
        }}
      >
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
                updateNote(newsItem.id, htmlContent);
              }}
            />
          </div>
          <DialogFooter className="pt-4 border-t mt-2 sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsNoteModalOpen(false);
                setIsNoteMinimized(true);
              }}
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Minimize
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* --- Minimized Note Widget (Unchanged) --- */}
      {isNoteMinimized && (
        <Button
          aria-label="Expand Note"
          className="fixed bottom-6 left-6 z-[60] rounded-full shadow-lg h-14 w-14 p-0"
          onClick={() => {
            setIsNoteMinimized(false);
            setIsNoteModalOpen(true);
          }}
        >
          <Maximize2 size={24} />
        </Button>
      )}
    </>
  );
}