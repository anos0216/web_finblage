// src/components/stock/CompanyProfile.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockOfficer } from '@/types/stock';

interface CompanyProfileProps {
  description: string;
  officers: StockOfficer[];
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ description, officers }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>About Company</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Key Executives</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {officers.slice(0, 5).map((officer) => ( // Show top 5
            <div key={officer.rank}>
              <p className="font-semibold text-gray-800">
                {officer.firstName} {officer.lastName}
              </p>
              <p className="text-sm text-gray-500">{officer.title.Value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};