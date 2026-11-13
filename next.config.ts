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
};

export default nextConfig;
