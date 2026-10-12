import type { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";
import { ARTIST_FULL_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: `Browse photos of ${ARTIST_FULL_NAME} performing live, in the studio, and behind the scenes.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return <GalleryContent />;
}