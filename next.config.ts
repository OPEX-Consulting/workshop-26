import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "^(?!www\\.)?(?!summits\\.ng$).*",
          },
        ],
        destination: "https://summits.ng/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
