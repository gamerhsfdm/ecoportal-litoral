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
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.viajeparana.com",
      },
      {
        protocol: "https",
        hostname: "viajeparana.com",
      },
      {
        protocol: "https",
        hostname: "www.pontaldoparana.pr.gov.br",
      },
      {
        protocol: "https",
        hostname: "pontaldoparana.pr.gov.br",
      },
      {
        protocol: "https",
        hostname: "www.paranagua.pr.gov.br",
      },
      {
        protocol: "https",
        hostname: "paranagua.pr.gov.br",
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
