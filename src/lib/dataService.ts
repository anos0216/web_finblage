// src/lib/dataService.ts

import {
  ApiListResponse,
  NewsItem,
  ArticleItem,
  ApiSingleResponse,
} from "@/types/finblage";

// Use environment variable for base URL if available, otherwise fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://finblagebackend-3.onrender.com";
const ITEMS_PER_PAGE = 20;

// Helper to check if a string is a valid UUID
const isUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Helper to get slug
export const getSlugFromItem = (item: NewsItem | ArticleItem): string | undefined => {
    const data = item.data as any;
    const possibleSlugKeys = [
      'link-news-richtext-2','link-items-title','link-items2-title',
      'link-merger-aquisition-title','link-courses-title',
    ];
    const slugKey = possibleSlugKeys.find(key => typeof data[key] === 'string' && data[key].trim() !== '');
    if (slugKey) {
        try {
            const parts = data[slugKey].split('/');
            const potentialSlug = parts.pop()?.trim();
            if (potentialSlug && potentialSlug.length > 0) return potentialSlug;
        } catch (e) { console.error(`Error processing slug field ${slugKey} for ID: ${item.id}`, e); }
    }
    return undefined;
};

// Fetches paginated lists
async function fetchFromApi<T>(
  collection: string,
  page: number = 0 
): Promise<ApiListResponse<T>> {
  const url = `${API_BASE_URL}/collections/${collection}/items?limit=${ITEMS_PER_PAGE}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${collection} list`);
    return response.json();
  } catch (error) {
    console.error(`API List Fetch Error (${collection}):`, error);
    return { dataItems: [], pagingMetadata: { hasNext: false } };
  }
}

// Gets minimal item data (including _id) by slug
async function findItemBySlug<T extends NewsItem | ArticleItem>(
  collection: string,
  slug: string | undefined | null 
): Promise<(T & { _id: string }) | null> { 
  const cleanedSlug = slug?.trim();
  
  if (!cleanedSlug) {
    return null;
  }

  const url = `${API_BASE_URL}/collections/${collection}/items?slug=${encodeURIComponent(cleanedSlug)}`;
  try {
    const response = await fetch(url, { cache: "no-store" }); 
    if (!response.ok) {
        if (response.status === 404) {
             return null;
        }
        throw new Error(`Backend slug lookup failed for ${collection}/${cleanedSlug}`);
    }
    const result: ApiListResponse<T & { _id: string }> = await response.json(); 

    if (result.dataItems && result.dataItems.length > 0) {
      return result.dataItems[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(`API Slug Lookup Error in ${collection} for slug "${cleanedSlug}":`, error);
    return null;
  }
}

// Fetches the full item data by its ID
async function getItemById<T extends NewsItem | ArticleItem>(
  collection: string,
  itemId: string
): Promise<ApiSingleResponse<T> | null> {
    const cleanedItemId = itemId?.trim();
    if (!cleanedItemId) return null;

    const url = `${API_BASE_URL}/collections/${collection}/item/${cleanedItemId}`;
    try {
        const response = await fetch(url, { next: { revalidate: 3600 } }); 

        if (!response.ok) {
             if (response.status === 404) {
                 return null;
             }
            throw new Error(`Backend fetch by ID failed for ${collection}/${cleanedItemId}`);
        }
        const result: ApiSingleResponse<T> = await response.json();
        return result; 

    } catch (error) {
        console.error(`API Item Fetch by ID Error in ${collection} for ID "${cleanedItemId}":`, error);
        return null; 
    }
}


// --- List Fetchers ---
export const getNews = (page: number = 0) => fetchFromApi<NewsItem>("News", page);
export const getMarketInsights = (page: number = 0) => fetchFromApi<ArticleItem>("Items", page);
export const getMarketOutlook = (page: number = 0) => fetchFromApi<ArticleItem>("Items2", page);
export const getMergerAcquisitions = (page: number = 0) => fetchFromApi<ArticleItem>("MergerAquisition", page);
export const getSpotlight = (page: number = 0) => fetchFromApi<ArticleItem>("Courses", page);

// --- Single Item Fetchers (Enhanced for Robustness) ---
async function fetchItemDetails<T extends NewsItem | ArticleItem>(
    collection: string, 
    slugOrId: string | undefined | null
): Promise<ApiSingleResponse<T> | null> {
    const identifier = slugOrId?.trim();
    if (!identifier) return null;

    // STRATEGY 1: Check if the identifier is a UUID. If so, fetch directly by ID.
    // This handles cases where the slug is missing and we used ID as a fallback link.
    if (isUUID(identifier)) {
        return await getItemById<T>(collection, identifier);
    }

    // STRATEGY 2: Treat as slug and lookup ID first
    const minimalItemData = await findItemBySlug<T>(collection, identifier);
    
    if (minimalItemData?._id) {
        return await getItemById<T>(collection, minimalItemData._id);
    }

    // STRATEGY 3: Fallback - if slug lookup failed, try ID fetch anyway 
    // (Just in case the ID format didn't pass our regex but is valid for the backend)
    return await getItemById<T>(collection, identifier);
}

export const getNewsItem = (slug: string | undefined | null) => fetchItemDetails<NewsItem>("News", slug);
export const getMarketInsightItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Items", slug);
export const getMarketOutlookItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Items2", slug);
export const getMergerAcquisitionItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("MergerAquisition", slug);
export const getSpotlightItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Courses", slug);

// --- Fetches news by company symbols ---
export const getPortfolioNews = async (
  symbols: string[],
  page: number = 1,
  limit: number = 10
): Promise<ApiListResponse<NewsItem>> => {
  const url = `${API_BASE_URL}/portfolio/news`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbols, page, limit }),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio news for symbols: ${symbols.join(", ")}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Portfolio News Fetch Error:", error);
    return { dataItems: [], pagingMetadata: { hasNext: false } };
  }
};