"use client";

import React from "react";
import Image from "next/image";
import { UnifiedIpo } from "@/lib/market-data";
import { NewsItem } from "@/types/finblage";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Building,
  Globe,
  Briefcase,
  User,
  TrendingUp,
  Percent,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Import the new components
import IpoTimeline from "./IpoTimeline";
import IpoFinancials from "./IpoFinancials";
import IpoTextSection from "./IpoTextSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedArticleCard from "@/components/shared/AnimatedArticleCard";

// Colors for the pie chart
const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const IpoDetailClient: React.FC<{
  ipo: UnifiedIpo;
  relatedNews: NewsItem[];
}> = ({ ipo, relatedNews }) => {
  const hasImage = ipo.imageUrl && ipo.imageUrl.length > 0;

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div>
      <p
        className="text-xs text-gray-300 mb-0.5"
        style={{ fontFamily: "var(--font-oxygen)" }}
      >
        {label}
      </p>
      <p
        className="text-sm text-white"
        style={{ fontFamily: "var(--font-oxygen)" }}
      >
        {value || "N/A"}
      </p>
    </div>
  );

  const offerBreakupData = [
    { name: "QIB", value: parseFloat(ipo.offerBreakup?.qib || "0") },
    { name: "NII", value: parseFloat(ipo.offerBreakup?.nii || "0") },
    { name: "Retail", value: parseFloat(ipo.offerBreakup?.retail || "0") },
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="relative px-6 pb-20 pt-28 shadow-sm bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          {/* ... svg pattern ... */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-lines"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-lines)"
            ></rect>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 md:px-44">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
              {hasImage ? (
                <Image
                  src={ipo.imageUrl!}
                  alt={ipo.companyName}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500 text-center leading-tight">
                  No Logo
                </span>
              )}
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-oxygen)" }}
              >
                {ipo.companyName}
              </h1>
              <p className="text-sm pl-1 text-gray-200">{ipo.issueType}</p>
            </div>
          </div>
          {ipo.drhpUrl && (
            <Button
              asChild
              variant="outline"
              className="flex-shrink-0 bg-white border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-primary"
            >
              <a href={ipo.drhpUrl} target="_blank" rel="noopener noreferrer">
                View DRHP <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          )}
        </div>

        <div className="relative z-10 mt-5 md:px-44">
          <h2
            className="text-lg font-semibold text-white mb-2"
            style={{ fontFamily: "var(--font-oxygen)" }}
          >
            IPO Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
            <InfoItem label="Price Band" value={ipo.priceBand} />
            <InfoItem
              label="Lot Size"
              value={ipo.lotSize ? `${ipo.lotSize} Shares` : "N/A"}
            />
            <InfoItem label="Issue Size" value={ipo.issueSize} />
            <InfoItem label="Min Investment" value={ipo.minInvestment} />
            <InfoItem label="Status" value={ipo.status} />
            <InfoItem label="Issue Type" value={ipo.ipoType} />
            <InfoItem label="Listing At" value="BSE, NSE" />
            <InfoItem label="Registrar" value={ipo.registrar || "N/A"} />
          </div>
        </div>
      </div>

      {/* --- Timeline Section --- */}
      <div className="md:px-48 px-4">
        <IpoTimeline ipo={ipo} />
      </div>

      {/* --- NEW 2-COLUMN LAYOUT --- */}
      <div className="md:px-48 px-4 mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Main Content (Left) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Financials Section */}
          {ipo.financials && ipo.financials.length > 0 && (
            <IpoFinancials financials={ipo.financials} />
          )}

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related News</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel
                  opts={{
                    align: "start",
                    loop: relatedNews.length > 1,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {relatedNews.map((newsItem) => (
                      <CarouselItem key={newsItem.id} className="md:basis-1/2">
                        <AnimatedArticleCard item={newsItem} basePath="/news" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          )}

          {/* Business Overview */}
          {ipo.businessOverview && (
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {ipo.businessOverview}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Peer Company Comparison */}
          {ipo.peersCompany && ipo.peersCompany.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Peer Company Comparison</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                    <tr>
                      <th className="px-4 py-3">Company Name</th>
                      <th className="px-4 py-3 text-right">LTP (₹)</th>
                      <th className="px-4 py-3 text-right">P/E</th>
                      <th className="px-4 py-3 text-right">ROE (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ipo.peersCompany.map((peer, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {peer.name}
                        </td>
                        <td className="px-4 py-3 text-right">{peer.ltp}</td>
                        <td className="px-4 py-3 text-right">{peer.p_e}</td>
                        <td className="px-4 py-3 text-right">{peer.roe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Objects of the Offer */}
          <IpoTextSection
            title="Objects of the Offer"
            points={ipo.objectsOfTheOffer}
          />

          {/* Strengths */}
          <IpoTextSection title="Strengths" points={ipo.strengths} />

          {/* Risks */}
          <IpoTextSection title="Risks" points={ipo.risks} />
        </div>

        {/* --- Sidebar (Right) --- */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-20 h-fit">
          {/* Company Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={ipo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline truncate"
                  >
                    {ipo.website}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Parent Company</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.parentCompany}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Sector</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.sectorIndustry}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Management */}
          {ipo.keyManagement && ipo.keyManagement.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Management Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ipo.keyManagement.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {person.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Offer Breakup */}
          {ipo.offerBreakup && (
            <Card>
              <CardHeader>
                <CardTitle>Offer Breakup</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={offerBreakupData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {offerBreakupData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      QIB
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      {ipo.offerBreakup.qib}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      NII
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      {ipo.offerBreakup.nii}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      Retail
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      {ipo.offerBreakup.retail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shareholder Pattern */}
          {ipo.shareholderPattern && (
            <Card>
              <CardHeader>
                <CardTitle>Shareholder Pattern</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    Pre IPO Promoter Holding
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.shareholderPattern.pre}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    Post IPO Promoter Holding
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.shareholderPattern.post}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selling Shareholder Data */}
          {ipo.sellingShareholderData &&
            ipo.sellingShareholderData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selling Shareholder Data</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                      <tr>
                        <th className="px-4 py-3">Shareholder</th>
                        <th className="px-4 py-3 text-right">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ipo.sellingShareholderData.map((shareholder, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {shareholder.name}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {shareholder.shares}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}

          {/* Capital Structure */}
          {ipo.capitalStructure && (
            <Card>
              <CardHeader>
                <CardTitle>Capital Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Paid-up Capital</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.capitalStructure.paidUpEquityShareCapital}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Auth. Capital</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.capitalStructure.authShareCapital}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Face Value</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.capitalStructure.faceValue}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Valuation Metrics */}
          {ipo.valuationMetrics && (
            <Card>
              <CardHeader>
                <CardTitle>Valuation Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Pre-Issue P/E</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.valuationMetrics.preIssuePe}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Post-Issue P/E</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.valuationMetrics.postIssuePe}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Market Cap (Cr)</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {ipo.valuationMetrics.marketCap}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grey Market Premium */}
          {ipo.greyMarketPremium && (
            <Card>
              <CardHeader>
                <CardTitle>Grey Market Premium (GMP)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">
                  {ipo.greyMarketPremium}
                </p>
                <p className="text-sm text-gray-500">Est. listing gain</p>
              </CardContent>
            </Card>
          )}

          {/* Post Listing */}
          {ipo.postListing && (
            <Card>
              <CardHeader>
                <CardTitle>Post-Listing Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Listing Price</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {ipo.postListing.listingPrice}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Percent className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Listing Gain</p>
                    <p className="text-sm font-semibold text-green-600">
                      {ipo.postListing.listingGain}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Market Cap on Listing
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {ipo.postListing.marketCap}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default IpoDetailClient;
