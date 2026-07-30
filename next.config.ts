// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allows hot-reloading when accessing via local IP
  allowedDevOrigins: ['192.168.1.8'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;