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

// New interface for strongly-typed financial data
export interface IpoFinancial {
  period: string;
  revenue?: number;
  pat?: number;
  eps?: number;
}

// Updated UnifiedIpo interface
export interface UnifiedIpo {
  slug: string;
  companyName: string;
  website?: string;
  parentCompany?: string;
  sectorIndustry?: string;
  businessOverview?: string;
  keyManagement?: { name: string; designation: string }[];
  ipoType: string;
  status: "Open" | "Closed" | "Listing Soon" | "Listed" | "Upcoming"; // Added Upcoming
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
  financials?: IpoFinancial[]; // Updated from 'any'
  lotSize?: string;
  basisOfAllotmentDate?: string;
  refundsInitiatedDate?: string;
  sharesCreditedDate?: string;
  subscription?: string;
  issueType?: string;
  drhpUrl?: string;
  registrar?: string; // New
  about?: string; // New (replaces richContent)
  objectsOfTheOffer?: string[]; // New (IPO Objective)
  strengths?: string[]; // New
  risks?: string[]; // New
  offerBreakup?: { qib: string; nii: string; retail: string };
  shareholderPattern?: { pre: string; post: string };
  sellingShareholderData?: { name: string; shares: string }[];
  capitalStructure?: {
    paidUpEquityShareCapital: string;
    authShareCapital: string;
    faceValue: string;
  };
  peersCompany?: { name: string; ltp: string; p_e: string; roe: string }[];
  valuationMetrics?: {
    preIssuePe: string;
    postIssuePe: string;
    marketCap: string;
  };
  greyMarketPremium?: string;
  postListing?: {
    listingPrice: string;
    listingGain: string;
    marketCap: string;
  };
}


const allIpoData: UnifiedIpo[] = [
  // --- Tata Capital (Updated with full dummy data) ---
  {
    slug: "tata-capital",
    companyName: "Tata Capital Ltd.",
    website: "www.tatacapital.com",
    parentCompany: "Tata Sons Limited",
    sectorIndustry: "Financial Services",
    businessOverview:
      "Tata Capital Limited, a Systemically Important Non-Deposit accepting Core Investment Company (CIC-ND-SI) registered with the RBI, is the financial services flagship of the Tata Group. It provides a comprehensive suite of financial solutions through its subsidiaries. Its operations span consumer finance (personal loans, home loans, auto loans, credit cards), commercial finance (SME lending, corporate finance, infrastructure finance), and wealth management services. The company leverages its strong brand, extensive 'phygital' distribution network, and robust digital ecosystem to serve a diverse customer base, from retail individuals to large corporations.",
    keyManagement: [
      { name: "Rajiv Sabharwal", designation: "CEO & Managing Director" },
      { name: "Saurabh Agrawal", designation: "Non-Executive Director" },
      { name: "F. N. Subedar", designation: "Non-Executive Director" },
    ],
    status: "Upcoming",
    ipoType: "Mainboard",
    imageUrl: "https://d1tymi9mhi46bx.cloudfront.net/cmot-logos/TataCapitalLtd_25713188_29113.png", // Using Tata Steel logo as placeholder

    // --- List View Fields ---
    issueOpenDate: "Nov 10, 2025",
    issueCloseDate: "Nov 12, 2025",
    priceBand: "₹450 - ₹475",
    minInvestment: "₹14,250",
    issueSize: "₹3,500 Cr",

    // --- Detail View Fields ---
    lotSize: "30",
    issueType: "Book Built Issue IPO",
    drhpUrl: "#",
    registrar: "Link Intime India Pvt Ltd",

    // --- Timeline ---
    basisOfAllotmentDate: "Nov 15, 2025",
    refundsInitiatedDate: "Nov 16, 2025",
    sharesCreditedDate: "Nov 17, 2025",
    listingDate: "Nov 18, 2025",

    // --- Text Sections ---
    about: "Tata Capital Limited, a subsidiary of Tata Sons Limited, is the financial services arm of the Tata Group. It operates as a diversified financial services company, offering a wide range of products and services in areas such as consumer finance, commercial finance, investment banking, and wealth management.",

    objectsOfTheOffer: [
      "To augment the company's Tier-1 capital base to meet future capital requirements arising out of growth in its business, assets, and loan book.",
      "To receive the benefits of listing the equity shares on the stock exchanges, which includes enhancing the brand's visibility and providing liquidity to existing shareholders.",
      "To carry out the Offer for Sale (OFS) of equity shares by the promoting and selling shareholders.",
      "To fund general corporate purposes, including investments in technology, brand building, and operational expenses."
    ],

    strengths: [
      "Strong and Trusted Brand: Unmatched brand equity of the 'Tata' name, synonymous with trust, quality, and ethical business practices across India.",
      "Diversified Revenue Streams: Well-diversified business model with presence across multiple high-growth segments including retail, corporate, and wealth management, reducing dependency on any single sector.",
      "Robust Risk Management Framework: A sophisticated, time-tested, and centralized framework for risk assessment, credit underwriting, and asset quality management, leading to stable NPA levels.",
      "Strong Parentage (Tata Sons): Consistent financial and strategic support from the parent company, Tata Sons, providing access to low-cost capital and extensive ecosystem-wide synergies.",
      "Experienced Management Team: Led by a seasoned management team with deep domain expertise in the financial services industry."
    ],

    risks: [
      "Stringent Regulatory & Compliance Risk: Operations are subject to stringent regulatory requirements and supervision by the RBI. Any adverse changes in policy (e.g., capital adequacy, NPA recognition) can significantly impact profitability and operations.",
      "Intense Market Competition: Faces intense competition from established commercial banks, other large NBFCs (like Bajaj Finance), and agile new-age fintech players, which can put pressure on margins.",
      "Credit Risk & Asset Quality: The company's asset quality is inherently linked to the macroeconomic environment. An economic downturn could lead to an increase in non-performing assets (NPAs) and credit losses.",
      "Liquidity & Funding Dependency: Like all NBFCs, the company is dependent on the stability of domestic and international financial markets to secure cost-effective liquidity and funding. Any disruption can affect cost of funds."
    ],

    offerBreakup: { qib: "50%", nii: "15%", retail: "35%" },
    shareholderPattern: { pre: "75%", post: "60%" },
    sellingShareholderData: [
      { name: "Tata Sons Limited", shares: "5,00,00,000" },
      { name: "Alpha TC Holdings Pte. Ltd.", shares: "1,00,00,000" },
    ],
    capitalStructure: {
      paidUpEquityShareCapital: "₹1,000 Cr",
      authShareCapital: "₹1,500 Cr",
      faceValue: "₹10",
    },
    peersCompany: [
      { name: "Bajaj Finance", ltp: "₹7,500", p_e: "35", roe: "20%" },
      { name: "HDFC Bank", ltp: "₹1,500", p_e: "20", roe: "15%" },
      { name: "ICICI Bank", ltp: "₹900", p_e: "18", roe: "14%" },
    ],
    valuationMetrics: {
      preIssuePe: "25",
      postIssuePe: "30",
      marketCap: "₹1,00,000 Cr",
    },
    greyMarketPremium: "₹150 - ₹175",
    postListing: {
      listingPrice: "₹625",
      listingGain: "31.58%",
      marketCap: "₹1,31,250 Cr",
    },
    // --- Financials (Table & Graph) ---
    financials: [
      { period: 'FY23', revenue: 10500, pat: 1800, eps: 12.5 },
      { period: 'FY24', revenue: 12800, pat: 2200, eps: 15.2 },
      { period: 'FY25 (Est.)', revenue: 15000, pat: 2700, eps: 18.8 },
    ],
  },
  // --- Other IPOs (with new fields as undefined) ---
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
    financials: [],
    about: "Details for WeWork Management are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
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
    financials: [],
    about: "Details for Sheel Biotech are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
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
    financials: [],
    about: "Details for Zelio EMobility are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
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
    financials: [],
    about: "Details for Munish Forge are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
  },
  {
    slug: "earkart",
    companyName: "Earkart",
    listingDate: "03 Oct '25",
    issueSize: "49.3 Cr",
    issuePrice: "₹ 135",
    ipoType: "SME",
    status: "Listing Soon",
    financials: [],
    about: "Details for Earkart are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
  },
  {
    slug: "jinkushal-industries",
    companyName: "Jinkushal Industries",
    listingDate: "03 Oct '25",
    issueSize: "116.2 Cr",
    issuePrice: "₹ 121",
    ipoType: "Mainboard",
    status: "Listing Soon",
    financials: [],
    about: "Details for Jinkushal Industries are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
  },
  {
    slug: "epack-prefab",
    companyName: "Epack Prefab Technologies",
    ltp: "190.7",
    issuePrice: "₹ 204",
    gainPercent: "-6.5%",
    ipoType: "Mainboard",
    status: "Listed",
    financials: [],
    about: "Details for Epack Prefab Technologies are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
  },
  {
    slug: "praruh-technologies",
    companyName: "Praruh Technologies",
    ltp: "64.3",
    issuePrice: "₹ 63",
    gainPercent: "2.0%",
    ipoType: "SME",
    status: "Listed",
    financials: [],
    about: "Details for Praruh Technologies are not available yet.",
    objectsOfTheOffer: [],
    strengths: [],
    risks: [],
  },
];

export const getFilteredIpos = async (
  status: "Open" | "Closed",
  type: "All" | "Mainboard" | "SME"
): Promise<UnifiedIpo[]> => {
  let filtered = allIpoData.filter((ipo) => {
    if (status === "Open") return ipo.status === "Open";
    // Show Upcoming, Closed, Listing Soon, Listed in the "Closed" tab
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
      { id: "r3", date: "30 Oct", company: "Cipla", type: "Q2-2Gas" },
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