"use client"; // Recharts requires this

import React from 'react';
import { UnifiedIpo, IpoFinancial } from '@/lib/market-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Formatter for large numbers on the Y-axis
const DataFormatter = (number: number) => {
  if(number > 1000000000){
    return (number/1000000000).toString() + 'B';
  } else if(number > 1000000){
    return (number/1000000).toString() + 'M';
  } else if(number > 1000){
    return (number/1000).toString() + 'K';
  } else {
    return number.toString();
  }
}

const IpoFinancials: React.FC<{ financials: IpoFinancial[] }> = ({ financials }) => {
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

        {/* Right Side: Graph */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={financials}
              margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="period" fontSize={12} />
              <YAxis 
                fontSize={12} 
                tickFormatter={DataFormatter}
                label={{ value: 'Amount (in ₹ Cr)', angle: -90, position: 'insideLeft', offset: 0, style: {fontSize: '12px', fill: '#6b7280'} }}
              />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString('en-IN'), null]}
                labelStyle={{ color: '#000' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="pat" fill="#22c55e" name="Profit After Tax (PAT)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IpoFinancials;