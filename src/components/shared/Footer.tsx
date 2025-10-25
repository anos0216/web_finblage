import React from 'react';
import { groupedMenus } from '@/data/menus';
import LoadingLink from './LoadingLink';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Dynamically get the link groups from your menu data
  const insightsMenu = groupedMenus.find(m => m.name === "Insights")?.subMenus || [];
  const companyMenu = groupedMenus.find(m => m.name === "Company")?.subMenus || [];
  const mainLinks = groupedMenus.filter(m => m.path) || []; // News, Services, Blogs

  // Helper component for link lists
  const FooterLinkList: React.FC<{ title: string; links: { name: string; path: string }[] }> = ({ title, links }) => (
    <div>
      <h4 className="font-semibold text-lg mb-4 text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.name}>
            <LoadingLink 
              href={link.path} 
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              {link.name}
            </LoadingLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* 1. Brand/Logo Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">YourLogo</h3>
            <p className="text-gray-300 text-sm max-w-xs mb-6">
              Unlocking Financial Clarity. Your trusted source for market insights, news, and in-depth analysis.
            </p>
            <div className="flex space-x-4">
              <LoadingLink href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors"><Facebook size={22} /></LoadingLink>
              <LoadingLink href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors"><Twitter size={22} /></LoadingLink>
              <LoadingLink href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors"><Linkedin size={22} /></LoadingLink>
              <LoadingLink href="#" aria-label="YouTube" className="text-gray-300 hover:text-white transition-colors"><Youtube size={22} /></LoadingLink>
              <LoadingLink href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors"><Instagram size={22} /></LoadingLink>
            </div>
          </div>

          {/* 2. Main Links */}
          <FooterLinkList title="Explore" links={mainLinks} />

          {/* 3. Insights Links */}
          <FooterLinkList title="Insights" links={insightsMenu} />

          {/* 4. Company Links */}
          <FooterLinkList title="Company" links={companyMenu} />

        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} YourLogo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <LoadingLink href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</LoadingLink>
            <LoadingLink href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</LoadingLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;