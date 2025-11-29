import React from 'react';
// import { getMergerAcquisitions } from '@/lib/dataService'; // Not used for dummy table
// import Pagination from '@/components/shared/Pagination'; // Not used for dummy table
// import AnimatedArticleCard from '@/components/shared/AnimatedArticleCard'; // Removed
import ListHero from '@/components/shared/ListHero';
import { MergerTable } from '@/components/merger/MergerTable';

export default async function MergerAcquisitionPage() {
    // For now, we are using dummy data inside MergerTable, so we don't fetch from API
    // const { dataItems: articles, pagingMetadata } = await getMergerAcquisitions(page);

    return (
      <>
        <ListHero 
          title="Mergers & Acquisitions"
          subtitle="Real-time tracking of global M&A deals, corporate restructuring, and market consolidation events."
          showFilters={false} // Table has its own filters
        />
        <div className="bg-gray-50 min-h-screen">
            <main className="container mx-auto px-4 py-12">
                {/* The user requested the table to be below the hero section.
                   We embed the Client Component here.
                */}
                <div className="flex flex-col gap-6">
                    <MergerTable />
                </div>
            </main>
        </div>
      </>
    );
}