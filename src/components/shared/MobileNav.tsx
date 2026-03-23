"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MenuItem, SubMenuItem } from '@/types/menu';
import MobileMenuItem from './MobileMenuItem';
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, LogIn, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavProps {
    menus: MenuItem[];
    account: SubMenuItem;
    onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ menus, account, onClose }) => {
    const { data: session } = useSession();
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // This hook manages the main slide-in and fade-in animations on mount
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".mobile-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });
        tl.fromTo(".mobile-panel", { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" }, "-=0.2");
    }, { scope: containerRef });

    // A GSAP-powered function to handle the closing animation
    const handleClose = () => {
        const tl = gsap.timeline({ onComplete: onClose }); // Call onClose only after animation finishes
        tl.to(".mobile-panel", { x: "100%", duration: 0.4, ease: "power3.in" });
        tl.to(".mobile-overlay", { opacity: 0, duration: 0.3 }, "-=0.2");
    };

    const toggleAccordion = (name: string) => {
        setOpenAccordion(prev => (prev === name ? null : name));
    };

    return (
        <div ref={containerRef} className='fixed inset-0 z-40 md:hidden'>
            {/* Overlay */}
            <div className='mobile-overlay fixed inset-0 bg-black bg-opacity-50' onClick={handleClose} />
            
            {/* Sliding Panel */}
            <div 
                className='mobile-panel fixed top-0 right-0 h-full w-[75%] sm:w-[60%] bg-white shadow-xl p-6'
            >
                <div className='flex flex-col h-full'>
                    {/* Navigation Items */}
                    <div className='flex flex-col gap-y-6 text-lg overflow-y-auto pb-8'>
                        {menus.map((menu) => (
                            <MobileMenuItem
                                key={menu.name}
                                menu={menu}
                                isOpen={openAccordion === menu.name}
                                onClick={() => menu.subMenus && toggleAccordion(menu.name)}
                            />
                        ))}
                    </div>

                    {/* Bottom Auth Section */}
                    <div className='mt-auto pt-6 border-t border-gray-100'>
                        {session ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <Avatar className="h-10 w-10 border border-white shadow-sm">
                                        <AvatarImage src={session.user?.image || ""} />
                                        <AvatarFallback className="bg-emerald-500 text-white">
                                            {session.user?.name?.substring(0, 2).toUpperCase() || "FB"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900 leading-none">{session.user?.name}</span>
                                        <span className="text-xs text-gray-500 mt-1">{session.user?.email}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <a 
                                        href="/account" 
                                        className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        onClick={onClose}
                                    >
                                        <div className="flex items-center gap-2">
                                            <User size={18} className="text-emerald-500" />
                                            <span className="text-sm font-medium">My Account</span>
                                        </div>
                                        <ChevronRight size={14} className="text-gray-400" />
                                    </a>
                                    <button 
                                        onClick={() => {
                                            signOut();
                                            onClose();
                                        }}
                                        className="flex items-center gap-2 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-medium">Log out</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <a 
                                href="/login" 
                                onClick={onClose}
                                className='flex items-center justify-center gap-2 w-full p-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]'
                            >
                                <LogIn size={20} />
                                Sign In to Finblage
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;