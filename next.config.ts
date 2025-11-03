import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* existing config options */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true, // ✅ Enable CSS optimization to reduce preload warnings
  },
};

export default nextConfig;
