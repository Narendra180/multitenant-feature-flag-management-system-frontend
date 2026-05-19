import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "root.narendrak.in",
    "coastal-aqua.narendrak.in",
    "apex-elec.narendrak.in",
    "urban-decor.narendrak.in"
  ],
  output: "standalone"
};

export default nextConfig;
