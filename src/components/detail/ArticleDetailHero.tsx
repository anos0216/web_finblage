"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatWixImage } from "@/lib/utils"; //
import {
  Calendar,
  Share2,
  Sparkles,
  FileText,
  Bookmark,
  Minimize2, // Added
  Maximize2, // Added
} from "lucide-react";
import { useData } from "@/context/DataContext"; //

// --- Import Dialog and Editor ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter, // Added
  DialogClose, // Added
} from "@/components/ui/dialog"; //
import NoteEditor from "@/components/shared/NoteEditor"; //
import { Button } from "@/components/ui/button"; // Added

interface ArticleDetailHeroProps {
  title: string;
  category?: string;
  date: string;
  imageUrl?: string;
  itemId: string; // <-- ADDED: To link note to the item
}

export const ArticleDetailHero: React.FC<ArticleDetailHeroProps> = ({
  title,
  category,
  date,
  imageUrl,
  itemId, // <-- ADDED
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // --- State for Modal ---
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNoteMinimized, setIsNoteMinimized] = useState(false); // Added

  // --- Get Note functions from Context ---
  const { getNote, updateNote } = useData(); //
  const currentNote = getNote(itemId) || ""; //

  return (
    <>
      <div className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white">
        {/* ... (Background Pattern) ... */}
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          <div className="relative md:flex md:items-center min-h-[450px] md:min-h-[350px]">
            {/* --- Text Content (Left) --- */}
            <div className="md:w-full lg:w-3/5 py-12 md:py-16">
              <div className="max-w-xl">
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

                <div className="flex items-center text-gray-300 text-sm mt-4">
                  <Calendar className="w-4 h-4 mr-2 opacity-80" />
                  <span>{formatDate(date)}</span>
                </div>

                {/* --- Action Icons --- */}
                <div className="flex items-center space-x-3 mt-6">
                  <button
                    aria-label="Share"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    aria-label="AI Summary"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <Sparkles size={18} />
                  </button>

                  {/* --- MODAL IMPLEMENTATION --- */}
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
                            updateNote(itemId, htmlContent); //
                          }}
                        />
                      </div>
                      {/* --- FOOTER WITH MINIMIZE --- */}
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
                  {/* --- END MODAL --- */}

                  <button
                    aria-label="Bookmark"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* --- Image (Floating Right) --- */}
            <div
              className="
            absolute top-[67%] md:absolute md:right-0 md:top-16 md:h-[60%] 
            w-full md:w-3/S5 lg:w-[45%] 
            h-64 sm:h-80
            md:pl-8
          "
            >
              <div
                className="
                relative w-full h-full
                md:h-[calc(100%+8rem)] md:min-h-[300px] 
                rounded-[12px] overflow-hidden shadow-2xl
                -mb-24 md:mb-0 md:top-0
                "
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {imageUrl ? (
                  <Image
                    src={formatWixImage(imageUrl)}
                    alt={title}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-black/10"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Minimized Note Widget --- */}
      {isNoteMinimized && (
        <Button
          aria-label="Expand Note"
          className="fixed bottom-6 left-6 z-[60] rounded-full shadow-lg h-14 w-14 p-0" // z-index higher than modal overlay (50)
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