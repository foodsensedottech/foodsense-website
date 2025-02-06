/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    domains: ['images.unsplash.com'],
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion', '@radix-ui/react-*'],
  },
  poweredByHeader: false,
  generateEtags: false,
  typescript: {
    // !! WARN !!
    // This will suppress all TypeScript errors during build
    // Remove this when you want to enforce strict type checking
    ignoreBuildErrors: true,
  },
};

export default withBundleAnalyzer(nextConfig); 