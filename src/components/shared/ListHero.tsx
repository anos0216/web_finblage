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
// -------------------

interface ListHeroProps {
  title: string;
  subtitle: string;
  showFilters?: boolean;
}

const ListHero: React.FC<ListHeroProps> = ({ title, subtitle, showFilters = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categoriesData[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>("All");

  useGSAP(() => {
    // ... (GSAP animation logic remains the same)
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

  // Update handlers for Shadcn DropdownMenuRadioGroup
  const handleCategoryChange = (value: string) => {
    const categoryName = value;
    const newCategory = categoriesData.find(cat => cat.name === categoryName) || categoriesData[0];
    setSelectedCategory(newCategory);
    setSelectedSubCategory("All"); // Reset subcategory
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value as SubCategory);
  };

  // Helper function to style the trigger button
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
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] py-16 md:py-20 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
         {/* ... svg pattern ... */}
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
        <div className="hero-search-filter-wrapper max-w-4xl mx-auto opacity-0">
          <div className={`flex flex-col sm:flex-row items-center gap-4 ${showFilters ? 'justify-center' : 'justify-center'}`}>

            {/* --- SEARCH BAR --- */}
            <div className={`relative w-full sm:w-auto ${showFilters ? 'sm:flex-grow' : 'sm:w-3/5 md:w-1/2 lg:max-w-lg'}`}>
              <label htmlFor="hero-search-input" className="sr-only">
                Search articles
              </label>
              <input
                type="search"
                id="hero-search-input"
                placeholder="Search articles..."
                className="w-full h-11 pl-10 pr-4 rounded-[4px] text-sm text-gray-800 bg-white/90 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* --- FILTER DROPDOWNS --- */}
            {showFilters && (
              <div className="flex items-center gap-3 flex-shrink-0">

                {/* === Category Dropdown (Shadcn UI) === */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* Use Button component or a styled button */}
                     <button className={getTriggerStyle()} style={{ fontFamily: 'var(--font-inter)' }}>
                       {selectedCategory.name}
                       <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white rounded-md shadow-lg" align="start">
                    {/* Radio group to manage selection */}
                    <DropdownMenuRadioGroup value={selectedCategory.name} onValueChange={handleCategoryChange}>
                      {categoriesData.map(cat => (
                        <DropdownMenuRadioItem key={cat.name} value={cat.name} className="cursor-pointer text-sm">
                          {cat.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* === Sub-Category Dropdown (Shadcn UI) === */}
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
            {/* --- End Filters --- */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHero;