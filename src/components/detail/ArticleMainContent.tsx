import React from "react";
import { NewsItem, ArticleItem } from "@/types/finblage"; //
import RichTextRenderer from "@/components/shared/RichTextRenderer"; //

interface ArticleMainContentProps {
  item: NewsItem | ArticleItem;
}

export const ArticleMainContent: React.FC<ArticleMainContentProps> = ({
  item,
}) => {
  const isNews = "richtext" in item.data;
  const data = item.data as any;

  // FIX: Check for glimpse first, then fall back to glimpses
  const abstract = isNews ? data.abstract : data.glimpse ?? data.glimpses;
  const body = isNews ? data.subHeadline : data.body;

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
          {isNews ? (
            // Render plain text for News
            (body as string)
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
          ) : (
            // Render rich text for other Articles
            <RichTextRenderer content={body} /> //
          )}
        </div>
      </article>
    </main>
  );
};