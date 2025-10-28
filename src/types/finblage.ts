// Generic type for a single API item response
export interface ApiSingleResponse<T> {
  dataItem: T;
}

// Generic type for a list API response
export interface ApiListResponse<T> {
  dataItems: T[];
  pagingMetadata?: {
    hasNext: boolean;
  };
}

// Type for a single News item
export interface NewsItem {
  id: string;
  dataCollectionId?: string; // Added
  data: {
    // Existing fields
    richtext: string; // The headline
    abstract: string;
    subHeadline: string; // The full body content for news
    category: string;
    time: string;
    date: string;
    company: string[];
    subCategory: string[];
    'link-news-richtext-2': string; // This is the slug

    // Added optional fields from dummy data to fix TS error
    'link-news-richtext'?: string;
    _id?: string;
    _owner?: string;
    _createdDate?: { $date: string };
    _updatedDate?: { $date: string };
    'link-news-1-all'?: string;
    boolean?: boolean;
  };
}

// A generic type for other article-like items (Insights, Outlook, etc.)
export interface ArticleItem {
  id: string;
  data: {
    title: string;
    glimpses: string; // Use glimpses as the description/abstract
    image: string;
    category?: string;
    date?: string; // Standard date field
    coursePrice?: string; // Alternative date field for Spotlight collection
    body: RichTextNode;
    'link-items-title'?: string;
    'link-merger-aquisition-title'?: string;
    'link-courses-title'?: string;
  };
}

// Types for the rich text 'body' field
export type RichTextNode = {
  nodes: Node[];
};

export type Node = {
  type:
    | 'HEADING'
    | 'PARAGRAPH'
    | 'BULLETED_LIST'
    | 'LIST_ITEM'
    | 'TABLE'
    | 'IMAGE'
    | 'HTML';
  id: string;
  nodes: (Node | TextNode)[];
  headingData?: { level: number };
  imageData?: { image: { src: { id: string } }; caption?: string };
  htmlData?: { html: string };
  // Add other specific data types as needed
};

export type TextNode = {
  type: 'TEXT';
  id: string;
  nodes: [];
  textData: {
    text: string;
    decorations: Decoration[];
  };
};

export type Decoration = {
  type: 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'LINK';
  fontWeightValue?: number;
  italicData?: boolean;
  linkData?: { link: { url: string } };
};

export interface NewsDataResponse {
  dataItems: NewsItem[];
  pagingMetadata: {
    count: number;
    offset: number;
    tooManyToCount: boolean;
    cursors: {
      next: string;
    };
    hasNext: boolean;
  };
}