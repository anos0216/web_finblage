"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin"; // Import TextPlugin
import { Search } from "lucide-react"; // Import Search icon

// Register the plugin
gsap.registerPlugin(TextPlugin);

// --- StockCandle Component (Unchanged) ---
const StockCandle = ({
  className,
  isPositive = true,
}: {
  className: string;
  isPositive?: boolean;
}) => {
  const color = isPositive ? "text-green-500" : "text-red-500";
  return (
    <svg
      // Add .shape class for GSAP to target
      className={`shape absolute w-16 h-28 ${className} ${color} opacity-20`}
      viewBox="0 0 20 40"
      fill="currentColor"
      stroke="currentColor"
    >
      {/* Add classes for GSAP to target parts */}
      <line
        className="candle-wick-top"
        x1="10"
        y1="0"
        x2="10"
        y2="10"
        strokeWidth="2"
        style={{ transformOrigin: "bottom center" }} // Set origin for scaling
      />
      <rect
        className="candle-body"
        x="5"
        y="10"
        width="10"
        height="20"
        style={{ transformOrigin: "center center" }} // Set origin for scaling
      />
      <line
        className="candle-wick-bottom"
        x1="10"
        y1="30"
        x2="10"
        y2="40"
        strokeWidth="2"
        style={{ transformOrigin: "top center" }} // Set origin for scaling
      />
    </svg>
  );
};

// --- Reusable AnimatedQuote Component (No animation logic) ---
const AnimatedQuote = ({ staticText }: { staticText: string }) => {
  return (
    <h2
      className="quote-item hero-title text-2xl text-center md:text-3xl font-bold leading-tight min-h-[3rem]"
      style={{ fontFamily: "var(--font-oxygen)" }}
    >
      {/* Static text part (fades in with parent) */}
      <span className="hero-title-static">{staticText} </span>
      {/* Animated text part (types) */}
      <span className="hero-animated-text opacity-0 text-yellow-400"></span>
      {/* Blinking cursor */}
      <span className="hero-cursor opacity-0 inline-block w-1 h-7 md:h-8 ml-1 bg-yellow-400 animate-pulse"></span>
    </h2>
  );
};

// --- Updated Hero Component (Contains all animation logic) ---
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Data from animation_text.txt (Renamed staticSlogan to staticText for consistency)
  const quotes = [
    {
      staticText: "The Market ",
      animatedWords: ["Decoded", "Quantified", "Explained", "Simplified"],
    },
  ];

  useGSAP(
    () => {
      const random = gsap.utils.random;

      // --- 1. Sequential Typing Animation ---
      const masterTl = gsap.timeline({ delay: 0.5 }); // Master timeline for sequencing

      // Fade in the grid container first
      masterTl.fromTo(
        ".hero-quote-grid",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      const quoteElements = gsap.utils.toArray(".quote-item");

      quoteElements.forEach((element, index) => {
        const animatedText = (element as Element).querySelector(
          ".hero-animated-text"
        );
        const cursor = (element as Element).querySelector(".hero-cursor");
        const quoteData = quotes[index]; // Get the corresponding words

        if (animatedText && cursor && quoteData) {
          // Create a separate timeline for this single quote's animation
          const quoteTl = gsap.timeline({
            repeat: -1, // <-- CHANGE 1: Loop this timeline forever
          });

          // Make cursor and text area visible
          quoteTl.to([animatedText, cursor], { opacity: 1 }, 0);

          // Loop through words for this quote
          quoteData.animatedWords.forEach((word, wordIndex) => {
            quoteTl.to(animatedText, {
              text: word,
              duration: word.length * 0.12,
              ease: "none",
            });

            // <-- CHANGE 2: Removed 'if' condition to always backspace
            quoteTl.to(
              animatedText,
              {
                text: { value: "", rtl: true },
                duration: word.length * 0.08,
                ease: "power1.in",
              },
              "+=1.5" // Pause
            );
          });

          // <-- CHANGE 3: Removed the 'hide cursor' tween
          // quoteTl.to(cursor, { opacity: 0, duration: 0.3 });

          // Add this quote's timeline to the master timeline
          masterTl.add(quoteTl);
        }
      });

      // --- 2. Candle Animation (Unchanged, runs in parallel) ---
      const candles = gsap.utils.toArray(".shape");
      candles.forEach((candle) => {
        const body = (candle as Element).querySelector(".candle-body");
        const topWick = (candle as Element).querySelector(".candle-wick-top");
        const bottomWick = (candle as Element).querySelector(
          ".candle-wick-bottom"
        );

        const candleTl = gsap.timeline({
          repeat: -1,
          repeatDelay: random(1, 4),
          yoyo: true,
        });

        candleTl
          .to(
            body,
            {
              scaleY: random(0.2, 1.5),
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0
          )
          .to(
            topWick,
            {
              scaleY: random(0.1, 2),
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0
          )
          .to(
            bottomWick,
            {
              scaleY: random(0.1, 2),
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white py-24 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0  z-0 opacity-[0.07]">
        {/* ... svg pattern (static) ... */}
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

      {/* Animating StockCandles (Unchanged) */}
      <div className="absolute inset-0 z-0">
        <StockCandle className="top-[15%] left-[10%]" isPositive={true} />
        <StockCandle className="top-[30%] left-[80%]" isPositive={false} />
        <StockCandle className="top-[70%] left-[5%]" isPositive={false} />
        <StockCandle className="top-[10%] left-[70%]" isPositive={true} />
        <StockCandle className="top-[80%] left-[75%]" isPositive={false} />
        <StockCandle className="top-[50%] left-[40%]" isPositive={true} />
      </div>

      {/* --- NEW Content Layout --- */}
      <div className="container flex flex-col mx-auto px-4 relative z-10">
        {/* Grid for the 4 quotes */}
        <div className="hero-quote-grid mx-auto opacity-0 w-full">
          {quotes.map((quote, index) => (
            <AnimatedQuote key={index} staticText={quote.staticText} />
          ))}
          <h1
            style={{ fontFamily: "var(--font-oxygen)" }}
            className="text-center md:text-3xl mt-2 mb-1 text-2xl "
          >
            Research That Empowers Your Investments
          </h1>
          <h2  style={{fontFamily: "var(--font-inter)"}} className="text-center md:text-2xl text-gray-200 text-xl md:w-[70%] mx-auto mb-8">
            Empowering Investors with In-Depth Research, Actionable Insights,
            and Market Clarity
          </h2>

          {/* --- SEARCH BAR SECTION --- */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-500/50 p-4 rounded-lg border border-blue-100/50 shadow-xl backdrop-blur-sm">
              <div className="relative w-full flex-grow">
                <label htmlFor="home-search-input" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  id="home-search-input"
                  placeholder="Stocks , article, news etc"
                  className="w-full h-11 pl-10 pr-4 rounded-md text-sm text-primary placeholder:text-gray-400 bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all shadow-sm"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;