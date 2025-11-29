"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; 

// --- Filter Data ---
type SubCategory = "All" | "Indian" | "Global" | "Type A" | "Type B";
type Category = {
  name: "All" | "Corporate" | "Market" | "Economy" | "Geopolitical" | "Sector";
  subCategories: SubCategory[];
};

const categoriesData: Category[] = [
  { name: "All", subCategories: ["All", "Type A", "Type B"] },
  { name: "Corporate", subCategories: ["All", "Type A", "Type B"] },
  { name: "Market", subCategories: ["All", "Indian", "Global"] },
  { name: "Economy", subCategories: ["All", "Type A", "Type B"] },
  { name: "Geopolitical", subCategories: ["All", "Indian", "Global"] },
  { name: "Sector", subCategories: ["All", "Type A", "Type B"] },
];

interface ListHeroProps {
  title: string;
  subtitle: string;
  showFilters?: boolean;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

const ListHero: React.FC<ListHeroProps> = ({ 
  title, 
  subtitle, 
  showFilters = false,
  onSearch,
  searchPlaceholder = "Search articles...",
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categoriesData[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>("All");

  useGSAP(() => {
    const elementsToAnimate = [".hero-title", ".hero-subtitle", ".hero-search-filter-wrapper"];
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          elementsToAnimate,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(elementsToAnimate, { opacity: 1, y: 0 });
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  const handleCategoryChange = (value: string) => {
    const categoryName = value;
    const newCategory = categoriesData.find(cat => cat.name === categoryName) || categoriesData[0];
    setSelectedCategory(newCategory);
    setSelectedSubCategory("All"); 
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value as SubCategory);
  };

  const getTriggerStyle = () => `
    h-11 px-4 rounded-[4px] text-sm font-medium
    bg-white/90 hover:bg-white/100 text-gray-800
    backdrop-blur-sm shadow-md
    focus:outline-none focus:ring-2 focus:ring-white/80
    cursor-pointer transition
    flex items-center justify-between gap-2 min-w-[120px]
  `;

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] pt-28 pb-16 md:pt-32 md:pb-20 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="pattern-lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-lines)"></rect></svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1
          className="hero-title text-4xl md:text-5xl font-bold mb-4 opacity-0"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
        >
          {title}
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 opacity-0">
          {subtitle}
        </p>

        {/* --- Wrapper for Search + Filters --- */}
        <div className="hero-search-filter-wrapper max-w-3xl mx-auto opacity-0">
          {/* UPDATED: Search Box Container style (Light Blue Box) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-500/50 p-4 rounded-lg border border-blue-100/50 shadow-xl backdrop-blur-sm">

            {/* --- SEARCH BAR --- */}
            <div className="relative w-full flex-grow">
              <label htmlFor="hero-search-input" className="sr-only">
                {searchPlaceholder}
              </label>
              {/* UPDATED: Input style (White bg, Primary Text) */}
              <input
                type="search"
                id="hero-search-input"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-md text-sm text-primary placeholder:text-gray-400 bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all shadow-sm"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
              {/* Updated icon color for white background */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />
            </div>

            {/* --- CUSTOM CHILDREN (e.g. M&A Buttons) --- */}
            {children && (
              <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                {children}
              </div>
            )}

            {/* --- DEFAULT FILTERS (Fallback for News Page) --- */}
            {!children && showFilters && (
              <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className={getTriggerStyle()} style={{ fontFamily: 'var(--font-inter)' }}>
                       {selectedCategory.name}
                       <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white rounded-md shadow-lg" align="start">
                    <DropdownMenuRadioGroup value={selectedCategory.name} onValueChange={handleCategoryChange}>
                      {categoriesData.map(cat => (
                        <DropdownMenuRadioItem key={cat.name} value={cat.name} className="cursor-pointer text-sm">
                          {cat.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className={getTriggerStyle()} style={{ fontFamily: 'var(--font-inter)' }}>
                       {selectedSubCategory}
                       <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white rounded-md shadow-lg" align="start">
                    <DropdownMenuRadioGroup value={selectedSubCategory} onValueChange={handleSubCategoryChange}>
                      {selectedCategory.subCategories.map(sub => (
                         <DropdownMenuRadioItem key={sub} value={sub} className="cursor-pointer text-sm">
                          {sub}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHero;