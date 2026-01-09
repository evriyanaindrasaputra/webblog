import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "tagiot-web.vercel.app",
      },
      {
        protocol: "https",
        hostname: "www.taggiot.com",
      },
      {
        protocol: "https",
        hostname: "mammothon.celestia.org",
      },
    ],
  },
};

export default nextConfig;
