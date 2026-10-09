import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://workshop.opexconsult.com"),

  title: "The End of Manual | OPEX Executive Workshop & Summit 2026",

  description:
    "An invitation-only executive workshop and summit on AI, connected systems and the future of financial reporting and compliance.",

  icons: {
    icon: "/images/opexwhite.webp",
  },

  openGraph: {
    title: "The End of Manual | OPEX Executive Workshop & Summit 2026",
    description:
      "An invitation-only executive workshop and summit on AI, connected systems and the future of financial reporting and compliance.",
    url: "https://workshop.opexconsult.com/",
    siteName: "OPEX Executive Workshop & Summit 2026",
    images: [
      {
        url: "/images/newflier.jpeg",
        width: 1200,
        height: 630,
        alt: "OPEX Executive Workshop & Summit 2026",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The End of Manual | OPEX Executive Workshop & Summit 2026",
    description:
      "An invitation-only executive workshop and summit on AI, connected systems and the future of financial reporting and compliance.",
    images: ["/images/newflier.jpeg"],
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
