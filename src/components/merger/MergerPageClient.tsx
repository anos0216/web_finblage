"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ListHero from '@/components/shared/ListHero';
import { MergerTable } from '@/components/merger/MergerTable';
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { getMergerAcquisitions } from '@/lib/dataService'; 
import { ArticleItem } from '@/types/finblage';

export default function MergerPageClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mergers, setMergers] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  
  const searchParams = useSearchParams();
  
  // FIX: Default to 1 instead of 0. 
  // If the API treats 0 and 1 as the same, starting at 1 ensures 
  // the "Next" button goes to 2 (new data) immediately.
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getMergerAcquisitions(page);
        setMergers(response.dataItems || []);
        setHasNextPage(response.pagingMetadata?.hasNext ?? false);
      } catch (error) {
        console.error("Error fetching merger data:", error);
        setMergers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <ListHero 
        title="Mergers & Acquisitions"
        subtitle="Real-time tracking of global M&A deals, corporate restructuring, and market consolidation events."
        onSearch={setSearchTerm}
        searchPlaceholder="Search deal, company or sector..."
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="h-11 text-primary bg-white border-blue-100 hover:bg-primary hover:text-white shadow-sm transition-all duration-200"
        >
            <Filter className="w-4 h-4 mr-2" />
            Filters
        </Button>
      </ListHero>

      <div className="bg-gray-50 min-h-screen">
          <main className="container mx-auto px-4 py-12">
              <div className="flex flex-col gap-6">
                  <MergerTable 
                    searchTerm={searchTerm} 
                    realData={mergers} 
                    isLoading={isLoading}
                    currentPage={page}
                    hasNextPage={hasNextPage}
                  />
              </div>
          </main>
      </div>
    </>
  );
}