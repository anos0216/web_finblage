// src/lib/dataService.ts

import {
  ApiListResponse,
  NewsItem,
  ArticleItem,
  ApiSingleResponse,
} from "@/types/finblage";

// Use environment variable for base URL if available, otherwise fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://finblagebackend-3.onrender.com"; // Or your deployed backend URL
const ITEMS_PER_PAGE = 20;

// Helper to get slug (keep the robust version)
const getSlugFromItem = (item: NewsItem | ArticleItem): string | undefined => {
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
            console.warn(`Extracted empty slug from field ${slugKey} for item ID: ${item.id}`, data[slugKey]);
        } catch (e) { console.error(`Error processing slug field ${slugKey} for ID: ${item.id}`, e); }
    }
    console.warn(`Could not find/process valid slug key for item ID: ${item.id}`, data);
    return undefined;
};

// Fetches paginated lists (No changes needed here)
async function fetchFromApi<T>(
  collection: string,
  page: number = 0 // Assuming 0-based for API call
): Promise<ApiListResponse<T>> {
  const url = `${API_BASE_URL}/collections/${collection}/items?limit=${ITEMS_PER_PAGE}&page=${page}`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to fetch ${collection} list`);
    return response.json();
  } catch (error) {
    console.error(`API List Fetch Error (${collection}):`, error);
    return { dataItems: [], pagingMetadata: { hasNext: false } };
  }
}

// --- MODIFIED: Gets minimal item data (including _id) by slug ---
async function findItemBySlug<T extends NewsItem | ArticleItem>(
  collection: string,
  slug: string | undefined | null // FIX: Allow undefined or null
): Promise<(T & { _id: string }) | null> { // Ensure _id is included in the type
  const cleanedSlug = slug?.trim();
  
  // FIX: This guard now correctly handles undefined, null, or empty strings
  if (!cleanedSlug) {
    console.error(`Invalid or empty slug provided for ${collection}: received '${slug}'`);
    return null;
  }

  // Call the enhanced backend endpoint with the slug parameter
  const url = `${API_BASE_URL}/collections/${collection}/items?slug=${encodeURIComponent(cleanedSlug)}`;
  try {
    const response = await fetch(url, { cache: "no-store" }); // Don't cache slug lookups heavily
    if (!response.ok) {
        if (response.status === 404) {
             console.warn(`Item with slug "${cleanedSlug}" not found via backend in ${collection}.`);
             return null;
        }
        throw new Error(`Backend slug lookup failed for ${collection}/${cleanedSlug}`);
    }
    const result: ApiListResponse<T & { _id: string }> = await response.json(); // Expect _id from backend

    if (result.dataItems && result.dataItems.length > 0) {
      // Return the first match (backend should ideally only return one)
      return result.dataItems[0];
    } else {
      console.warn(`Item with slug "${cleanedSlug}" not found via backend in ${collection} (empty list returned).`);
      return null;
    }
  } catch (error) {
    console.error(`API Slug Lookup Error in ${collection} for slug "${cleanedSlug}":`, error);
    return null;
  }
}

// --- NEW: Fetches the full item data by its ID ---
async function getItemById<T extends NewsItem | ArticleItem>(
  collection: string,
  itemId: string
): Promise<ApiSingleResponse<T> | null> {
    const cleanedItemId = itemId?.trim();
    if (!cleanedItemId) {
        console.error(`Invalid or empty item ID provided for ${collection}: received '${itemId}'`);
        return null;
    }
    const url = `${API_BASE_URL}/collections/${collection}/item/${cleanedItemId}`;
    try {
        // Use revalidation for item details - they might not change often
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

        if (!response.ok) {
             if (response.status === 404) {
                 console.warn(`Item with ID "${cleanedItemId}" not found via backend in ${collection}.`);
                 return null; // Explicitly return null on 404
             }
            throw new Error(`Backend fetch by ID failed for ${collection}/${cleanedItemId}`);
        }
        const result: ApiSingleResponse<T> = await response.json();
        return result; // Backend should return { dataItem: {...} }

    } catch (error) {
        console.error(`API Item Fetch by ID Error in ${collection} for ID "${cleanedItemId}":`, error);
        return null; // Return null on error
    }
}


// --- List Fetchers (No change) ---
export const getNews = (page: number = 0) => fetchFromApi<NewsItem>("News", page);
export const getMarketInsights = (page: number = 0) => fetchFromApi<ArticleItem>("Items", page);
export const getMarketOutlook = (page: number = 0) => fetchFromApi<ArticleItem>("Items2", page);
export const getMergerAcquisitions = (page: number = 0) => fetchFromApi<ArticleItem>("MergerAquisition", page);
export const getSpotlight = (page: number = 0) => fetchFromApi<ArticleItem>("Courses", page);

// --- Single Item Fetchers (Refactored for two-step process) ---
async function fetchItemDetails<T extends NewsItem | ArticleItem>(collection: string, slug: string | undefined | null): Promise<ApiSingleResponse<T> | null> { // FIX: Allow undefined/null
    // Step 1: Find the item by slug to get its ID
    const minimalItemData = await findItemBySlug<T>(collection, slug); // findItemBySlug now handles undefined/null
    
    if (!minimalItemData?._id) {
        // FIX: Improve logging
        if (!slug) {
            console.error(`Could not retrieve ID because slug was not provided for collection "${collection}".`);
        } else {
            console.error(`Could not retrieve ID for slug "${slug}" in collection "${collection}".`);
        }
        return null; // Not found or error during slug lookup
    }

    // Step 2: Fetch the full item details using the ID
    return await getItemById<T>(collection, minimalItemData._id);
}

// FIX: Update all exports to accept undefined/null slugs
export const getNewsItem = (slug: string | undefined | null) => fetchItemDetails<NewsItem>("News", slug);
export const getMarketInsightItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Items", slug);
export const getMarketOutlookItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Items2", slug);
export const getMergerAcquisitionItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("MergerAquisition", slug);
export const getSpotlightItem = (slug: string | undefined | null) => fetchItemDetails<ArticleItem>("Courses", slug);