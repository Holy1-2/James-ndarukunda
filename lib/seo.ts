import type { Metadata } from "next";
import { ARTIST_FULL_NAME, OG_IMAGE, SITE_URL } from "@/lib/site";

interface PageSeo {
  title: string;
  description: string;
  path: "/" | `/${string}`;
}

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} | ${ARTIST_FULL_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: ARTIST_FULL_NAME,
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE, alt: ARTIST_FULL_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
