import React from 'react';
import { BarChart2 } from 'lucide-react';
import { UnifiedIpo } from '@/lib/market-data'; // Assuming financials type is on UnifiedIpo

// Placeholder for FinancialsChart
const FinancialsChart = ({ financials }: { financials: any }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600 h-full flex flex-col justify-center">
    <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
    <p className="mt-2 text-sm">Financials Bar Chart</p>
    <p className="text-xs text-gray-500">(Placeholder)</p>
  </div>
);

type FinancialData = NonNullable<UnifiedIpo['financials']>[number];

const IpoFinancials: React.FC<{ financials: FinancialData[] }> = ({ financials }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Financials (in ₹ Cr)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">PAT</th>
                <th className="px-4 py-3 text-right">EPS (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {financials.map((fin) => (
                <tr key={fin.period} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{fin.period}</td>
                  <td className="px-4 py-3 text-right">{fin.revenue?.toLocaleString('en-IN') || '-'}</td>
                  <td className="px-4 py-3 text-right">{fin.pat?.toLocaleString('en-IN') || '-'}</td>
                  <td className="px-4 py-3 text-right">{fin.eps?.toFixed(2) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Graph Placeholder */}
        <div>
          <FinancialsChart financials={financials} />
        </div>
      </div>
    </div>
  );
};

export default IpoFinancials;