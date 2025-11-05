// src/components/detail/FiiDiiWidget.tsx
"use client";

import React, { useState } from "react";
import {
  FiiDiiSummary,
  HistoricalActivity,
  ActivityData,
} from "@/lib/market-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {  FileText, Globe } from "lucide-react";
import {
  BarChart as RechartsBarChart, // Renamed to avoid conflict
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Sub-components (AnimatedNumber, ParticipantCard, FilterButton) ---

const AnimatedNumber = ({ value }: { value: number }) => {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return <span>{formatted}</span>;
};

const ParticipantCard: React.FC<{
  title: string;
  data: ActivityData;
  icon: React.ElementType;
  iconColor: string;
}> = ({ title, data, icon: Icon, iconColor }) => {
  const netColor = data.net >= 0 ? "text-green-600" : "text-red-600";

  const Row = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color?: string;
  }) => (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600">{label}</span>
      <span className={cn("font-semibold", color || "text-gray-900")}>
        <AnimatedNumber value={value} /> Cr
      </span>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn("w-5 h-5", iconColor)} />
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">
        <Row label="Buy Value" value={data.buy} />
        <Row label="Sell Value" value={data.sell} />
        <Row label="Net Value" value={data.net} color={netColor} />
      </div>
    </div>
  );
};

const FilterButton: React.FC<{
  label: string;

  isActive: boolean;
}> = ({ label, isActive }) => (
  <Button
    variant="ghost"
    className={cn(
      "flex-1 text-xs sm:text-sm font-medium h-9",
      isActive
        ? "bg-primary text-white hover:bg-primary/90"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    )}
  >
    {label}
  </Button>
);

// --- NEW: Bar Chart Component ---
const DataFormatter = (number: number) => {
  if (Math.abs(number) > 1000) {
    return (number / 1000).toString() + "k";
  }
  return number.toString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-lg">
        <p className="font-semibold text-sm text-gray-800">{label}</p>
        <p className="text-xs text-green-600">
          DII Net: {payload[0].value.toLocaleString("en-IN")} Cr
        </p>
        <p className="text-xs text-blue-600">
          FII Net: {payload[1].value.toLocaleString("en-IN")} Cr
        </p>
      </div>
    );
  }
  return null;
};

const HistoricalBarChart: React.FC<{ data: HistoricalActivity[] }> = ({
  data,
}) => {
  const chartData = data
    .map((item) => ({
      date: item.dateLabel.split(",")[0], // "Oct 29, 2025" -> "Oct 29"
      diiNet: parseFloat(item.diiCash.net.toFixed(2)),
      fiiNet: parseFloat(item.fiiCash.net.toFixed(2)),
    }))
    .reverse(); // Show from earliest to latest

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} tickFormatter={DataFormatter} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "14px" }} />
          <Bar dataKey="diiNet" fill="#10b981" name="DII Net" />
          <Bar dataKey="fiiNet" fill="#3b82f6" name="FII Net" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};



// --- Main Widget Component ---
interface FiiDiiWidgetProps {
  data: {
    summary: FiiDiiSummary;
    daily: HistoricalActivity[];
    monthly: HistoricalActivity[];
  };
}

const FiiDiiWidget: React.FC<FiiDiiWidgetProps> = ({ data }) => {
  const { summary, daily, } = data;

  const [summaryCat, setSummaryCat] = useState<"Cash" | "F&O">("Cash");

  const summaryData = summary[summaryCat];

  return (
    <Card>
      <CardHeader>
        <CardTitle>FII & DII Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Section */}
        <section>
          <div className="grid grid-cols-1 gap-4">
            <ParticipantCard
              title="Foreign Investors (FII)"
              data={(summaryData as any).fii}
              icon={Globe}
              iconColor="text-blue-600"
            />
            <ParticipantCard
              title="Domestic Investors (DII)"
              data={(summaryData as any).dii}
              icon={FileText}
              iconColor="text-orange-600"
            />
          </div>
        </section>

        {/* Historical Section */}
        <section>
          <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-1 rounded-lg mb-4">
            <FilterButton label="Last 5 Days" isActive={true} />
          </div>
          <div className="space-y-4">
            <HistoricalBarChart data={daily} />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default FiiDiiWidget;
