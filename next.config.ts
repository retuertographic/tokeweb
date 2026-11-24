import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Match the WordPress source, whose pages all live at "/slug/".
  trailingSlash: true,
};

export default nextConfig;
