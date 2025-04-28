import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // Protocol of the URL (http or https)
                hostname: "static.wikia.nocookie.net", // The hostname of the URL
                pathname: "/**", // Matches all paths under this hostname
            }
        ]
    }
};

export default nextConfig;
