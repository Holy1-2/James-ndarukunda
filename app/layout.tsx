import type { Metadata } from "next";
import { Bebas_Neue, Dancing_Script, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import VisitTracker from "@/components/VisitTracker";
import { socialLinks } from "@/lib/data";
import {
  ARTIST_FULL_NAME,
  ARTIST_SHORT_TITLE,
  OG_IMAGE,
  SITE_URL,
} from "@/lib/site";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const signature = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-signature",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const description = `${ARTIST_FULL_NAME} is a Rwandan poet and the founder of IMIKARAGO POETS GROUP. Poetry that preserves culture and delivers meaningful messages.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ARTIST_FULL_NAME} — ${ARTIST_SHORT_TITLE}`,
    template: `%s | ${ARTIST_FULL_NAME}`,
  },
  description,
  keywords: [
    "James Ndarukunda",
    "Jaems",
    "Rwandan artist",
    "Rwandan poet",
    "ibisigo",
    "Rwandan culture",
    "IMIKARAGO POETS GROUP",
    "Kinyarwanda poetry",
  ],
  authors: [{ name: ARTIST_FULL_NAME }],
  creator: ARTIST_FULL_NAME,
  publisher: ARTIST_FULL_NAME,
  category: "music",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: ARTIST_FULL_NAME,
    title: `${ARTIST_FULL_NAME} — ${ARTIST_SHORT_TITLE}`,
    description,
    images: [
      {
        url: OG_IMAGE,
        alt: ARTIST_FULL_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTIST_FULL_NAME} — ${ARTIST_SHORT_TITLE}`,
    description,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: ARTIST_FULL_NAME,
      description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: ARTIST_FULL_NAME,
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      jobTitle: ARTIST_SHORT_TITLE,
      sameAs: socialLinks.map((link) => link.url),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${signature.variable} ${body.variable} antialiased bg-[#050505] text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <VisitTracker />
      </body>
    </html>
  );
}