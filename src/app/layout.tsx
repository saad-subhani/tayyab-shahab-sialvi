import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";

/**
 * Fraunces — warm, contemporary display serif. Variable + optical sizing so
 * strokes stay delicate at hero scale and firm at 20px.
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Inter Tight — slightly narrower than Inter; reads calmer in dense UI rows. */
const sans = Inter_Tight({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter-tight",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const description =
  "Official website of Muhammad Tayyab Shahab Sialvi — District Nazim, ATI Faisalabad; entrepreneur, education & social development professional and law student. Social work, career, businesses, projects, MOUs and media.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — District Nazim ATI Faisalabad | Entrepreneur | Law Student`,
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Muhammad Tayyab Shahab Sialvi",
    "Tayyab Shahab Sialvi",
    "District Nazim ATI Faisalabad",
    "Anjuman Talba Islam Faisalabad",
    "Shahab Group",
    "Shahab Foods",
    "Evergreen Talks",
    "THE CCIU",
    "Code Converse International University",
  ],
  openGraph: {
    title: site.name,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_PK",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
    images: ["/images/og.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "Tayyab Shahab Sialvi",
  jobTitle: "District Nazim, ATI Faisalabad",
  description: site.intro,
  url: siteUrl,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The Islamia University of Bahawalpur" },
    {
      "@type": "CollegeOrUniversity",
      name: "Government Graduate Islamia College Faisalabad",
    },
  ],
  affiliation: [
    { "@type": "Organization", name: "Anjuman Talba Islam (ATI), District Faisalabad" },
    { "@type": "Organization", name: "Shahab Group" },
    { "@type": "Organization", name: "Shahab Foods" },
    { "@type": "Organization", name: "Evergreen Talks" },
  ],
  knowsAbout: [
    "Education",
    "Social development",
    "Youth development",
    "Public relations",
    "Entrepreneurship",
    "Digital marketing",
  ],
  // NOTE: phone / email intentionally omitted from structured data (privacy).
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-xs focus:uppercase focus:tracking-[0.25em] focus:text-ink"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
