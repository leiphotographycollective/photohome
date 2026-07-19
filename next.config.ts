import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
