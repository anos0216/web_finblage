// src/app/stock/tcs/page.tsx

import fs from 'fs/promises';
import path from 'path';
import { StockData, StockPeer } from '@/types/stock';
import { notFound } from 'next/navigation';

// Import our new reusable components
import { StockHeader } from '@/components/stock/StockHeader';
import { StockKeyMetrics } from '@/components/stock/StockKeyMetrics';
import { CompanyProfile } from '@/components/stock/CompanyProfile';
import { FinancialsTabs } from '@/components/stock/FinancialTabs';
import { PeerComparison } from '@/components/stock/PeerComparison';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Reads and parses the stock data JSON from the server's file system.
 * This function runs ONLY on the server.
 */
async function getTcsStockData(): Promise<StockData> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tcs-stock-data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');

    const data = JSON.parse(fileContents);

    return data as StockData;
  } catch (error) {
    console.error("Failed to read stock data file:", error);
    // In a real app, you might have more robust error handling
    throw new Error(`this is the ${error}`);
  }
}

/**
 * This is the main server component for the stock page.
 * It fetches data on the server and passes it to client components.
 */
export default async function TcsStockPage() {
  const data = await getTcsStockData();

  if (!data) {
    notFound(); // Triggers the 404 page if data loading fails
  }

  // The first item in the peer list is the main company (TCS)
  const tcsData = data.companyProfile.peerCompanyList[0] as StockPeer;

  if (!tcsData) {
    notFound(); // No main company data
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 space-y-8">
        
        {/* 1. Header Section */}
        <StockHeader 
          companyName={data.companyName}
          ticker={data.companyProfile.exchangeCodeNse}
          exchange="NSE"
          currentPrice={tcsData.price}
          netChange={tcsData.netChange}
          percentChange={tcsData.percentChange}
        />
        
        {/* 2. Key Metrics */}
        <StockKeyMetrics companyData={tcsData} />

        {/* 3. Main Content (Overview, Financials, Peers) */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="peers">Peer Comparison</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <CompanyProfile 
              description={data.companyProfile.companyDescription}
              officers={data.companyProfile.officers.officer}
            />
          </TabsContent>
          
          {/* Financials Tab */}
          <TabsContent value="financials" className="mt-6">
            <FinancialsTabs 
              financials={data.financials.stockFinancialMap} 
            />
          </TabsContent>

          {/* Peer Comparison Tab */}
          <TabsContent value="peers" className="mt-6">
            <PeerComparison 
              peers={data.companyProfile.peerCompanyList} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}