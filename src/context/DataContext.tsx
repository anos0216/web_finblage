"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { NewsItem, ArticleItem } from "@/types/finblage"; //
import {
  getNews,
  getMarketInsights,
  getMarketOutlook,
  getMergerAcquisitions,
  getSpotlight,
} from "@/lib/dataService"; //

// Define the types of data we will handle
export type ItemType =
  | "news"
  | "market-insights"
  | "market-outlook"
  | "merger-acquisition"
  | "spotlight";

// Helper function to extract slug from an item, based on logic from dataService.ts
//
export const extractSlugFromItem = (
  item: NewsItem | ArticleItem
): string | undefined => {
  const data = item.data as any;
  const possibleSlugKeys = [
    "link-news-richtext-2", ///page.tsx]
    "link-items-title",
    "link-items2-title", //
    "link-merger-aquisition-title", //
    "link-courses-title", //
  ];

  const slugKey = possibleSlugKeys.find(
    (key) => typeof data[key] === "string" && data[key].trim() !== ""
  );

  if (slugKey) {
    try {
      const parts = data[slugKey].split("/");
      const potentialSlug = parts.pop()?.trim();
      if (potentialSlug && potentialSlug.length > 0) return potentialSlug;
    } catch (e) {
      console.error(`Error processing slug field ${slugKey} for ID: ${item.id}`, e);
    }
  }

  // Fallback for Spotlight and other articles that might use item.id as slug
  //
  if (!("richtext" in item.data)) {
    return item.id;
  }

  return undefined;
};

// Define the shape of our context state
interface DataContextState {
  // Data lists
  news: NewsItem[];
  marketInsights: ArticleItem[];
  marketOutlook: ArticleItem[];
  mergerAcquisitions: ArticleItem[];
  spotlight: ArticleItem[];

  // Loading state
  isLoading: boolean;
  fetchInitialData: () => Promise<void>;

  // Get single item by slug (for detail pages)
  getItemBySlug: (
    slug: string,
    type: ItemType
  ) => NewsItem | ArticleItem | undefined;

  // Saved items management
  savedItems: string[]; // Array of item IDs
  toggleSavedItem: (itemId: string) => void;
  isItemSaved: (itemId: string) => boolean;
  getSavedItems: () => (NewsItem | ArticleItem)[];

  // Notes management
  notes: Record<string, string>; // { [itemId]: "note content" }
  updateNote: (itemId: string, note: string) => void;
  getNote: (itemId: string) => string | undefined;

  // AI Chatbot state
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
}

// Create the context
const DataContext = createContext<DataContextState | undefined>(undefined);

// Define the provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // --- State for Data Lists ---
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketInsights, setMarketInsights] = useState<ArticleItem[]>([]);
  const [marketOutlook, setMarketOutlook] = useState<ArticleItem[]>([]);
  const [mergerAcquisitions, setMergerAcquisitions] = useState<ArticleItem[]>(
    []
  );
  const [spotlight, setSpotlight] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- State for Saved Items & Notes ---
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  // --- State for AI Chatbot ---
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // --- Load from localStorage on mount ---
  useEffect(() => {
    const storedSavedItems = localStorage.getItem("finblage_saved_items");
    if (storedSavedItems) {
      setSavedItems(JSON.parse(storedSavedItems));
    }
    const storedNotes = localStorage.getItem("finblage_notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // --- Save to localStorage on change ---
  useEffect(() => {
    localStorage.setItem("finblage_saved_items", JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem("finblage_notes", JSON.stringify(notes));
  }, [notes]);

  // --- Function to fetch all initial data ---
  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement multi-page fetching if needed.
      // For now, fetching page 0, consistent with homepage
      const [
        newsRes,
        insightsRes,
        outlookRes,
        mergerRes,
        spotlightRes,
      ] = await Promise.all([
        getNews(0),
        getMarketInsights(0),
        getMarketOutlook(0),
        getMergerAcquisitions(0),
        getSpotlight(0),
      ]);

      setNews(newsRes.dataItems || []);
      setMarketInsights(insightsRes.dataItems || []);
      setMarketOutlook(outlookRes.dataItems || []);
      setMergerAcquisitions(mergerRes.dataItems || []);
      setSpotlight(spotlightRes.dataItems || []);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Function to get a single item by slug from local state ---
  const getItemBySlug = useCallback(
    (slug: string, type: ItemType): NewsItem | ArticleItem | undefined => {
      let list: (NewsItem | ArticleItem)[] = [];

      switch (type) {
        case "news":
          list = news;
          break;
        case "market-insights":
          list = marketInsights;
          break;
        case "market-outlook":
          list = marketOutlook;
          break;
        case "merger-acquisition":
          list = mergerAcquisitions;
          break;
        case "spotlight":
          list = spotlight;
          break;
      }
      
      return list.find((item) => extractSlugFromItem(item) === slug);
    },
    [news, marketInsights, marketOutlook, mergerAcquisitions, spotlight]
  );

  // --- Functions for Saved Items ---
  const toggleSavedItem = (itemId: string) => {
    setSavedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isItemSaved = (itemId: string) => {
    return savedItems.includes(itemId);
  };

  const getSavedItems = useCallback((): (NewsItem | ArticleItem)[] => {
    const allItems = [
      ...news,
      ...marketInsights,
      ...marketOutlook,
      ...mergerAcquisitions,
      ...spotlight,
    ];
    return allItems.filter((item) => savedItems.includes(item.id));
  }, [
    news,
    marketInsights,
    marketOutlook,
    mergerAcquisitions,
    spotlight,
    savedItems,
  ]);

  // --- Functions for Notes ---
  const updateNote = (itemId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [itemId]: note,
    }));
  };

  const getNote = (itemId: string) => {
    return notes[itemId];
  };

  // --- Functions for AI Chatbot ---
  const openChatbot = useCallback(() => setIsChatbotOpen(true), []);
  const closeChatbot = useCallback(() => setIsChatbotOpen(false), []);


  // --- Provide context value ---
  const value = {
    news,
    marketInsights,
    marketOutlook,
    mergerAcquisitions,
    spotlight,
    isLoading,
    fetchInitialData,
    getItemBySlug,
    savedItems,
    toggleSavedItem,
    isItemSaved,
    getSavedItems,
    notes,
    updateNote,
    getNote,
    isChatbotOpen,
    openChatbot,
    closeChatbot,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// --- Custom hook to use the context ---
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};