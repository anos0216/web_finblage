"use client";

import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MobileNav from "./MobileNav";
import { FiMenu, FiX } from "react-icons/fi";
import { accountMenu, groupedMenus } from "@/data/menus";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, LogIn } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();

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
    "/login",
    "/signup",
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
    "flex z-40 w-full items-center justify-between lg:px-8 sm:px-5 px-3 transition-all duration-300 h-18", // <-- FIX: Changed py-4 to py-2
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
      
          <div className="flex items-center gap-3 relative z-20">
            <Link href="/" className="flex items-center gap-0 transition-transform duration-300 hover:scale-[1.02] group">
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                height={80}
                width={80}
                priority
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md -ml-8">
                Finblage
              </span>
            </Link>
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
        {session ? (
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  <Avatar className="h-9 w-9 border border-gray-200 shadow-sm">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                    <AvatarFallback className="bg-emerald-500 text-white text-xs">
                      {session.user?.name?.substring(0, 2).toUpperCase() || "FB"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-gray-100">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-gray-500">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100 mx-1" />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                    <User className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Profile Info</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                    <Settings className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Preferences</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100 mx-1" />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="flex items-center px-3 py-2 cursor-pointer rounded-lg hover:bg-red-50 text-red-600 transition-colors focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link
            href="/login"
            className={cn(
              "hidden md:flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ml-8 duration-300 border backdrop-blur-md",
              isOverlayRoute 
                ? "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30" 
                : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-500/20 border-emerald-500"
            )}
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "md:hidden text-2xl z-50 transition-colors duration-300",
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