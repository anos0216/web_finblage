// src/components/detail/ArticleDetailHero.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { formatWixImage } from "@/lib/utils";
import {
  Calendar,
  Clock, // <-- ADDED
  Share2,
  Sparkles,
  FileText,
  Bookmark,
  Minimize2,
  Maximize2,
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { useData } from "@/context/DataContext";
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
import { cn } from "@/lib/utils";

interface ArticleDetailHeroProps {
  title: string;
  category?: string;
  date: string;
  time?: string; // <-- ADDED
  imageUrl?: string;
  itemId: string;
}

export const ArticleDetailHero: React.FC<ArticleDetailHeroProps> = ({
  title,
  category,
  date,
  time, // <-- ADDED
  imageUrl,
  itemId,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // --- State for Modal (Note) ---
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNoteMinimized, setIsNoteMinimized] = useState(false);

  // --- Get Note functions from Context ---
  const { getNote, updateNote, openChatbot } = useData();
  const currentNote = getNote(itemId) || "";

  // --- STICKY HEADER STATE & EFFECT ---
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // FIX: Changed threshold to be consistent
    const threshold = 450; 
    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array, runs once on mount

  // --- Re-usable Action Icons Component (Unchanged) ---
  const ActionIcons = ({ articleTitle }: { articleTitle: string }) => {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const shareContainerRef = useRef<HTMLDivElement>(null);

    // Get current URL on mount
    useEffect(() => {
      setCurrentUrl(encodeURIComponent(window.location.href));
    }, []);

    // Handle click outside to close share menu
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          shareContainerRef.current &&
          !shareContainerRef.current.contains(event.target as Node)
        ) {
          setIsShareOpen(false);
        }
      }
      if (isShareOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isShareOpen]);

    const encodedTitle = encodeURIComponent(articleTitle);

    const sharePlatforms = [
      {
        name: "Facebook",
        icon: Facebook,
        url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        color: "hover:text-blue-600",
      },
      {
        name: "Twitter",
        icon: Twitter,
        url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`,
        color: "hover:text-sky-500",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodedTitle}`,
        color: "hover:text-blue-700",
      },
      {
        name: "WhatsApp",
        icon: MessageCircle,
        url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${currentUrl}`,
        color: "hover:text-green-500",
      },
    ];

    return (
      <div
        ref={shareContainerRef}
        className="relative flex items-center space-x-3"
      >
        <button
          aria-label="AI Summary"
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
          onClick={openChatbot}
        >
          <Sparkles size={18} />
        </button>

        <Dialog
          open={isNoteModalOpen}
          onOpenChange={(open) => {
            if (!open) setIsNoteMinimized(false);
            setIsNoteModalOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <button
              aria-label="Create Note"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
            >
              <FileText size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Create Note</DialogTitle>
              <DialogDescription>
                Add your personal notes for: "{title}"
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pt-2">
              <NoteEditor
                content={currentNote}
                onUpdate={(htmlContent) => {
                  updateNote(itemId, htmlContent);
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
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <button
          aria-label="Bookmark"
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
        >
          <Bookmark size={18} />
        </button>
        {/* --- SHARE POPOVER --- */}
        <div
          className={cn(
            "absolute top-10 -left-[1px] flex items-center gap-2 rounded-full bg-white/10 p-2 shadow-lg transition-all duration-300 ease-in-out",
            isShareOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-2 pointer-events-none"
          )}
        >
          {sharePlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${platform.name}`}
              className={cn(
                "p-2 rounded-full bg-[#001351]/30 text-white transition-colors",
                platform.color
              )}
            >
              <platform.icon size={18} />
            </a>
          ))}
        </div>
        {/* --- END SHARE POPOVER --- */}

        <button
          aria-label="Share"
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
          onClick={() => setIsShareOpen(!isShareOpen)} // Toggle share menu
        >
          <Share2 size={18} />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* --- MAIN HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white">
        {/* ... (Background Pattern) ... */}
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-lines-dark"
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
              fill="url(#pattern-lines-dark)"
            ></rect>
          </svg>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* FIX: Conditional layout wrapper */}
          <div
            className={cn(
              "relative min-h-[420px]", // Base height
              imageUrl && "md:flex md:items-center" // Apply flex only if image exists
            )}
          >
            {/* --- Text Content (Left) --- */}
            {/* FIX: Conditional width */}
            <div
              className={cn(
                "pt-28 pb-12 md:pt-32 md:pb-16",
                imageUrl ? "md:w-3/5 lg:w-3/5" : "max-w-4xl" // Full width if no image
              )}
            >
              <div className={cn(imageUrl ? "max-w-xl" : "")}>
                {category && (
                  <span
                    className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-4 px-3 py-1 rounded"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                    }}
                  >
                    {category}
                  </span>
                )}
                <h1
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  style={{
                    fontFamily: "var(--font-oxygen)",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h1>
                {/* FIX: Added flex wrapper and conditional time */}
                <div className="flex flex-col md:flex-row items-start md:items-center text-gray-300 text-sm mt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-80" />
                    <span>{formatDate(date)}</span>
                  </div>
                  {time && (
                    <div className="flex items-center mt-2 md:mt-0 md:ml-4">
                      <Clock className="w-4 h-4 mr-2 opacity-80" />
                      <span>{time}</span>
                    </div>
                  )}
                </div>
                {/* --- Action Icons (Original Position) --- */}
                <div className="mt-6">
                  <ActionIcons articleTitle={title} />
                </div>
              </div>
            </div>
            
            {/* --- Image (Floating Right) --- */}
            {/* FIX: Conditional rendering for image */}
            {imageUrl && (
              <div
                className="
                  absolute top-[86%] md:absolute md:right-0 md:top-[128px] md:h-[60%] 
                  w-full md:w-2/5 lg:w-[45%]
                  h-64 sm:h-80
                  md:pl-8
                "
              >
                <div
                  className="
                  relative w-full h-full shadow-lg shadow-black/50
                  md:h-[calc(100%+8rem)] md:min-h-[300px] 
                  rounded-[12px] overflow-hidden
                  -mb-24 md:mb-0 md:top-0
                  "
                >
                  <Image
                    src={formatWixImage(imageUrl)}
                    alt={title}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NEW: STICKY HEADER (Unchanged) --- */}
      <div
        className={cn(
          "fixed w-full md:px-8 px-1 top-0 left-0 right-0 z-40 h-18 bg-gradient-to-br from-primary to-[#000b2c] text-white shadow-lg transition-all duration-300 ease-in-out",
          isSticky
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="h-full flex items-center justify-between">
          {/* Sticky Category */}
          <div className="text-2xl relative z-20 font-bold w-full flex items-center">
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              height={90}
              width={140}
              className="absolute -left-10"
            />
            <a href="/" className="absolute left-[64px]">
              Finblage
            </a>
          </div>

          {/* Sticky Action Icons */}
          <div className="flex-shrink-0">
            <ActionIcons articleTitle={title} />
          </div>
        </div>
      </div>
      {/* --- END: STICKY HEADER --- */}

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
};