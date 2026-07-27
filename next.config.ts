import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 narrowed the default to `[75]`, which silently coerced the
    // `quality` props already used by the hero and section backgrounds.
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.ashipaelectric.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
