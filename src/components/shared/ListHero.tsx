"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Search, ChevronDown } from 'lucide-react';

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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = event.target.value;
    const newCategory = categoriesData.find(cat => cat.name === categoryName) || categoriesData[0];
    setSelectedCategory(newCategory);
    setSelectedSubCategory("All");
  };

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(event.target.value as SubCategory);
  };


  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] py-16 md:py-20 text-white overflow-hidden"
    >
      {/* Background Pattern */}
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
              <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-lines)"></rect>
        </svg>
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
        {/* Increased max-w slightly */}
        <div className="hero-search-filter-wrapper max-w-4xl mx-auto opacity-0">
          {/* Use flex-wrap for smaller screens if needed */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 ${showFilters ? 'justify-center' : 'justify-center'}`}>

            {/* --- SEARCH BAR --- */}
            {/* Added flex-grow and adjusted default width */}
            <div className={`relative w-full sm:w-auto ${showFilters ? 'sm:flex-grow' : 'sm:w-3/5 md:w-1/2 lg:max-w-lg'}`}>
              <label htmlFor="hero-search-input" className="sr-only">
                Search articles
              </label>
              <input
                type="search"
                id="hero-search-input"
                placeholder="Search articles..."
                className="w-full h-11 pl-10 pr-4 rounded-full text-sm text-gray-800 bg-white/90 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-white/80"
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* --- FILTER DROPDOWNS --- */}
            {showFilters && (
              // Added flex-shrink-0 to prevent shrinking
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Category Dropdown */}
                <div className="relative">
                   <label htmlFor="category-select" className="sr-only">Category</label>
                   <select
                    id="category-select"
                    value={selectedCategory.name}
                    onChange={handleCategoryChange}
                    className="appearance-none h-11 pl-4 pr-10 rounded-full text-sm text-gray-700 bg-white/90 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
                  >
                    {categoriesData.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Sub-Category Dropdown */}
                <div className="relative">
                  <label htmlFor="subcategory-select" className="sr-only">Sub-category</label>
                  <select
                    id="subcategory-select"
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                    className="appearance-none h-11 pl-4 pr-10 rounded-full text-sm text-gray-700 bg-white/90 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
                  >
                    {selectedCategory.subCategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
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