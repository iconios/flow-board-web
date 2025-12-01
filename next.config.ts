/* eslint-disable @typescript-eslint/require-await */
import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const API_URL = isProduction
  ? "https://flow-board.onrender.com"
  : "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any request to /api/...
        destination: `${API_URL}/:path*`, // ...is sent to Express
      },
    ];
  },
};

export default nextConfig;
