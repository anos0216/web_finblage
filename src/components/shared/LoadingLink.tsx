"use client";

import React, { ReactNode } from 'react';
// import Link, { LinkProps } from 'next/link'; // No longer using next/link

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string; // Ensure href is explicitly required
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ 
  children, 
  className, 
  href, 
  ...props 
}) => {
  return (
    // Use a standard <a> tag to force a full-page reload,
    // which allows the loading.tsx shimmer to display.
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

export default LoadingLink;