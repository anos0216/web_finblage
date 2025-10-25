import React from 'react';
import { notFound } from 'next/navigation';
// FIX: Import the correct data fetching function
import { getSpotlightItem } from '@/lib/dataService';
import Image from 'next/image';
import { formatWixImage } from '@/lib/utils';
import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { Calendar } from 'lucide-react';

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // FIX: Call the correct data fetching function for this page
  const response = await getSpotlightItem(slug);

  if (!response?.dataItem) {
    notFound();
  }

  const article = response.dataItem.data;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  // For spotlight, the date is in the 'coursePrice' field
  const dateValue = article.coursePrice || article.date;

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
              priority
            />
          </div>
        )}
        <article className="p-6 md:p-10">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">
              {article.title}
            </h1>
            {dateValue && (
               <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(dateValue)}</span>
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <RichTextRenderer content={article.body} />
          </div>
        </article>
      </main>
    </div>
  );
}