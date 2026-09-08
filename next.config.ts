import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the X-Powered-By: Next.js header for security
  poweredByHeader: false,

  // Allow images served from Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
