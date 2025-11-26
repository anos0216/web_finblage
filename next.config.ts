import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      {
        // For IPO images (e.g., Tata Capital)
        protocol: 'https',
        hostname: 'd1tymi9mhi46bx.cloudfront.net',
        port: '',
        pathname: '/cmot-logos/**',
      },
           {
        // For IPO images (e.g., Tata Capital)
        protocol: 'https',
        hostname: 'companieslogo.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      // Add this new pattern for Wix images
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
