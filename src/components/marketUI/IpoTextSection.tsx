import React from 'react';
import { CheckCircle } from 'lucide-react';

interface IpoTextSectionProps {
  title: string;
  points: string[] | undefined;
}

const IpoTextSection: React.FC<IpoTextSectionProps> = ({ title, points }) => {
  if (!points || points.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IpoTextSection;  