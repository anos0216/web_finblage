import React from "react";
import { notFound } from "next/navigation";
// import { getNewsItem, getNews } from "@/lib/dataService"; // No longer fetching
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  Share2,
  Sparkles,
  FileText,
  Bookmark,
} from "lucide-react";
import LoadingLink from "@/components/shared/LoadingLink";
import { NewsItem, NewsDataResponse } from "@/types/finblage"; // Assuming NewsDataResponse is the type for dummyData

// --- Dummy Data ---
// Using the data you provided
const dummyData: NewsDataResponse = {
  dataItems: [
    {
      id: "a0689371-8956-410e-86e1-df36720a9560",
      dataCollectionId: "News",
      data: {
        subCategory: ["Regulatory"],
        "link-news-richtext": "/news/",
        _id: "a0689371-8956-410e-86e1-df36720a9560",
        _owner: "c3e5d256-da24-4907-ba24-acc8565040cf",
        _createdDate: {
          $date: "2025-10-28T16:49:35.604Z",
        },
        abstract:
          "The Reserve Bank of India (RBI) has denied Dia Vikas Capital’s proposal to acquire more than 5% equity in ESAF Small Finance Bank. The decision compels ESAF’s promoter to explore alternative options to bring down its shareholding in line with RBI’s ownership norms.",
        "link-news-richtext-2":
          "/news/rbi-blocks-dia-vikas-from-acquiring-over-5-percent-stake-in-esaf-small-finance-bank",
        _updatedDate: {
          $date: "2025-10-28T16:49:35.604Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["ESAFSFB"],
        boolean: false,
        date: "2025-10-28",
        subHeadline:
          "The Reserve Bank of India (RBI) has rejected the proposal submitted by Dia Vikas Capital to acquire more than a 5% stake in ESAF Small Finance Bank (ESAF SFB). The move aligns with the central bank’s regulatory oversight under the RBI Bank Ownership Directions 2023, which govern permissible shareholding limits in Indian banks.\n\nCurrently, ESAF’s promoter holds a 53% stake in the bank. Under RBI’s directions, the promoter must gradually reduce this shareholding to 26% by 2032 to ensure broader ownership and compliance with regulatory norms.\n\nWith Dia Vikas Capital’s acquisition plan blocked, ESAF’s promoter will now have to explore alternative strategies — such as stake dilution through institutional placements or secondary market sales — to meet the regulatory timeline.\n\nThe RBI’s decision reflects its consistent approach to enforcing ownership diversification in small finance banks, aimed at maintaining governance standards and reducing concentration risk in promoter hands.",
        category: "Corporate",
        time: "22:19:00.000",
        richtext:
          "RBI Blocks Dia Vikas from Acquiring Over 5 Percent Stake in ESAF Small Finance Bank",
      },
    },
    {
      id: "c68fe42b-d6dc-40c6-a14b-5cb53a18dee3",
      dataCollectionId: "News",
      data: {
        subCategory: ["Results"],
        "link-news-richtext": "/news/",
        _id: "c68fe42b-d6dc-40c6-a14b-5cb53a18dee3",
        _owner: "c3e5d256-da24-4907-ba24-acc8565040cf",
        _createdDate: {
          $date: "2025-10-28T16:30:41.469Z",
        },
        abstract:
          "IdeaForge Technology reported a 41.3% year-on-year increase in net profit to ₹19.5 crore for Q2 FY26, driven by higher revenue and international expansion initiatives. However, EBITDA declined 28.9% to ₹11.3 crore amid rising costs.",
        "link-news-richtext-2":
          "/news/ideaforge-technology-q2-profit-rises-41%25-yoy-despite-lower-ebitda",
        _updatedDate: {
          $date: "2025-10-28T16:30:41.469Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["IDEAFORGE"],
        boolean: false,
        date: "2025-10-28",
        subHeadline:
          "IdeaForge Technology Ltd posted a 41.3% year-on-year growth in net profit to ₹19.5 crore for the quarter ended September 2025 (Q2 FY26). Revenue from operations rose 10% to ₹40.8 crore compared to the same period last year, reflecting steady demand for the company’s UAV products and solutions.\n\nDespite the revenue growth, EBITDA fell 28.9% to ₹11.3 crore, indicating margin pressure due to higher operational and input costs.\n\nDuring the quarter, IdeaForge formed a joint venture and secured a NATO Stock Number (NSN) for its Q6 unmanned aerial vehicle (UAV), marking a key milestone in expanding its global defence market footprint. The NSN recognition enhances the company’s credibility and access to international procurement programs, particularly among NATO-aligned countries.\n\nThe management said the focus remains on scaling global operations, strengthening partnerships, and driving innovation in surveillance and reconnaissance drone technology.",
        category: "Corporate",
        time: "22:00:00.000",
        richtext:
          "IdeaForge Technology Q2 Profit Rises 41% YoY Despite Lower EBITDA",
      },
    },
    // ... Other dummy data items (I've truncated them for brevity, but they are in your file)
    {
      id: "6d6e8a5b-f7fb-4ea7-b118-102f04dbc933",
      dataCollectionId: "News",
      data: {
        subCategory: ["Results"],
        "link-news-richtext": "/news/",
        _id: "6d6e8a5b-f7fb-4ea7-b118-102f04dbc933",
        _owner: "c3e5d256-da24-4907-ba24-acc8565040cf",
        _createdDate: {
          $date: "2025-10-28T16:26:43.338Z",
        },
        abstract:
          "Orkla India has mobilized nearly Rs 500 crore from institutional investors through its anchor book ahead of its Rs 1,668-crore initial public offering. The IPO is an entirely offer-for-sale issue with a price band of Rs 695–730 per share.",
        "link-news-richtext-2":
          "/news/orkla-india-raises-rs-500-crore-from-anchor-investors-ahead-of-rs-1668-crore-ipo",
        _updatedDate: {
          $date: "2025-10-28T16:26:43.338Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["ORKLAINDIA"],
        boolean: false,
        date: "2025-10-28",
        subHeadline: "...",
        category: "Corporate",
        time: "21:56:00.000",
        richtext:
          "Orkla India Raises Rs 500 Crore from Anchor Investors Ahead of Rs 1668 Crore IPO",
      },
    },
    {
      id: "a9d98dc0-bd25-4633-bd36-d8011f414798",
      dataCollectionId: "News",
      data: {
        subCategory: ["Indian "],
        "link-news-richtext": "/news/",
        _id: "a9d98dc0-bd25-4633-bd36-d8011f414798",
        _owner: "53c6ce8d-4ecf-4b93-9ff2-d98c61b66649",
        _createdDate: {
          $date: "2025-10-28T10:09:34.789Z",
        },
        abstract:
          "Indian benchmarks slipped on Tuesday, as the NIFTY 50 dipped below 25,900 and the SENSEX dropped by over 300 points amid profit-taking and caution ahead of global policy cues.",
        "link-news-richtext-2":
          "/news/sensex-falls-below-25%2C900-mark-amid-profit-booking-on-october-28",
        _updatedDate: {
          $date: "2025-10-28T10:15:33.316Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["NSE: MARUTI, BOSCHLTD, ASHOKLEY, SBI, IOC"],
        date: "2025-10-28",
        subHeadline: "...",
        category: "Market ",
        time: "15:38:00.000",
        richtext:
          "Nifty falls below 25,900 mark amid profit-booking on October 28",
      },
    },
    {
      id: "f69e4cda-2148-4af9-adbe-41d00f5cef9a",
      dataCollectionId: "News",
      data: {
        subCategory: ["GLOBAL "],
        "link-news-richtext": "/news/",
        _id: "f69e4cda-2148-4af9-adbe-41d00f5cef9a",
        _owner: "53c6ce8d-4ecf-4b93-9ff2-d98c61b66649",
        _createdDate: {
          $date: "2025-10-28T10:04:07.624Z",
        },
        abstract:
          "Crude oil continued its downward trend for a third straight session as expectations of increased OPEC+ production outweighed positive sentiment around a potential U.S.–China trade agreement.",
        "link-news-richtext-2":
          "/news/oil-prices-decline-as-opec-plus-output-plans-overshadow-us-china-trade-optimism",
        _updatedDate: {
          $date: "2025-10-28T10:04:07.624Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["OIL, ONGC, RELIANCE, BPCL, HPCL, IOCL"],
        date: "2025-10-28",
        subHeadline: "...",
        category: "Market ",
        time: "15:32:00.000",
        richtext:
          "Oil prices decline as OPEC plus output plans overshadow US China trade optimism",
      },
    },
    {
      id: "5234b506-f152-4a64-a7fa-1ff572ef8cca",
      dataCollectionId: "News",
      data: {
        subCategory: ["Indian "],
        "link-news-richtext": "/news/",
        _id: "5234b506-f152-4a64-a7fa-1ff572ef8cca",
        _owner: "53c6ce8d-4ecf-4b93-9ff2-d98c61b66649",
        _createdDate: {
          $date: "2025-10-28T09:09:04.456Z",
        },
        abstract:
          "Institutional investment in India’s realty sector surged significantly in the July–September 2025 quarter, with co-investments by foreign and domestic firms reaching USD 726.58 million (6.6 × year-on-year), offsetting a steep 68% fall in direct foreign investment. ",
        "link-news-richtext-2":
          "/news/co-investment-by-foreign-and-local-companies-in-indian-real-estate-jumps-over-six-fold-to-usd-727-million-in-september-quarter",
        _updatedDate: {
          $date: "2025-10-28T09:09:04.456Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["(None)"],
        date: "2025-10-28",
        subHeadline: "...",
        category: "Market ",
        time: "14:38:00.000",
        richtext:
          "Co-investment by foreign and local companies in Indian real estate jumps over six-fold to USD 727 million in September quarter",
      },
    },
    {
      id: "df5c1d2c-21fd-46de-a107-b7be2283ec72",
      dataCollectionId: "News",
      data: {
        subCategory: ["Indian "],
        "link-news-richtext": "/news/",
        _id: "df5c1d2c-21fd-46de-a107-b7be2283ec72",
        _owner: "53c6ce8d-4ecf-4b93-9ff2-d98c61b66649",
        _createdDate: {
          $date: "2025-10-28T09:06:36.271Z",
        },
        abstract:
          "Marcellus Investment Managers’ Global Compounders Portfolio has crossed ₹300 crore in AUM after delivering 27.3% annualised returns since its launch in GIFT City, reflecting rising investor interest in offshore diversification.",
        "link-news-richtext-2":
          "/news/saurabh-mukherjea-global-compounders-fund-achieves-27-percent-cagr-over-three-years",
        _updatedDate: {
          $date: "2025-10-28T09:06:36.271Z",
        },
        "link-news-1-all": "/news-1/",
        company: ["(None)"],
        date: "2025-10-28",
        subHeadline: "...",
        category: "Market ",
        time: "14:35:00.000",
        richtext:
          "Saurabh Mukherjea Global Compounders Fund Achieves 27 Percent CAGR Over Three Years",
      },
    },
  ],
  pagingMetadata: {
    count: 7,
    offset: 0,
    tooManyToCount: false,
    cursors: {
      next: "...", // Truncated for brevity
    },
    hasNext: true,
  },
};
// --- End of Dummy Data ---

// --- Helper Functions ---
const getSlugFromLink = (linkValue: string | undefined): string | undefined => {
  if (!linkValue) return undefined;
  try {
    const parts = linkValue.split("/");
    const potentialSlug = parts.pop()?.trim();
    if (potentialSlug && potentialSlug.length > 0) {
      return potentialSlug;
    }
  } catch (e) {
    console.error("Error extracting slug", e);
  }
  return undefined;
};

const findNewsItemBySlug = (slug: string): NewsItem | undefined => {
  return dummyData.dataItems.find(
    (item) => getSlugFromLink(item.data["link-news-richtext-2"]) === slug
  );
};
// --- End of Helper Functions ---

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  console.log("generateMetadata slug:", slug);

  if (!slug) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  // Find item from dummy data
  const articleItem = findNewsItemBySlug(slug);

  if (!articleItem) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
  const article = articleItem.data;
  return {
    title: article.richtext,
    description: article.abstract,
  };
}

// Helper component for sidebar news items
const SidebarNewsItem: React.FC<{ item: NewsItem }> = ({ item }) => {
  // Use the helper function for consistency
  const slug = getSlugFromLink(item.data["link-news-richtext-2"]);

  if (!slug) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <LoadingLink
      href={`/news/${slug}`}
      className="block group mb-4 pb-4 border-b border-gray-200 last:border-b-0"
    >
      <h4
        className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors leading-snug mb-1 line-clamp-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {item.data.richtext}
      </h4>
      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={12} className="mr-1.5" />
        <span>{formatDate(item.data.date)}</span>
        <span className="mx-1.5">|</span>
        <Clock size={12} className="mr-1.5" />
        <span>{item.data.time.slice(0, 5)}</span>
      </div>
    </LoadingLink>
  );
};

// --- Main Page Component ---
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  console.log("NewsDetailPage slug:", slug);

  if (!slug) {
    notFound();
  }

  // --- Simulate Data Fetching ---
  const newsItem = findNewsItemBySlug(slug);
  const recentNews = dummyData; // All dummy data for the sidebar list
  // --- End of Simulation ---

  // Handle case where the main article isn't found
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

  // Filter out the current article from the recent news list
  const otherNews = recentNews.dataItems
    .filter((item) => item.id !== newsItem.id)
    .slice(0, 5); // Limit sidebar to 5 items

  return (
    <>
      {/* --- New Hero Section (UPDATED) --- */}
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

        {/* Hero Content (UPDATED) */}
        <div className="container mx-auto px-4 relative z-10">
          {/* 'mx-auto' REMOVED from this div to align content left */}
          <div className="max-w-4xl">
            {/* Category Badge */}
            <span
              className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-4 px-3 py-1 rounded"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              {article.category}
            </span>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
            >
              {article.richtext}
            </h1>

            {/* Meta Info & Action Buttons (UPDATED STRUCTURE) */}
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
              {/* Action Icons (Now below the date) */}
              <div className="flex items-center space-x-3">
                {" "}
                {/* Removed mt-4 sm:mt-0 */}
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
                <button
                  aria-label="Create Note"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                >
                  <FileText size={18} />
                </button>
                <button
                  aria-label="Bookmark"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                >
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Area (Two Columns) --- */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column: Article Body */}
            <main className="lg:w-2/3">
              <article>
                {/* Abstract/Intro */}
                <p
                  className="text-xl text-gray-700 mb-8 italic border-l-4 border-primary pl-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {article.abstract}
                </p>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none text-gray-800">
                  {article.subHeadline.split("\n\n").map(
                    (paragraph, index) =>
                      paragraph.trim() && (
                        <p
                          key={index}
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 400,
                          }}
                        >
                          {paragraph}
                        </p>
                      )
                  )}
                </div>

                {/* Related Companies */}
                {article.company && article.company[0] !== "(None)" && (
                  <footer className="mt-12 pt-6 border-t">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Related Companies:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.company[0]
                        .split(",")
                        .map((c) => c.trim())
                        .map((company, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {company}
                          </span>
                        ))}
                    </div>
                  </footer>
                )}
              </article>
            </main>

            {/* Right Column: Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3
                  className="text-xl font-bold text-primary mb-5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  More News
                </h3>
                <div>
                  {otherNews.length > 0 ? (
                    otherNews.map((item) => (
                      <SidebarNewsItem key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No other news available.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}