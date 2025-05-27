import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 This is what enables `next export`
  reactStrictMode: true, // Optional: helpful in dev
};

export default nextConfig;