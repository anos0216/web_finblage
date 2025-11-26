// src/components/stock/FinancialsTabs.tsx
import React from 'react';
import { StockFinancialMap } from '@/types/stock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialsTable } from './FinancialsTable';

interface FinancialsTabsProps {
  financials: StockFinancialMap;
}

export const FinancialsTabs: React.FC<FinancialsTabsProps> = ({ financials }) => {
    console.log(financials)
  return (
    <Tabs defaultValue="income" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="income">Income Statement</TabsTrigger>
        <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
        <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
      </TabsList>
      <TabsContent value="income">
        <FinancialsTable title="Income Statement" statements={financials?.INC} />
      </TabsContent>
      <TabsContent value="balance">
        <FinancialsTable title="Balance Sheet" statements={financials?.BAL} />
      </TabsContent>
      <TabsContent value="cashflow">
        <FinancialsTable title="Cash Flow" statements={financials?.CAS} />
      </TabsContent>
    </Tabs>
  );
};