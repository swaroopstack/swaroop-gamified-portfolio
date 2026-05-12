import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [...(config.externals ?? []), "phaser"];
    }

    return config;
  },
};

export default nextConfig;