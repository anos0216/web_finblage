"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoadingLink from "./shared/LoadingLink";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the background shapes
      gsap.to(".shape", {
        duration: 40,
        x: () => `random(-150, 150)%`,
        y: () => `random(-150, 150)%`,
        rotation: () => `random(-360, 360)`,
        scale: () => `random(0.7, 1.3)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animate the text content
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".hero-subtitle",
        { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );
      // FIX: Removed the .from(".hero-button", ...) line
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-primary text-white py-16 md:py-24 overflow-hidden"
    >
      {/* Finance-themed Animated Shapes Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Rising Graph */}
        <svg
          className="shape absolute top-[20%] left-[10%] w-32 h-32 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        {/* Bar Chart */}
        <svg
          className="shape absolute top-[60%] left-[80%] w-28 h-28 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
        {/* Pie Chart */}
        <svg
          className="shape absolute top-[70%] left-[20%] w-40 h-40 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
        {/* Currency/Coin */}
        <svg
          className="shape absolute top-[15%] left-[75%] w-20 h-20 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="8"></line>
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight mb-4">
          Unlocking Financial Clarity
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Your trusted source for market insights, news, and in-depth analysis
          to guide your investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Hero;
