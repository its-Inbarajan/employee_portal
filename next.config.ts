import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth).*)",  // skip /api/auth/* routes
        destination: "http://localhost:4050/api/v1/:path*",
      },
    ];
  },
};
export default nextConfig;
