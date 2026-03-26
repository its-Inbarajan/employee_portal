import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth).*)", // skip /api/auth/* routes
        destination: "http://localhost:4050/api/v1/:path*",
      },
    ];
  },
};
export default nextConfig;
