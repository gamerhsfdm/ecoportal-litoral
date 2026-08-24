import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.maptiler.com",
      },
      {
        protocol: "https",
        hostname: "server.arcgisonline.com",
      },
      {
        protocol: "https",
        hostname: "*.basemaps.cartocdn.com",
      },
    ],
  },
};

export default nextConfig;
