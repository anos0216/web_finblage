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
import {
  DollarSign,
  BarChart,
  FileText,
  Globe,
} from "lucide-react";

// Re-usable component for the animated number
const AnimatedNumber = ({ value }: { value: number }) => {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return <span>{formatted}</span>;
};

// Summary Card for FII/DII
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

// Historical Card
const HistoricalCard: React.FC<{
  item: HistoricalActivity;
  category: string;
}> = ({ item, category }) => {
  let leftData: ActivityData, rightData: ActivityData;
  let leftTitle: string, rightTitle: string;

  switch (category) {
    case "F&O":
      leftData = item.fiiFO;
      rightData = item.diiFO;
      leftTitle = "FII";
      rightTitle = "DII";
      break;
    case "FII SEBI":
      leftData = item.fiiSebiEquity;
      rightData = item.fiiSebiDebt;
      leftTitle = "Equity";
      rightTitle = "Debt";
      break;
    case "DII SEBI":
      leftData = item.diiSebiEquity;
      rightData = item.diiSebiDebt;
      leftTitle = "Equity";
      rightTitle = "Debt";
      break;
    default: // Cash
      leftData = item.fiiCash;
      rightData = item.diiCash;
      leftTitle = "FII";
      rightTitle = "DII";
  }

  const Col = ({ title, data }: { title: string; data: ActivityData }) => (
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
      <p className={cn("text-xs", data.net >= 0 ? "text-green-600" : "text-red-600")}>
        Net: <AnimatedNumber value={data.net} /> Cr
      </p>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-semibold text-primary mb-2">
        {item.dateLabel}
      </p>
      <div className="flex divide-x divide-gray-200">
        <div className="pr-4 w-1/2">
          <Col title={leftTitle} data={leftData} />
        </div>
        <div className="pl-4 w-1/2">
          <Col title={rightTitle} data={rightData} />
        </div>
      </div>
    </div>
  );
};

const FilterButton: React.FC<{
  label: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ label, onClick, isActive }) => (
  <Button
    variant="ghost"
    onClick={onClick}
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

interface FiiDiiWidgetProps {
  data: {
    summary: FiiDiiSummary;
    daily: HistoricalActivity[];
    monthly: HistoricalActivity[];
  };
}

const FiiDiiWidget: React.FC<FiiDiiWidgetProps> = ({ data }) => {
  const { summary, daily, monthly } = data;

  const [summaryCat, setSummaryCat] = useState<
    "Cash" | "F&O" | "FII SEBI" | "DII SEBI"
  >("Cash");
  const [histPeriod, setHistPeriod] = useState<"Daily" | "Monthly">("Daily");
  const [histCat, setHistCat] = useState<
    "Cash" | "F&O" | "FII SEBI" | "DII SEBI"
  >("Cash");

  const summaryData = summary[summaryCat];
  const histData = histPeriod === "Daily" ? daily : monthly;

  return (
    <Card>
      <CardHeader>
        <CardTitle>FII & DII Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Section */}
        <section>
          <div className="flex space-x-1 sm:space-x-2 bg-gray-100 p-1 rounded-lg mb-4">
            <FilterButton
              label="Cash"
              onClick={() => setSummaryCat("Cash")}
              isActive={summaryCat === "Cash"}
            />
            <FilterButton
              label="F&O"
              onClick={() => setSummaryCat("F&O")}
              isActive={summaryCat === "F&O"}
            />
            <FilterButton
              label="FII SEBI"
              onClick={() => setSummaryCat("FII SEBI")}
              isActive={summaryCat === "FII SEBI"}
            />
            <FilterButton
              label="DII SEBI"
              onClick={() => setSummaryCat("DII SEBI")}
              isActive={summaryCat === "DII SEBI"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {summaryCat === "Cash" || summaryCat === "F&O" ? (
              <>
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
              </>
            ) : (
              <>
                <ParticipantCard
                  title={`${summaryCat} (Equity)`}
                  data={(summaryData as any).equity}
                  icon={BarChart}
                  iconColor="text-purple-600"
                />
                <ParticipantCard
                  title={`${summaryCat} (Debt)`}
                  data={(summaryData as any).debt}
                  icon={DollarSign}
                  iconColor="text-teal-600"
                />
              </>
            )}
          </div>
        </section>

        {/* Historical Section */}
        <section>
          <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-1 rounded-lg mb-4">
            <div className="flex flex-1 space-x-1">
              <FilterButton
                label="Daily"
                onClick={() => setHistPeriod("Daily")}
                isActive={histPeriod === "Daily"}
              />
              <FilterButton
                label="Monthly"
                onClick={() => setHistPeriod("Monthly")}
                isActive={histPeriod === "Monthly"}
              />
            </div>
            <div className="flex flex-1 space-x-1">
              <FilterButton
                label="Cash"
                onClick={() => setHistCat("Cash")}
                isActive={histCat === "Cash"}
              />
              <FilterButton
                label="F&O"
                onClick={() => setHistCat("F&O")}
                isActive={histCat === "F&O"}
              />
            </div>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {histData.map((item) => (
              <HistoricalCard
                key={item.dateLabel}
                item={item}
                category={histCat}
              />
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default FiiDiiWidget;