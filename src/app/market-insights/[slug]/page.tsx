import React from 'react';
import { notFound } from 'next/navigation';
import { getMarketInsightItem } from '@/lib/dataService';
import Image from 'next/image';
import { formatWixImage } from '@/lib/utils';
import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { Calendar } from 'lucide-react';

// You can create similar pages for outlook, merger, etc., just by changing the data fetching function.
export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await getMarketInsightItem(slug);

  if (!response?.dataItem) {
    notFound();
  }

  const article = response.dataItem.data;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-gray-50 py-12">
      <main className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {article.image && (
          <div className="relative w-full h-64 md:h-96">
            <Image 
              src={formatWixImage(article.image)} 
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              priority // Prioritize loading the main image
            />
          </div>
        )}
        <article className="p-6 md:p-10">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(article.date ? article.date : article.coursePrice!)}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {/* Use the Rich Text Renderer to render the body */}
            <RichTextRenderer content={article.body} />
          </div>
        </article>
      </main>
    </div>
  );
}