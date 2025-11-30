"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
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
import { ArticleItem } from "@/types/finblage";

// --- Types ---
type DealStatus = "Completed" | "Pending" | "Announced" | "Rumor" | "Rejected";

interface MergerDeal {
  id: string;
  targetCompany: string;
  targetTicker?: string;
  acquirerCompany: string;
  acquirerTicker?: string;
  dealSize: string;
  status: DealStatus;
  fullStatusText?: string;
  date: string;
  sector: string;
}

// --- Helper: Parse HTML string from API ---
const extractFromHtml = (htmlString: string, key: string): string => {
  if (!htmlString) return "";
  const regex = new RegExp(`${key}\\s*:\\s*<\\/strong>\\s*([^<]+)`, "i");
  const match = htmlString.match(regex);
  if (match && match[1]) {
    return match[1].replace(/&nbsp;/g, ' ').trim();
  }
  return "";
};

// --- Helper: Clean Status Text ---
const cleanStatusText = (status: string): DealStatus => {
  if (!status) return "Pending";
  const clean = status.split(/[\(\:;,-]/)[0].replace(/&nbsp;/g, ' ').trim();
  return clean as DealStatus;
};

// --- Helper: Parse Title for Target/Acquirer ---
const parseTitle = (title: string) => {
  const patterns = [
    " Acquires ",
    " Completes Acquisition of ",
    " to Acquire ",
    " Merges with "
  ];
  for (const pattern of patterns) {
    if (title.includes(pattern)) {
      const parts = title.split(pattern);
      if (parts.length >= 2) {
        let target = parts[1].split(" for ")[0].split(",")[0].trim();
        return { acquirer: parts[0].trim(), target: target };
      }
    }
  }
  return { acquirer: "Undisclosed", target: title };
};

// --- Helper Components ---
const StatusBadge = ({ status }: { status: string }) => {
  let styleClass = "bg-gray-50 text-gray-700 border-gray-200";
  if (status.includes("Completed")) styleClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
  else if (status.includes("Pending")) styleClass = "bg-amber-50 text-amber-700 border-amber-200";
  else if (status.includes("Announced")) styleClass = "bg-blue-50 text-primary border-blue-200";
  else if (status.includes("Rumor")) styleClass = "bg-gray-100 text-gray-600 border-gray-200";
  else if (status.includes("Rejected")) styleClass = "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-[4px] text-[11px] uppercase tracking-wider font-bold border shadow-sm whitespace-nowrap truncate block max-w-full",
        styleClass
      )}
      style={{ fontFamily: 'var(--font-inter)' }}
      title={status}
    >
      {status}
    </span>
  );
};

const TableRowSkeleton = () => (
  <tr className="animate-pulse border-b border-gray-100">
    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-48 bg-gray-200 rounded mb-2"></div><div className="h-3 w-16 bg-gray-100 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-200 rounded mb-2"></div><div className="h-3 w-12 bg-gray-100 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full"></div></td>
    <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-gray-200 rounded ml-auto"></div></td>
  </tr>
);

interface MergerTableProps {
  searchTerm: string;
  realData?: ArticleItem[]; 
  isLoading: boolean;
  currentPage: number;
  hasNextPage: boolean;
}

export const MergerTable = ({ 
  searchTerm, 
  realData, 
  isLoading,
  currentPage,
  hasNextPage 
}: MergerTableProps) => {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{ key: keyof MergerDeal; direction: "asc" | "desc" } | null>(null);

  const data: MergerDeal[] = useMemo(() => {
    if (realData && realData.length > 0) {
      return realData.map((item, index) => {
        const d = item.data as any;
        const dealTypeHtml = d.dealType || "";
        const title = d.title || "";
        const extractedValue = extractFromHtml(dealTypeHtml, "Estimated Value");
        const rawStatus = extractFromHtml(dealTypeHtml, "Deal Status");
        const { acquirer, target } = parseTitle(title);
        const dummySectors = ["Industrial", "Technology", "Consumer Goods", "Energy", "Financials"];
        const dummyTickers = ["NSE: TATA", "NSE: NUVOCO", "NSE: RELIANCE", "NSE: HDFC"];
        
        return {
          id: item.id,
          targetCompany: target,
          targetTicker: "", 
          acquirerCompany: acquirer,
          acquirerTicker: dummyTickers[index % dummyTickers.length], 
          dealSize: extractedValue || "Undisclosed",
          status: cleanStatusText(rawStatus),
          date: d.date || new Date().toISOString(),
          sector: dummySectors[index % dummySectors.length], 
        };
      });
    }
    return [];
  }, [realData]);

  const handleSort = (key: keyof MergerDeal) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/merger-acquisition?page=${newPage}`, { scroll: false });
  };

  const processedData = useMemo(() => {
    let processed = [...data];
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(
        (deal) =>
          deal.targetCompany.toLowerCase().includes(lowerTerm) ||
          deal.acquirerCompany.toLowerCase().includes(lowerTerm) ||
          deal.sector.toLowerCase().includes(lowerTerm)
      );
    }
    if (sortConfig) {
      processed.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return processed;
  }, [data, searchTerm, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: keyof MergerDeal }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === "asc" ? <ArrowUp className="w-3 h-3 ml-1 text-accent" /> : <ArrowDown className="w-3 h-3 ml-1 text-accent" />;
  };

  const columns = [
    { label: "Announced Date", key: "date", width: "w-[12%]" },
    { label: "Target", key: "targetCompany", width: "w-[30%]" },
    { label: "Acquirer", key: "acquirerCompany", width: "w-[20%]" },
    { label: "Sector", key: "sector", width: "w-[10%]" },
    { label: "Deal Value", key: "dealSize", width: "w-[12%]" },
    { label: "Status", key: "status", width: "w-[10%]" },
    { label: "", key: "actions", width: "w-[6%]" },
  ];

  return (
    <div className="w-full space-y-4 font-sans">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left table-fixed min-w-[1000px]">
            <thead>
              <tr className="bg-primary text-white">
                {columns.map((col) => (
                  <th key={col.key} className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider select-none border-b border-white/10 truncate", col.width)} style={{ fontFamily: 'var(--font-inter)' }}>
                    {col.key !== "actions" ? (
                      <div className="flex items-center cursor-pointer group hover:text-accent transition-colors" onClick={() => handleSort(col.key as keyof MergerDeal)}>
                        {col.label}
                        <SortIcon columnKey={col.key as keyof MergerDeal} />
                      </div>
                    ) : <span className="sr-only">Actions</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : processedData.length > 0 ? (
                processedData.map((deal, index) => (
                  <tr key={deal.id} onClick={() => router.push(`/merger-acquisition/${deal.id}`)} className={cn("transition-colors group cursor-pointer", index % 2 === 0 ? "bg-white" : "bg-blue-50/20", "hover:bg-blue-50/60")}>
                    <td className="px-6 py-4 truncate">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-primary/40 flex-shrink-0" />
                        <span className="font-medium truncate" style={{ fontFamily: 'var(--font-inter)' }}>{new Date(deal.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-[15px] truncate block" style={{ fontFamily: 'var(--font-oxygen)' }}>{deal.targetCompany}</span>
                        {deal.targetTicker && <span className="text-[11px] text-gray-400 font-semibold tracking-wide truncate block">{deal.targetTicker}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700 truncate block" style={{ fontFamily: 'var(--font-oxygen)' }}>{deal.acquirerCompany}</span>
                        {deal.acquirerTicker && <span className="text-[11px] text-gray-400 font-medium truncate block">{deal.acquirerTicker}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 truncate"><span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200 truncate max-w-full">{deal.sector}</span></td>
                    <td className="px-6 py-4 truncate"><span className="font-mono font-bold text-primary text-sm truncate block" title={deal.dealSize}>{deal.dealSize}</span></td>
                    <td className="px-6 py-4 truncate"><StatusBadge status={deal.status} /></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-500 bg-gray-50/30"><p className="font-medium text-gray-600">No deals found.</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{!isLoading && <>Showing <span className="text-primary font-bold">{processedData.length}</span> deals</>}</p>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1 || isLoading} className="h-8 text-xs bg-white">Previous</Button>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={!hasNextPage || isLoading} className="h-8 text-xs text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Next</Button>
            </div>
        </div>
      </div>
    </div>
  );
};