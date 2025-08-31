import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    basePath: "/Carbonara",
    output: "export",
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ["@mantine/core"]
    }
};

export default nextConfig;
