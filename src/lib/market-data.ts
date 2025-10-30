// src/lib/market-data.ts

// --- OVERVIEW TAB DATA ---
export interface StockData {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface TrendingStocks {
  topGainers: StockData[];
  topLosers: StockData[];
  priceShockers: StockData[];
  nseMostActive: StockData[];
  bseMostActive: StockData[];
}

export const getIndicesData = async (): Promise<StockData[]> => {
  // Mocked from overview_tab.dart
  return [
    {
      id: "nifty",
      name: "NIFTY 50",
      value: "23,450.80",
      change: "+120.50 (0.52%)",
      isPositive: true,
    },
    {
      id: "sensex",
      name: "SENSEX",
      value: "77,120.30",
      change: "+350.10 (0.46%)",
      isPositive: true,
    },
    {
      id: "bank",
      name: "NIFTY BANK",
      value: "50,110.00",
      change: "-50.20 (0.10%)",
      isPositive: false,
    },
    {
      id: "midcap",
      name: "NIFTY MIDCAP",
      value: "11,500.75",
      change: "+80.15 (0.70%)",
      isPositive: true,
    },
    {
      id: "finnifty",
      name: "FINNIFTY",
      value: "21,800.40",
      change: "+10.00 (0.05%)",
      isPositive: true,
    },
    {
      id: "sme",
      name: "NIFTY SME",
      value: "8,200.00",
      change: "-25.50 (0.31%)",
      isPositive: false,
    },
  ];
};

export const getTrendingStocksData = async (): Promise<TrendingStocks> => {
  // Mocked data
  const mockStock = (name: string, isPositive: boolean): StockData => ({
    id: name.toLowerCase(),
    name,
    value: `${(Math.random() * 1000 + 100).toFixed(2)}`,
    change: `${isPositive ? "+" : "-"}${(Math.random() * 20).toFixed(2)} (${(
      Math.random() * 5
    ).toFixed(2)}%)`,
    isPositive,
  });

  return {
    topGainers: [
      mockStock("Tata Motors", true),
      mockStock("Zomato", true),
      mockStock("Adani Ports", true),
    ],
    topLosers: [
      mockStock("Infosys", false),
      mockStock("HDFC Bank", false),
      mockStock("TCS", false),
    ],
    priceShockers: [
      mockStock("Yes Bank", true),
      mockStock("Vodafone Idea", false),
      mockStock("IREDA", true),
    ],
    nseMostActive: [
      mockStock("HDFC Bank", false),
      mockStock("Reliance", true),
      mockStock("ICICI Bank", true),
    ],
    bseMostActive: [
      mockStock("SBI", true),
      mockStock("Axis Bank", false),
      mockStock("L&T", true),
    ],
  };
};

// --- IPO TAB DATA ---
// Based on ipo_tab.dart
export interface UnifiedIpo {
  slug: string; // Added for web URL
  companyName: string;
  ipoType: string;
  status: "Open" | "Closed" | "Listing Soon" | "Listed";
  imageUrl?: string;
  issueOpenDate?: string;
  issueCloseDate?: string;
  minInvestment?: string;
  priceBand?: string;
  issueSize?: string;
  listingDate?: string;
  issuePrice?: string;
  ltp?: string;
  gainPercent?: string;
  // Detail fields
  richContent?: any;
  financials?: any;
  lotSize?: string;
  basisOfAllotmentDate?: string;
  refundsInitiatedDate?: string;
  sharesCreditedDate?: string;
  subscription?: string;
  issueType?: string;
  drhpUrl?: string;
}

const allIpoData: UnifiedIpo[] = [
  {
    slug: "tata-capital",
    companyName: "Tata Capital",
    issueOpenDate: "06 Oct '25",
    issueCloseDate: "08 Oct '25",
    priceBand: "₹ 310 - ₹ 326",
    imageUrl:
      "https://d1tymi9mhi46bx.cloudfront.net/cmot-logos/TataCapitalLtd_25713188_29113.png",
    ipoType: "Mainboard",
    status: "Open",
    minInvestment: "₹ 14,996",
    issueSize: "₹ 15,511 Cr",
    issueType: "Fresh Issue & Offer for sale",
    drhpUrl:
      "https://www.sebi.gov.in/filings/public-issues/apr-2024/tata-capital-limited-draft-red-herring-prospectus_82672.html",
    lotSize: "46",
    basisOfAllotmentDate: "2025-10-09",
    refundsInitiatedDate: "2025-10-10",
    sharesCreditedDate: "2025-10-10",
    listingDate: "2025-10-13",
    richContent: {
      nodes: [
        /* ... from JSON ... */
      ],
    },
    financials: {
      nodes: [
        /* ... from JSON ... */
      ],
    },
  },
  {
    slug: "wework-management",
    companyName: "WeWork Management",
    issueOpenDate: "03 Oct '25",
    issueCloseDate: "07 Oct '25",
    priceBand: "₹ 648",
    imageUrl: "",
    ipoType: "Mainboard",
    status: "Open",
    minInvestment: "₹ 14,904",
    issueSize: "₹ 3,500 Cr",
  },
  {
    slug: "sheel-biotech",
    companyName: "Sheel Biotech",
    issueOpenDate: "30 Sep '25",
    issueCloseDate: "03 Oct '25",
    priceBand: "₹ 63",
    imageUrl: "",
    ipoType: "SME",
    status: "Closed",
    minInvestment: "₹ 1,26,000",
    issueSize: "₹ 18.2 Cr",
  },
  {
    slug: "zelio-emobility",
    companyName: "Zelio EMobility",
    issueOpenDate: "30 Sep '25",
    issueCloseDate: "03 Oct '25",
    priceBand: "₹ 136",
    imageUrl: "",
    ipoType: "SME",
    status: "Closed",
    minInvestment: "₹ 1,36,000",
    issueSize: "₹ 11.5 Cr",
  },
  {
    slug: "munish-forge",
    companyName: "Munish Forge",
    issueOpenDate: "30 Sep '25",
    issueCloseDate: "03 Oct '25",
    priceBand: "₹ 96",
    imageUrl: "",
    ipoType: "SME",
    status: "Closed",
    minInvestment: "₹ 1,15,200",
    issueSize: "₹ 9.2 Cr",
  },
  {
    slug: "earkart",
    companyName: "Earkart",
    listingDate: "03 Oct '25",
    issueSize: "49.3 Cr",
    issuePrice: "₹ 135",
    ipoType: "SME",
    status: "Listing Soon",
  },
  {
    slug: "jinkushal-industries",
    companyName: "Jinkushal Industries",
    listingDate: "03 Oct '25",
    issueSize: "116.2 Cr",
    issuePrice: "₹ 121",
    ipoType: "Mainboard",
    status: "Listing Soon",
  },
  {
    slug: "epack-prefab",
    companyName: "Epack Prefab Technologies",
    ltp: "190.7",
    issuePrice: "₹ 204",
    gainPercent: "-6.5%",
    ipoType: "Mainboard",
    status: "Listed",
  },
  {
    slug: "praruh-technologies",
    companyName: "Praruh Technologies",
    ltp: "64.3",
    issuePrice: "₹ 63",
    gainPercent: "2.0%",
    ipoType: "SME",
    status: "Listed",
  },
];

export const getFilteredIpos = async (
  status: "Open" | "Closed",
  type: "All" | "Mainboard" | "SME"
): Promise<UnifiedIpo[]> => {
  let filtered = allIpoData.filter((ipo) => {
    if (status === "Open") return ipo.status === "Open";
    return ipo.status !== "Open";
  });

  if (type !== "All") {
    filtered = filtered.filter((ipo) => ipo.ipoType === type);
  }
  return filtered;
};

export const getIpoBySlug = async (
  slug: string
): Promise<UnifiedIpo | undefined> => {
  return allIpoData.find((ipo) => ipo.slug === slug);
};

// --- FII/DII TAB DATA ---
export interface ActivityData {
  buy: number;
  sell: number;
  net: number;
}
export interface FiiDiiSummary {
  Cash: { fii: ActivityData; dii: ActivityData };
  "F&O": { fii: ActivityData; dii: ActivityData };
  "FII SEBI": { equity: ActivityData; debt: ActivityData };
  "DII SEBI": { equity: ActivityData; debt: ActivityData };
}
export interface HistoricalActivity {
  dateLabel: string;
  fiiCash: ActivityData;
  diiCash: ActivityData;
  fiiFO: ActivityData;
  diiFO: ActivityData;
  fiiSebiEquity: ActivityData;
  fiiSebiDebt: ActivityData;
  diiSebiEquity: ActivityData;
  diiSebiDebt: ActivityData;
}
export const getFiiDiiData = async (): Promise<{
  summary: FiiDiiSummary;
  daily: HistoricalActivity[];
  monthly: HistoricalActivity[];
}> => {
  // Mock data based on fii_dii_tab.dart
  const rand = () => Math.random() * 20000 + 5000;
  const act = (): ActivityData => {
    const buy = rand();
    const sell = rand();
    return { buy, sell, net: buy - sell };
  };
  const hist = (date: string): HistoricalActivity => ({
    dateLabel: date,
    fiiCash: act(),
    diiCash: act(),
    fiiFO: act(),
    diiFO: act(),
    fiiSebiEquity: act(),
    fiiSebiDebt: act(),
    diiSebiEquity: act(),
    diiSebiDebt: act(),
  });

  return {
    summary: {
      Cash: { fii: act(), dii: act() },
      "F&O": { fii: act(), dii: act() },
      "FII SEBI": { equity: act(), debt: act() },
      "DII SEBI": { equity: act(), debt: act() },
    },
    daily: [
      hist("Oct 29, 2025"),
      hist("Oct 28, 2025"),
      hist("Oct 27, 2025"),
      hist("Oct 26, 2025"),
      hist("Oct 25, 2025"),
    ],
    monthly: [
      hist("October 2025"),
      hist("September 2025"),
      hist("August 2025"),
      hist("July 2025"),
      hist("June 2025"),
    ],
  };
};

// --- ADVANCE/DECLINE TAB DATA ---
export interface SectorModel {
  id: string;
  sectorName: string;
  advance: number;
  decline: number;
  totalCompanies: number;
  dayChangePercent: number;
}
export const getSectorData = async (): Promise<SectorModel[]> => {
  // Mocked from advance_decline_tab.dart
  return [
    {
      id: "1",
      sectorName: "NIFTY IT",
      advance: 10,
      decline: 40,
      totalCompanies: 50,
      dayChangePercent: -1.2,
    },
    {
      id: "2",
      sectorName: "NIFTY BANK",
      advance: 8,
      decline: 4,
      totalCompanies: 12,
      dayChangePercent: 0.8,
    },
    {
      id: "3",
      sectorName: "NIFTY AUTO",
      advance: 12,
      decline: 3,
      totalCompanies: 15,
      dayChangePercent: 1.5,
    },
    {
      id: "4",
      sectorName: "NIFTY PHARMA",
      advance: 18,
      decline: 2,
      totalCompanies: 20,
      dayChangePercent: 2.1,
    },
    {
      id: "5",
      sectorName: "NIFTY FMCG",
      advance: 5,
      decline: 10,
      totalCompanies: 15,
      dayChangePercent: -0.5,
    },
    {
      id: "6",
      sectorName: "NIFTY REALTY",
      advance: 9,
      decline: 1,
      totalCompanies: 10,
      dayChangePercent: 3.0,
    },
  ];
};

// --- EVENTS CALENDAR DATA ---
export interface CorporateEvent {
  id: string;
  title: string;
  stockSymbol: string;
  date: string;
  category: string;
}
export interface ResultsEvent {
  id: string;
  date: string;
  company: string;
  type: string;
}
export interface EconomicEvent {
  id: string;
  time: string;
  country: string;
  event: string;
  actual?: string;
  previous?: string;
  consensus?: string;
}
export const getEventsData = async (): Promise<{
  corporate: CorporateEvent[];
  results: ResultsEvent[];
  economic: EconomicEvent[];
}> => {
  // Mocked from events_calendar.dart
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  return {
    corporate: [
      {
        id: "1",
        title: "Board Meeting",
        stockSymbol: "RELIANCE",
        date: today,
        category: "Board Meeting",
      },
      {
        id: "2",
        title: "Quarterly Results",
        stockSymbol: "TCS",
        date: today,
        category: "Result",
      },
      {
        id: "3",
        title: "Stock Split 2:1",
        stockSymbol: "INFY",
        date: tomorrow,
        category: "Corporate Action",
      },
      {
        id: "4",
        title: "Annual General Meeting",
        stockSymbol: "HDFCBANK",
        date: tomorrow,
        category: "AGM",
      },
    ],
    results: [
      {
        id: "r1",
        date: "31 Oct",
        company: "Medplus Health Services",
        type: "NA",
      },
      {
        id: "r2",
        date: "31 Oct",
        company: "Mahindra Holidays",
        type: "Q2-2025",
      },
      { id: "r3", date: "30 Oct", company: "Cipla", type: "Q2-2025" },
    ],
    economic: [
      {
        id: "e1",
        time: "04:30",
        country: "South Korea",
        event: "Inflation Rate MoM (Sep)",
        actual: "0.5%",
        previous: "-0.1%",
        consensus: "0.4%",
      },
      {
        id: "e2",
        time: "05:30",
        country: "India",
        event: "Gandhi Jayanti",
        actual: "Holiday",
        previous: "",
        consensus: "",
      },
      {
        id: "e3",
        time: "05:30",
        country: "China",
        event: "National Day Golden Week",
        actual: "Holiday",
        previous: "",
        consensus: "",
      },
    ],
  };
};
