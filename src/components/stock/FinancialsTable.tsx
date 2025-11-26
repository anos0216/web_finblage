// src/components/stock/FinancialsTable.tsx
import React from 'react';
import { FinancialStatement, FinancialField } from '@/types/stock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FinancialsTableProps {
  title: string;
  statements: FinancialStatement[];
}

// Helper to format large numbers
const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return 'N/A';
  // Assuming values are in INR, not millions
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

export const FinancialsTable: React.FC<FinancialsTableProps> = ({ title, statements }) => {
  if (!statements || statements.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent><p>No data available.</p></CardContent>
      </Card>
    );
  }

  // We need to pivot the data.
  // Get years as columns (reverse to show most recent first)
  const years = statements.map(s => s.FiscalYear).reverse();
  
  // Get financial metrics as rows (from the most recent statement)
  const fields = statements[0].fields.map(f => ({ 
    key: f.key, 
    displayName: f.displayName 
  }));

  // Create a fast lookup map: { "2025" => FinancialStatement, ... }
  const statementMap = new Map(statements.map(s => [s.FiscalYear, s]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} (Annual)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Metric</th>
              {years.map(year => (
                <th key={year} className="py-3 px-4 text-right font-semibold text-gray-600">
                  FY {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">
                  {field.displayName}
                </td>
                {years.map(year => {
                  const statement = statementMap.get(year);
                  const value = statement?.fields.find(f => f.key === field.key)?.value;
                  return (
                    <td key={`${field.key}-${year}`} className="py-3 px-4 text-right text-gray-700">
                      {formatCurrency(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};