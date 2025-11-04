// src/components/detail/MarketOutlookRichText.tsx
"use client";

import React from "react";
import Image from "next/image";
import { RichTextNode, Node, TextNode } from "@/types/finblage";
import { formatWixImage } from "@/lib/utils";

// Helper: Renders text nodes (bold, italic, etc.)
const TextRenderer: React.FC<{ nodes: TextNode[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, index) => {
        let content: React.ReactNode = node.textData.text;

        node.textData.decorations.forEach((deco) => {
          if (deco.type === "BOLD") {
            content = <strong>{content}</strong>;
          } else if (deco.type === "ITALIC") {
            content = <em>{content}</em>;
          } else if (deco.type === "UNDERLINE") {
            content = <u>{content}</u>;
          } else if (deco.type === "LINK" && deco.linkData?.link.url) {
            content = (
              <a
                href={deco.linkData.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {content}
              </a>
            );
          }
        });

        return <React.Fragment key={node.id || index}>{content}</React.Fragment>;
      })}
    </>
  );
};

// Helper: Renders a single node (paragraph, heading, etc.)
const NodeRenderer: React.FC<{ node: Node }> = ({ node }) => {
  const children = node.nodes && (
    <NodeList nodes={node.nodes as (Node | TextNode)[]} />
  );

  switch (node.type) {
    case "HEADING":
      const level = Math.max(1, Math.min(6, node.headingData?.level ?? 2));
      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

      const tagClasses = {
        h2: "text-3xl font-bold mt-8 mb-4 text-primary",
        h3: "text-2xl font-bold mt-6 mb-3 text-primary",
        h4: "text-xl font-semibold mt-6 mb-3 text-gray-800",
        h5: "text-lg font-semibold mt-4 mb-2 text-gray-800",
        h6: "text-base font-semibold mt-4 mb-2 text-gray-700",
      };

      return (
        <Tag
          className={tagClasses[Tag as keyof typeof tagClasses] || tagClasses.h6}
        >
          {children}
        </Tag>
      );

    case "PARAGRAPH":
      return (
        <p className="mb-6 text-lg leading-relaxed text-text-secondary">
          {children}
        </p>
      );
    case "BULLETED_LIST":
      return (
        <ul className="list-disc list-inside mb-6 pl-4 space-y-2 text-lg text-text-secondary">
          {children}
        </ul>
      );
    case "LIST_ITEM":
      return <li className="mb-2">{children}</li>;
    case "IMAGE":
      if (!node.imageData?.image.src.id) return null;
      return (
        <div className="my-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={formatWixImage(node.imageData.image.src.id)}
              alt={node.imageData.caption || "Article Image"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {node.imageData.caption && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">
              {node.imageData.caption}
            </p>
          )}
        </div>
      );
    case "HTML":
      return (
        <div
          className="my-6"
          dangerouslySetInnerHTML={{ __html: node.htmlData?.html || "" }}
        />
      );
    default:
      return <>{children}</>;
  }
};

const NodeList: React.FC<{ nodes: (Node | TextNode)[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "TEXT") {
          return (
            <TextRenderer key={node.id || index} nodes={[node as TextNode]} />
          );
        }
        return <NodeRenderer key={node.id || index} node={node as Node} />;
      })}
    </>
  );
};

// --- Filtering Logic ---

// Helper to get text from a heading node
const extractHeadingText = (node: Node): string => {
  if (node.type !== "HEADING" || !node.nodes) return "";
  return (node.nodes as TextNode[])
    .filter((n) => n.type === "TEXT")
    .map((n) => n.textData.text)
    .join(" ")
    .trim();
};

const ALLOWED_HEADINGS = [
  "Market Wrap",
  "What's Ahead",
  "Technical Outlook",
];

// Headings that *stop* the rendering of a section
const FORBIDDEN_HEADINGS = [
  "Market Snapshots",
  "Institiutional Activity", // Typo from data
  "Institutional Activity", // Correct spelling
  "Sectoral Performance",
];

// --- Main Component ---
const MarketOutlookRichText: React.FC<{ content: RichTextNode }> = ({
  content,
}) => {
  if (!content || !content.nodes) return null;

  let isSectionAllowed = true; // Allow content before the first specified heading
  const filteredNodes: Node[] = [];

  for (const node of content.nodes as Node[]) {
    if (node.type === "HEADING") {
      const headingText = extractHeadingText(node);

      // Check if this heading starts a forbidden section
      if (FORBIDDEN_HEADINGS.includes(headingText)) {
        isSectionAllowed = false;
      }
      // Check if this heading starts an allowed section
      else if (ALLOWED_HEADINGS.includes(headingText)) {
        isSectionAllowed = true;
      }
      // If the heading is neither, it continues under the previous section's rule
    }

    if (isSectionAllowed) {
      filteredNodes.push(node);
    }
  }

  // Render only the filtered nodes
  return <NodeList nodes={filteredNodes} />;
};

export default MarketOutlookRichText;