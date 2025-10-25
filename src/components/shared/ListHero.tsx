"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ListHeroProps {
  title: string;
  subtitle: string;
}

/**
 * A reusable hero component for list pages with a gradient,
 * pattern, and simple fade-in animation.
 */
const ListHero: React.FC<ListHeroProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add a simple fade-in animation for the text
  useGSAP(() => {
    gsap.fromTo(
      [".hero-title", ".hero-subtitle"],
      { opacity: 0, y: 20 }, // Start from invisible and slightly down
      {
        opacity: 1,
        y: 0, // Fade in to full opacity at original position
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2 // Animate title first, then subtitle
      }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] py-20 md:py-24 text-white overflow-hidden"
    >
      {/* --- NEW BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="pattern-lines" 
              x="0" 
              y="0" 
              width="10" 
              height="10" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)" // Creates the diagonal effect
            >
              {/* This line repeats every 10 pixels */}
              <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-lines)"></rect>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* These classes start as 'opacity-0' to hide them before GSAP runs */}
        <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 opacity-0">
          {title}
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto opacity-0">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ListHero;