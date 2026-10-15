import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT:
      process.env.NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT ??
      process.env.REGISTRATION_SHEET_ENDPOINT ??
      "",
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?!(?:www\\.)?summits\\.ng$).*" }],
        destination: "https://summits.ng/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
