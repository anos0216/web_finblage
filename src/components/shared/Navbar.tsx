"use client";

import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MobileNav from './MobileNav';
import { FiMenu, FiX } from 'react-icons/fi';
import { accountMenu, groupedMenus } from '@/data/menus';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const { contextSafe } = useGSAP();

    const handleMouseEnter = contextSafe((menuName: string) => {
        // Find the specific submenu using a data attribute
        const submenu = `[data-submenu="${menuName}"]`;
        gsap.to(submenu, {
            opacity: 1,
            y: 0,
            display: 'block',
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    const handleMouseLeave = contextSafe((menuName: string) => {
        const submenu = `[data-submenu="${menuName}"]`;
        gsap.to(submenu, {
            opacity: 0,
            y: -10,
            display: 'none',
            duration: 0.3,
            ease: 'power2.in',
        });
    });

    return (
        <nav className='relative flex items-center justify-between lg:px-8 sm:px-5 py-4 px-3 bg-white shadow-md'>
            <div className='text-2xl font-bold text-gray-800'>
                <a href="/">Finblage</a>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center gap-x-8'>
                {groupedMenus.map((menu) => (
                    <div
                        key={menu.name}
                        className='relative'
                        onMouseEnter={() => menu.subMenus && handleMouseEnter(menu.name)}
                        onMouseLeave={() => menu.subMenus && handleMouseLeave(menu.name)}
                    >
                        {menu.path ? (
                            <a href={menu.path} className='text-gray-600 hover:text-blue-600 transition-colors duration-300'>
                                {menu.name}
                            </a>
                        ) : (
                            <span className='text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 flex items-center gap-x-1'>
                                {menu.name}
                            </span>
                        )}

                        {/* Dropdown Menu - Initially hidden via GSAP/inline style */}
                        {menu.subMenus && (
                            <div
                                data-submenu={menu.name}
                                className='absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20'
                                style={{ display: 'none', opacity: 0, transform: 'translateY(-10px)' }} // Initial state for GSAP
                            >
                                {menu.subMenus.map((subMenu) => (
                                    <a
                                        key={subMenu.name}
                                        href={subMenu.path}
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
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
            <div className='flex items-center gap-x-4'>
                <a href={accountMenu.path} className='hidden md:block text-gray-600 hover:text-blue-600 transition-colors duration-300'>
                    {accountMenu.name}
                </a>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className='lg:hidden text-2xl text-gray-700 z-50'
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Navigation */}
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