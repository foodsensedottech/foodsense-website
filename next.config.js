/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'downloads.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'assets.ctfassets.net',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Ignore punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];

    // Disable webpack caching in development
    if (dev) {
      config.cache = false;
    }

    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig 