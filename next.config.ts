import type { NextConfig } from "next";
import * as dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const API_URL = isProduction
  ? "https://my-awesome-api.herokuapp.com"
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
