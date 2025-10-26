"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ... (type definitions are the same)
type SubCategory = "All" | "Indian" | "Global";
type Category = {
  name: "All" | "Corporate" | "Market" | "Economy" | "Geopolitical" | "Sector";
  subCategories?: SubCategory[];
};

const categories: Category[] = [
  { name: "All" },
  { name: "Corporate" },
  { name: "Market", subCategories: ["All", "Indian", "Global"] },
  { name: "Economy" },
  { name: "Geopolitical", subCategories: ["All", "Indian", "Global"] },
  { name: "Sector" },
];

const FilterBar = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);

  const subCategoryRef = useRef<HTMLDivElement>(null);
  const mm = gsap.matchMedia(); // Create matchMedia instance

  // Animation for the sub-category bar
  useGSAP(() => {
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Normal Motion: Animate
      gsap.to(subCategoryRef.current, {
        height: activeCategory.subCategories ? "auto" : 0,
        opacity: activeCategory.subCategories ? 1 : 0,
        marginTop: activeCategory.subCategories ? "0.75rem" : 0, // 12px
        duration: 0.3,
        ease: "power2.out",
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Reduced Motion: Snap
      gsap.set(subCategoryRef.current, {
        height: activeCategory.subCategories ? "auto" : 0,
        opacity: activeCategory.subCategories ? 1 : 0,
        marginTop: activeCategory.subCategories ? "0.75rem" : 0,
      });
    });

  }, [activeCategory]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    setActiveSubCategory(category.subCategories ? "All" : null); 
  };

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    setActiveSubCategory(subCategory);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- Main Category (with ARIA roles) --- */}
      <div role="tablist" aria-label="Article Categories" className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            role="tab" // ARIA role
            aria-selected={activeCategory.name === category.name} // ARIA state
            onClick={() => handleCategoryClick(category)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${activeCategory.name === category.name 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }
            `}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* --- Conditional Sub-Category (with ARIA roles) --- */}
      <div 
        ref={subCategoryRef} 
        className="h-0 opacity-0 overflow-hidden"
      >
        <div role="tablist" aria-label="Article Sub-categories" className="flex items-center space-x-2 overflow-x-auto pb-2 pl-4">
          {activeCategory.subCategories?.map((sub) => (
            <button
              key={sub}
              role="tab" // ARIA role
              aria-selected={activeSubCategory === sub} // ARIA state
              onClick={() => handleSubCategoryClick(sub)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200
                ${activeSubCategory === sub
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
                }
              `}
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;