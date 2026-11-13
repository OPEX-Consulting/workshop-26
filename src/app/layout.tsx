import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import "./globals.css";

const siteUrl = "https://summits.ng";
const eventTitle = "From Manual Risk Assessment to Intelligent Risk Operations";
const eventDescription =
  "Explore how AI is transforming enterprise risk management in financial institutions.";
const flyerImage = "/images/webinarflyer.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${eventTitle} | OPEX`,
    template: "%s | OPEX",
  },

  description: `${eventDescription} Join OPEX live on Zoom on Thursday, 19 November 2026, at 11:00 AM WAT.`,

  applicationName: "OPEX Consulting",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "AI in enterprise risk management",
    "intelligent risk operations",
    "AI risk assessment",
    "financial services risk management",
    "financial institution compliance",
    "automated risk assessment",
    "enterprise risk management webinar",
    "OPEX Consulting",
  ],

  authors: [{ name: "OPEX Consulting" }],
  creator: "OPEX Consulting",
  publisher: "OPEX Consulting",

  icons: {
    icon: "/images/opexwhite.webp",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OPEX Consulting",
    locale: "en_NG",
    title: eventTitle,
    description: eventDescription,
    images: [
      {
        url: flyerImage,
        width: 1200,
        height: 630,
        alt: "OPEX webinar: From Manual Risk Assessment to Intelligent Risk Operations",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: eventTitle,
    description: eventDescription,
    images: [flyerImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
