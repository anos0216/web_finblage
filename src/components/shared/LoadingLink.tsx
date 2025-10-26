"use client";

import React, { ReactNode } from 'react';
// FIX: Import Link from next/link
import Link, { LinkProps } from 'next/link';

// FIX: Extend LinkProps
interface LoadingLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  [key: string]: any; // Allow other props
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ 
  children, 
  className, 
  href, 
  ...props 
}) => {
  return (
    // FIX: Use the next/link component
    // The loading.tsx shimmer will still work correctly.
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

export default LoadingLink;