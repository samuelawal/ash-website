import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
