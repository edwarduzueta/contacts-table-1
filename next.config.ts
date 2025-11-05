import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'philipmjohnson.github.io' },
      { protocol: 'https', hostname: 'henricasanova.github.io' }
    ],
  },
};

export default nextConfig;
