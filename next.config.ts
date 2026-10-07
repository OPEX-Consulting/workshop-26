import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // The Vercel project already defines REGISTRATION_SHEET_ENDPOINT (legacy Vite app).
  // Inline it at build time so the client-side form can read it.
  env: {
    NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT:
      process.env.NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT ??
      process.env.REGISTRATION_SHEET_ENDPOINT ??
      "",
  },
};

export default nextConfig;
