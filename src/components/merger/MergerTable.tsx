"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
type DealStatus = "Completed" | "Pending" | "Announced" | "Rumor" | "Rejected";

interface MergerDeal {
  id: string;
  targetCompany: string;
  targetTicker?: string;
  acquirerCompany: string;
  acquirerTicker?: string;
  dealSize: number; // in Billions
  dealCurrency: string;
  status: DealStatus;
  date: string;
  sector: string;
}

// --- Dummy Data ---
const DUMMY_DEALS: MergerDeal[] = [
  {
    id: "1",
    targetCompany: "OmniGene Pharmaceuticals",
    targetTicker: "OMNI",
    acquirerCompany: "HealthStream Inc.",
    acquirerTicker: "HSTM",
    dealSize: 45.2,
    dealCurrency: "$",
    status: "Pending",
    date: "2025-11-28",
    sector: "Healthcare",
  },
  {
    id: "2",
    targetCompany: "Cyber Fortress Ltd.",
    targetTicker: "CYBR",
    acquirerCompany: "TechTitan Corp.",
    acquirerTicker: "TTN",
    dealSize: 12.8,
    dealCurrency: "$",
    status: "Completed",
    date: "2025-11-15",
    sector: "Technology",
  },
  {
    id: "3",
    targetCompany: "GreenEnergy Power",
    targetTicker: "GEP",
    acquirerCompany: "Global Grid Infra",
    acquirerTicker: "GGI",
    dealSize: 8.5,
    dealCurrency: "$",
    status: "Announced",
    date: "2025-11-10",
    sector: "Energy",
  },
  {
    id: "4",
    targetCompany: "Skyline Logistics",
    targetTicker: "SKYL",
    acquirerCompany: "Oceanic Transport",
    acquirerTicker: "OCN",
    dealSize: 3.2,
    dealCurrency: "$",
    status: "Completed",
    date: "2025-10-30",
    sector: "Industrials",
  },
  {
    id: "5",
    targetCompany: "FinTech Nova",
    targetTicker: "FTN",
    acquirerCompany: "SecureBank Group",
    acquirerTicker: "SBG",
    dealSize: 22.0,
    dealCurrency: "$",
    status: "Pending",
    date: "2025-10-25",
    sector: "Financials",
  },
  {
    id: "6",
    targetCompany: "Retail Giant Co.",
    targetTicker: "RTG",
    acquirerCompany: "E-Comm Holdings",
    acquirerTicker: "ECH",
    dealSize: 6.4,
    dealCurrency: "€",
    status: "Rumor",
    date: "2025-10-20",
    sector: "Consumer",
  },
  {
    id: "7",
    targetCompany: "AeroDynamics Systems",
    targetTicker: "ADS",
    acquirerCompany: "Defense Prime Inc.",
    acquirerTicker: "DPI",
    dealSize: 18.9,
    dealCurrency: "$",
    status: "Rejected",
    date: "2025-10-15",
    sector: "Defense",
  },
  {
    id: "8",
    targetCompany: "Quantum Compute",
    targetTicker: "QCOM",
    acquirerCompany: "Silicon Valley Chips",
    acquirerTicker: "SVC",
    dealSize: 2.1,
    dealCurrency: "$",
    status: "Completed",
    date: "2025-10-05",
    sector: "Technology",
  },
  {
    id: "9",
    targetCompany: "Urban Real Estate",
    targetTicker: "URE",
    acquirerCompany: "Metropolis Devs",
    acquirerTicker: "MTD",
    dealSize: 5.6,
    dealCurrency: "$",
    status: "Announced",
    date: "2025-09-28",
    sector: "Real Estate",
  },
  {
    id: "10",
    targetCompany: "BioSynthetics",
    targetTicker: "BIOS",
    acquirerCompany: "PharmaPlus",
    acquirerTicker: "PPLS",
    dealSize: 1.8,
    dealCurrency: "$",
    status: "Pending",
    date: "2025-09-20",
    sector: "Healthcare",
  },
];

// --- Helper Components ---

const StatusBadge = ({ status }: { status: DealStatus }) => {
  // Using primary color logic for badges to keep it cohesive but distinct
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200", 
    Pending: "bg-amber-50 text-amber-700 border-amber-200", 
    Announced: "bg-blue-50 text-primary border-blue-200", 
    Rumor: "bg-gray-100 text-gray-600 border-gray-200", 
    Rejected: "bg-red-50 text-red-700 border-red-200", 
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-[4px] text-[11px] uppercase tracking-wider font-bold border shadow-sm",
        styles[status]
      )}
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {status}
    </span>
  );
};

// --- Main Component ---

export const MergerTable = () => {
  const [data] = useState<MergerDeal[]>(DUMMY_DEALS);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MergerDeal;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Sorting
  const handleSort = (key: keyof MergerDeal) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Derived Data (Filtered & Sorted)
  const processedData = useMemo(() => {
    let processed = [...data];

    // Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(
        (deal) =>
          deal.targetCompany.toLowerCase().includes(lowerTerm) ||
          deal.acquirerCompany.toLowerCase().includes(lowerTerm) ||
          deal.targetTicker?.toLowerCase().includes(lowerTerm) ||
          deal.sector.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    if (sortConfig) {
      processed.sort((a, b) => {
        if (a[sortConfig.key]! < b[sortConfig.key]!)
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key]! > b[sortConfig.key]!)
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return processed;
  }, [data, searchTerm, sortConfig]);

  // Render Sort Icon
  const SortIcon = ({ columnKey }: { columnKey: keyof MergerDeal }) => {
    if (sortConfig?.key !== columnKey)
      return <ArrowUpDown className="w-3 h-3 ml-1 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-3 h-3 ml-1 text-accent" /> // Using accent color for active sort
    ) : (
      <ArrowDown className="w-3 h-3 ml-1 text-accent" />
    );
  };

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Toolbar - Softened background using a tint of primary color */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-blue-200/50 p-4 rounded-lg border border-blue-100/50">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
          <input
            type="text"
            placeholder="Search deal, company or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-blue-100 bg-white text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all shadow-sm"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 text-primary bg-white border-blue-100 hover:bg-primary hover:text-white shadow-sm transition-all duration-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="h-10 text-primary bg-white border-blue-100 hover:bg-primary hover:text-white shadow-sm transition-all duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Container - Removed stark white, added soft border */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* Header - DARK PRIMARY BACKGROUND for reduced glare and better contrast */}
            <thead>
              <tr className="bg-primary text-white">
                {[
                  { label: "Announced Date", key: "date" },
                  { label: "Target", key: "targetCompany" },
                  { label: "Acquirer", key: "acquirerCompany" },
                  { label: "Sector", key: "sector" },
                  { label: "Deal Value", key: "dealSize" },
                  { label: "Status", key: "status" },
                  { label: "", key: "actions" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider select-none border-b border-white/10"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {col.key !== "actions" ? (
                      <div
                        className="flex items-center cursor-pointer group hover:text-accent transition-colors"
                        onClick={() => handleSort(col.key as keyof MergerDeal)}
                      >
                        {col.label}
                        {/* Custom white sort icon for header */}
                         {sortConfig?.key !== col.key ? (
                             <ArrowUpDown className="w-3 h-3 ml-1 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                         ) : sortConfig.direction === "asc" ? (
                             <ArrowUp className="w-3 h-3 ml-1 text-accent" />
                         ) : (
                             <ArrowDown className="w-3 h-3 ml-1 text-accent" />
                         )}
                      </div>
                    ) : (
                      <span className="sr-only">Actions</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body - Alternating rows (zebra) with very subtle primary tint */}
            <tbody className="divide-y divide-gray-100">
              {processedData.length > 0 ? (
                processedData.map((deal, index) => (
                  <tr
                    key={deal.id}
                    className={cn(
                        "transition-colors group cursor-default",
                        index % 2 === 0 ? "bg-white" : "bg-blue-50/20", // Zebra striping
                        "hover:bg-blue-50/60" // Hover state
                    )}
                  >
                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-primary/40" />
                        <span className="font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                            {new Date(deal.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                      </div>
                    </td>

                    {/* Target */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-[15px]" style={{ fontFamily: 'var(--font-oxygen)' }}>
                          {deal.targetCompany}
                        </span>
                        {deal.targetTicker && (
                          <span className="text-[11px] text-gray-400 font-semibold tracking-wide">
                            {deal.targetTicker}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Acquirer */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700" style={{ fontFamily: 'var(--font-oxygen)' }}>
                          {deal.acquirerCompany}
                        </span>
                        {deal.acquirerTicker && (
                          <span className="text-[11px] text-gray-400 font-medium">
                            {deal.acquirerTicker}
                          </span>
                        )}
                      </div>
                    </td>

                     {/* Sector */}
                    <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200">
                            {deal.sector}
                         </span>
                    </td>

                    {/* Deal Size */}
                    <td className="px-6 py-4">
                        <span className="font-mono font-bold text-primary text-base">
                            {deal.dealCurrency}{deal.dealSize.toFixed(1)}B
                        </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={deal.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-blue-200/50"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 border-blue-100">
                          <DropdownMenuItem className="cursor-pointer text-gray-700 focus:text-primary focus:bg-blue-50">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-gray-700 focus:text-primary focus:bg-blue-50">Company Profile</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-gray-700 focus:text-primary focus:bg-blue-50">Related News</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-gray-500 bg-gray-50/30"
                  >
                    <div className="flex flex-col items-center justify-center">
                        <Search className="w-10 h-10 text-gray-300 mb-3" />
                        <p className="font-medium text-gray-600">No deals found matching your search.</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                Showing <span className="text-primary font-bold">{processedData.length}</span> of <span className="text-primary font-bold">{data.length}</span> deals
            </p>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 text-xs font-medium border-gray-200 text-gray-400 bg-white">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-gray-200 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Next</Button>
            </div>
        </div>
      </div>
    </div>
  );
};