import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "The End of Manual | OPEX Executive Workshop & Summit 2026",
  description:
    "An invitation-only executive workshop and summit on AI, connected systems and the future of financial reporting and compliance.",
  icons: {
    icon: "/images/opexwhite.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
