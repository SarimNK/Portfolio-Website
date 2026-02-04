import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "github.githubassets.com" },
    ],
  },
};

export default nextConfig;
