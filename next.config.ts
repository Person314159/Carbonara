import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    basePath: "/Carbonara",
    output: "export",
    images: { unoptimized: true },
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ["@mantine/core"],
    },
};

export default nextConfig;
