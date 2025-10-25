// src/lib/dataService.ts

import { ApiListResponse, NewsItem, ArticleItem, ApiSingleResponse } from '@/types/finblage';

const API_BASE_URL = 'https://finblagebackend-3.onrender.com/collections';
const ITEMS_PER_PAGE = 8;

// ADD THIS HELPER FUNCTION
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to reliably get the slug from any item type
const getSlugFromItem = (item: NewsItem | ArticleItem): string | undefined => {
  // ... (same as before)
  const data = item.data as any; 
  const slugKey = Object.keys(data).find(key => 
    key.startsWith('link-') && (key.endsWith('-title') || key.endsWith('-richtext-2'))
  );
  return slugKey ? data[slugKey]?.split('/').pop() : undefined;
};



// This function is for the paginated list pages (e.g., /news, /market-insights)
async function fetchFromApi<T>(collection: string, page: number = 0): Promise<ApiListResponse<T>> {
  const url = `${API_BASE_URL}/${collection}/items?limit=${ITEMS_PER_PAGE}&page=${page}`;
  
  // --- ADD THIS DELAY ---
  // This runs the fetch and a 500ms delay at the same time.
  // The function will ALWAYS take at least 500ms to return.
  // This gives your loading.tsx shimmer time to render.
  const [response] = await Promise.all([
    fetch(url, { cache: 'no-store' }),
    sleep(500) // 500ms delay. Adjust as needed.
  ]);
  // --------------------

  try {
    if (!response.ok) throw new Error(`Failed to fetch ${collection}`);
    return response.json();
  } catch (error) {
    console.error("API List Fetch Error:", error);
    return { dataItems: [], pagingMetadata: { hasNext: false } };
  }
}

// This function is for the detail pages (e.g., /news/[slug])
async function getItemBySlug<T extends NewsItem | ArticleItem>(collection: string, slug: string): Promise<ApiSingleResponse<T> | null> {
  try {
    // We can create a *new* fetcher for single items that *doesn't* have the delay
    // This will make your slug pages load instantly.
    const allItems = await fetchFromApi<T>(collection, 0); // This will use the delayed fetcher
    
    // --- (This logic is inefficient but matches your file) ---
    // In the future, you should have a separate API endpoint: /collections/News/items/[slug]
    const foundItem = allItems.dataItems.find(item => getSlugFromItem(item) === slug);

    if (foundItem) {
      return { dataItem: foundItem };
    }
    
    console.error(`Item with slug "${slug}" not found in collection "${collection}".`);
    return null;
  } catch (error) {
    console.error(`API Single Item Fetch Error in ${collection}:`, error);
    return null;
  }
}

// --- List Fetchers ---
export const getNews = (page?: number) => fetchFromApi<NewsItem>('News', page);
export const getMarketInsights = (page?: number) => fetchFromApi<ArticleItem>('Items', page);
export const getMarketOutlook = (page?: number) => fetchFromApi<ArticleItem>('Items2', page);
export const getMergerAcquisitions = (page?: number) => fetchFromApi<ArticleItem>('MergerAquisition', page);
export const getSpotlight = (page?: number) => fetchFromApi<ArticleItem>('Courses', page); 

// --- Single Item Fetchers ---
export const getNewsItem = (slug: string) => getItemBySlug<NewsItem>('News', slug);
export const getMarketInsightItem = (slug: string) => getItemBySlug<ArticleItem>('Items', slug);
export const getMarketOutlookItem = (slug: string) => getItemBySlug<ArticleItem>('Items2', slug);
export const getMergerAcquisitionItem = (slug: string) => getItemBySlug<ArticleItem>('MergerAquisition', slug);
export const getSpotlightItem = (slug: string) => getItemBySlug<ArticleItem>('Courses', slug);