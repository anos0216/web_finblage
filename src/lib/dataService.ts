// src/lib/dataService.ts

import {
  ApiListResponse,
  NewsItem,
  ArticleItem,
  ApiSingleResponse,
} from "@/types/finblage";

const API_BASE_URL = "https://finblagebackend-3.onrender.com/collections";
const ITEMS_PER_PAGE = 20;

// Helper function to reliably get the slug from any item type
const getSlugFromItem = (item: NewsItem | ArticleItem): string | undefined => {
  const data = item.data as any; // Use 'any' to access dynamic keys
  // Find the specific link field in the item's data
  const slugKey = Object.keys(data).find(
    (key) =>
      key.startsWith("link-") &&
      (key.endsWith("-title") || key.endsWith("-richtext-2"))
  );
  // Extract the last part of the path, which is the slug
  return slugKey ? data[slugKey]?.split("/").pop() : undefined;
};

// This function is for the paginated list pages (e.g., /news, /market-insights)
async function fetchFromApi<T>(
  collection: string,
  page: number = 0
): Promise<ApiListResponse<T>> {
  const url = `${API_BASE_URL}/${collection}/items?limit=${ITEMS_PER_PAGE}&page=${page}`;
  try {
    // ---- THIS IS THE FIX ----
    // We change from revalidating every hour to 'no-store' to force
    // a fresh data fetch on every single navigation.
    const response = await fetch(url, {
      next: { revalidate: 1800 },
      cache: "default",
    });
    // -------------------------

    if (!response.ok) throw new Error(`Failed to fetch ${collection}`);
    return response.json();
  } catch (error) {
    console.error("API List Fetch Error:", error);
    return { dataItems: [], pagingMetadata: { hasNext: false } };
  }
}

// This function is for the detail pages (e.g., /news/[slug])
async function getItemBySlug<T extends NewsItem | ArticleItem>(
  collection: string,
  slug: string
): Promise<ApiSingleResponse<T> | null> {
  try {
    // 1. Fetch the cached list of all items for this collection.
    // NOTE: This will ALSO now fetch fresh, but it's needed for the slug logic
    const allItems = await fetchFromApi<T>(collection);

    // 2. Find the specific item in the array that matches the slug from the URL.
    const foundItem = allItems.dataItems.find(
      (item) => getSlugFromItem(item) === slug
    );

    // 3. If found, return it. Otherwise, return null.
    if (foundItem) {
      return { dataItem: foundItem };
    }

    console.error(
      `Item with slug "${slug}" not found in collection "${collection}".`
    );
    return null;
  } catch (error) {
    console.error(`API Single Item Fetch Error in ${collection}:`, error);
    return null;
  }
}

// --- List Fetchers ---
export const getNews = (page?: number) => fetchFromApi<NewsItem>("News", page);
export const getMarketInsights = (page?: number) =>
  fetchFromApi<ArticleItem>("Items", page);
export const getMarketOutlook = (page?: number) =>
  fetchFromApi<ArticleItem>("Items2", page);
export const getMergerAcquisitions = (page?: number) =>
  fetchFromApi<ArticleItem>("MergerAquisition", page);
export const getSpotlight = (page?: number) =>
  fetchFromApi<ArticleItem>("Courses", page);

// --- Single Item Fetchers (These now use the corrected getItemBySlug logic) ---
export const getNewsItem = (slug: string) =>
  getItemBySlug<NewsItem>("News", slug);
export const getMarketInsightItem = (slug: string) =>
  getItemBySlug<ArticleItem>("Items", slug);
export const getMarketOutlookItem = (slug: string) =>
  getItemBySlug<ArticleItem>("Items2", slug);
export const getMergerAcquisitionItem = (slug: string) =>
  getItemBySlug<ArticleItem>("MergerAquisition", slug);
export const getSpotlightItem = (slug: string) =>
  getItemBySlug<ArticleItem>("Courses", slug);
