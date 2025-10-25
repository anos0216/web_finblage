import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MenuItem } from '@/types/menu';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface MobileMenuItemProps {
    menu: MenuItem;
    isOpen: boolean;
    onClick: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ menu, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // useGSAP handles the animation and automatically cleans up on unmount
    useGSAP(() => {
        gsap.to(contentRef.current, {
            height: isOpen ? "auto" : 0,
            duration: 0.4,
            ease: "power2.inOut",
        });
    }, { dependencies: [isOpen] });

    return (
        <div>
            {menu.subMenus ? (
                // This is an accordion item
                <div>
                    <div
                        onClick={onClick}
                        className='flex justify-between items-center cursor-pointer text-gray-800 font-medium'
                    >
                        <span>{menu.name}</span>
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                    {/* The animated container */}
                    <div ref={contentRef} className="h-0 overflow-hidden">
                        <div className='pl-4 pt-3 flex flex-col gap-y-3'>
                            {menu.subMenus.map((subMenu) => (
                                <a key={subMenu.name} href={subMenu.path} className='text-gray-600 hover:text-blue-600'>
                                    {subMenu.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // This is a simple link
                <a href={menu.path} className='text-gray-800 font-medium hover:text-blue-600'>
                    {menu.name}
                </a>
            )}
        </div>
    );
};

export default MobileMenuItem;