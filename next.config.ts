import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    basePath: "/Carbonara",
    output: "export",
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ["@mantine/core"],
    },
    allowedDevOrigins: ["100.122.107.157", "http://100.122.107.157:8080"],
};

export default nextConfig;
