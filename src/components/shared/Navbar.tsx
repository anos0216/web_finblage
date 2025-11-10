"use client";

import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MobileNav from "./MobileNav";
import { FiMenu, FiX } from "react-icons/fi";
import { accountMenu, groupedMenus } from "@/data/menus";
import { usePathname } from "next/navigation"; // <-- IMPORT
import { cn } from "@/lib/utils"; // <-- IMPORT

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { contextSafe } = useGSAP();

  // --- ADDED ROUTE-AWARE LOGIC ---
  const pathname = usePathname();
  // Paths that have a "List Hero"
  const listHeroPaths = [
    "/news",
    "/market-insights",
    "/market-outlook",
    "/merger-acquisition",
    "/spotlight",
  ];
  // Prefixes for pages that have a "Detail Hero"
  const detailHeroPrefixes = [
    "/news/",
    "/market-insights/",
    "/market-outlook/",
    "/merger-acquisition/",
    "/spotlight/",
    "/market/ipo/",
  ];

  const isListHero = listHeroPaths.includes(pathname);
  const isDetailHero = detailHeroPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isHomePage = pathname === "/";

  // Any of these pages should have an overlay-style navbar
  const isOverlayRoute = isHomePage || isListHero || isDetailHero;

  // Conditionally set classes
  const navClasses = cn(
    "flex z-40 w-full items-center justify-between lg:px-8 sm:px-5 py-4 px-3 transition-all duration-300 h-18", // <-- FIXED HEIGHT h-18 (72px)
    {
      "absolute top-0 left-0 text-white border-b border-white/20 bg-transparent":
        isOverlayRoute,
      "sticky top-0 left-0 text-gray-800 border-b border-gray-200 bg-white shadow-sm":
        !isOverlayRoute,
    }
  );

  const linkColor = isOverlayRoute
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-primary";
  const mobileIconColor = isOverlayRoute
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-primary";
  // --- END ROUTE-AWARE LOGIC ---

  const handleMouseEnter = contextSafe((menuName: string) => {
    // ... (rest of function is unchanged)
    const submenu = `[data-submenu="${menuName}"]`;
    gsap.to(submenu, {
      opacity: 1,
      y: 0,
      display: "block",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe((menuName: string) => {
    // ... (rest of function is unchanged)
    const submenu = `[data-submenu="${menuName}"]`;
    gsap.to(submenu, {
      opacity: 0,
      y: -10,
      display: "none",
      duration: 0.3,
      ease: "power2.in",
    });
  });

  return (
    <nav
      className={navClasses} // <-- Use the conditional classes
    >
      <div className="text-2xl z-20 font-bold">
        <a href="/">Finblage</a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-x-8">
        {groupedMenus.map((menu) => (
          <div
            key={menu.name}
            className="relative"
            onMouseEnter={() => menu.subMenus && handleMouseEnter(menu.name)}
            onMouseLeave={() => menu.subMenus && handleMouseLeave(menu.name)}
          >
            {menu.path ? (
              <a
                href={menu.path}
                className={cn("transition-colors duration-300", linkColor)} // <-- Use conditional color
              >
                {menu.name}
              </a>
            ) : (
              <span
                className={cn(
                  "cursor-pointer transition-colors duration-300 flex items-center gap-x-1",
                  linkColor // <-- Use conditional color
                )}
              >
                {menu.name}
              </span>
            )}

            {/* Dropdown Menu (unchanged) */}
            {menu.subMenus && (
              <div
                data-submenu={menu.name}
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-[100]"
                style={{
                  display: "none",
                  opacity: 0,
                  transform: "translateY(-10px)",
                }}
              >
                {menu.subMenus.map((subMenu) => (
                  <a
                    key={subMenu.name}
                    href={subMenu.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subMenu.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Account Link & Mobile Menu Trigger */}
      <div className="flex items-center z-20 gap-x-4">
        <a
          href={accountMenu.path}
          className={cn(
            "hidden md:block transition-colors duration-300",
            linkColor // <-- Use conditional color
          )}
        >
          {accountMenu.name}
        </a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden text-2xl z-50 transition-colors duration-300",
            mobileIconColor // <-- Use conditional color
          )}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation (unchanged) */}
      {isMobileMenuOpen && (
        <MobileNav
          menus={groupedMenus}
          account={accountMenu}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;