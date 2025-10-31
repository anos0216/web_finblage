"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin"; // Import TextPlugin

// Register the plugin
gsap.registerPlugin(TextPlugin);

// --- New StockCandle Component ---
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

// --- Updated Hero Component ---
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const random = gsap.utils.random;

      // --- 1. Typing Animation ---
      const titleEl = containerRef.current?.querySelector(".hero-title");
      const subtitleEl = containerRef.current?.querySelector(".hero-subtitle");

      if (titleEl && subtitleEl) {
        // Store original text
        const titleText = titleEl.textContent;
        const subtitleText = subtitleEl.textContent;
        
        // Clear text content to prepare for typing
        titleEl.textContent = "";
        subtitleEl.textContent = "";

        const textTl = gsap.timeline();
        textTl
          .to(titleEl, {
            duration: titleText!.length * 0.07, // Adjust speed
            text: titleText,
            ease: "none",
          })
          .to(
            subtitleEl,
            {
              duration: subtitleText!.length * 0.04, // Adjust speed
              text: subtitleText,
              ease: "none",
            },
            "-=0.5" // Start subtitle slightly before title finishes
          );
      }

      // --- 2. Candle Animation ---
      const candles = gsap.utils.toArray(".shape");
      candles.forEach((candle) => {
        const body = (candle as Element).querySelector(".candle-body");
        const topWick = (candle as Element).querySelector(".candle-wick-top");
        const bottomWick = (candle as Element).querySelector(".candle-wick-bottom");

        // Create a unique, repeating timeline for each candle
        const candleTl = gsap.timeline({
          repeat: -1,
          repeatDelay: random(1, 4), // Wait a random time before repeating
          yoyo: true, // Animate back and forth
        });

        candleTl
          .to(
            body,
            {
              scaleY: random(0.2, 1.5), // Randomly scale body height
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0 // Start at the beginning
          )
          .to(
            topWick,
            {
              scaleY: random(0.1, 2), // Randomly scale top wick
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0 // Start at the same time
          )
          .to(
            bottomWick,
            {
              scaleY: random(0.1, 2), // Randomly scale bottom wick
              duration: random(1, 3),
              ease: "power1.inOut",
            },
            0 // Start at the same time
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white py-16 md:py-24 overflow-hidden"
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

      {/* FIX: Replaced TickerShapes with animating StockCandles */}
      <div className="absolute inset-0 z-0">
        <StockCandle className="top-[15%] left-[10%]" isPositive={true} />
        <StockCandle className="top-[30%] left-[80%]" isPositive={false} />
        <StockCandle className="top-[70%] left-[5%]" isPositive={false} />
        <StockCandle className="top-[10%] left-[70%]" isPositive={true} />
        <StockCandle className="top-[80%] left-[75%]" isPositive={false} />
        <StockCandle className="top-[50%] left-[40%]" isPositive={true} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight mb-4 min-h-[4rem] md:min-h-[5rem]">
          Unlocking Financial Clarity
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 min-h-[6rem]">
          Your trusted source for market insights, news, and in-depth analysis
          to guide your investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Hero;