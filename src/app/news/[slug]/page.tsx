import React from 'react';
import { notFound } from 'next/navigation';
import { getNewsItem } from '@/lib/dataService';
import { Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next'; // 1. Import Metadata

// 2. Add generateMetadata function
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const response = await getNewsItem(slug);

  if (!response?.dataItem) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist."
    }
  }

  const article = response.dataItem.data;

  return {
    title: article.richtext, // Set the page title to the article headline
    description: article.abstract, // Set the page description to the article abstract
  };
}

// 3. Your page component remains unchanged
export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await getNewsItem(slug);

  if (!response?.dataItem) {
    notFound(); // Triggers the not-found.tsx page if the article isn't found
  }

  const article = response.dataItem.data;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white py-12">
      <main className="max-w-4xl mx-auto px-4">
        <article>
          <header className="mb-8 border-b pb-6">
            <p className="text-primary font-semibold mb-2">{article.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {article.richtext}
            </h1>
            <p className="text-xl text-gray-600">{article.abstract}</p>
            <div className="flex items-center text-gray-500 text-sm mt-4 space-x-4">
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /><span>{formatDate(article.date)}</span></div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /><span>{article.time.slice(0, 5)}</span></div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-gray-800">
            {/* The 'subHeadline' field contains the full article body for news items */}
            {article.subHeadline.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {article.company && article.company[0] !== '(None)' && (
            <footer className="mt-12 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Companies:</h3>
              <div className="flex flex-wrap gap-2">
                {article.company[0].split(',').map(c => c.trim()).map((company, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">{company}</span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </main>
    </div>
  );
}