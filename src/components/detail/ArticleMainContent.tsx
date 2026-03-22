import React from "react";
import { NewsItem, ArticleItem, RichTextNode } from "@/types/finblage"; 
import RichTextRenderer from "@/components/shared/RichTextRenderer"; 

interface ArticleMainContentProps {
  item: NewsItem | ArticleItem;
}

export const ArticleMainContent: React.FC<ArticleMainContentProps> = ({
  item,
}) => {
  const isNews = "richtext" in item.data;
  const data = item.data as any;

  // Check for glimpse, then glimpses
  const abstract = isNews ? data.abstract : data.glimpse ?? data.glimpses;
  
  // FIX: Added fallback to 'listBody' which matches the Merger Acquisition API structure
  const body = isNews ? data.subHeadline : (data.body || data.listBody);

  return (
    <main className="lg:w-2/3">
      <article>
        {/* Abstract/Intro */}
        {abstract && (
          <p
            className="text-lg text-gray-700 mb-8 border-l-4 border-primary pl-4"
            style={{ fontFamily: "var(--font-oxygen)", fontWeight: 400 }}
          >
            {abstract}
          </p>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {isNews && typeof body === "string" ? (
            // Render plain text for News if it's a string
            body
              .split("\n\n")
              .map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p
                      key={index}
                      style={{
                        fontFamily: "var(--font-oxygen)",
                        fontWeight: 400,
                      }}
                    >
                      {paragraph}
                    </p>
                  )
              )
          ) : body ? (
            // Render rich text for other Articles or if News body is rich text
            <RichTextRenderer content={body as RichTextNode} /> 
          ) : (
            // Fallback for missing body content
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </article>
    </main>
  );
};