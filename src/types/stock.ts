// src/types/stock.ts

// Type for the 'fields' in financial statements
export interface FinancialField {
  displayName: string;
  value: number | null;
  key: string;
}

// Type for a single financial statement (Annual or Quarterly)
export interface FinancialStatement {
  FiscalYear: string;
  EndDate: string;
  Type: "Annual" | "Quarterly";
  StatementDate: string;
  fiscalPeriodNumber: number;
  fields: FinancialField[];
}

// Type for the main financial map
export interface StockFinancialMap {
  CAS: FinancialStatement[]; // Cash Flow
  BAL: FinancialStatement[]; // Balance Sheet
  INC: FinancialStatement[]; // Income Statement
}

// Type for an officer
export interface StockOfficer {
  rank: number;
  since: string;
  firstName: string;
  lastName: string;
  age: string;
  title: {
    Value: string;
  };
}

// Type for a peer company
export interface StockPeer {
  tickerId: string;
  companyName: string;
  priceToBookValueRatio: number | null;
  priceToEarningsValueRatio: number | null;
  marketCap: number;
  price: number;
  percentChange: number;
  netChange: number;
  returnOnAverageEquityTrailing12Month: number | null;
  imageUrl: string;
  overallRating: string;
  yhigh: number;
  ylow: number;
}

// Type for the company profile
export interface StockProfile {
  companyDescription: string;
  mgIndustry: string;
  isInId: string;
  officers: {
    officer: StockOfficer[];
  };
  exchangeCodeBse: string;
  exchangeCodeNse: string;
  peerCompanyList: StockPeer[];
}

// Type for the root stock data object
export interface StockData {
  companyName: string;
  industry: string;
  companyProfile: StockProfile;
  currentPrice: number; // You mentioned this
  percentChange: number; // You mentioned this
  netChange: number; // Derived from peer list
  yearHigh: number; // You mentioned this
  yearLow: number; // You mentioned this
  stockTechnicalData: any; // Placeholder
  financials: {
    stockFinancialMap: StockFinancialMap;
  };
}