"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Search } from 'lucide-react'; 

interface ListHeroProps {
  title: string;
  subtitle: string;
}

const ListHero: React.FC<ListHeroProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the title, subtitle, and new search bar
  useGSAP(() => {
    // 1. Create a matchMedia instance
    const mm = gsap.matchMedia();

    // 2. Add queries
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Normal Motion: Animate as planned
      gsap.fromTo(
        [".hero-title", ".hero-subtitle", ".hero-search"],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Reduced Motion: Snap to the final state instantly
      gsap.set([".hero-title", ".hero-subtitle", ".hero-search"], {
        opacity: 1,
        y: 0,
      });
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] py-20 md:py-24 text-white overflow-hidden"
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
        <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 opacity-0" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}>
          {title}
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 opacity-0">
          {subtitle}
        </p>

        {/* --- ACCESSIBLE SEARCH BAR --- */}
        <div className="hero-search max-w-lg mx-auto opacity-0">
          {/* A hidden label for screen readers */}
          <label htmlFor="hero-search-input" className="sr-only">
            Search articles
          </label>
          <div className="relative">
            <input
              type="search"
              id="hero-search-input" // Link the label
              placeholder="Search articles..."
              className="w-full h-12 pl-12 pr-4 rounded-full text-base text-gray-800 bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white/80"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHero;