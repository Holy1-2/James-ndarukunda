import type { Metadata } from "next";
import BioContent from "@/components/BioContent";
import { ARTIST_FULL_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Learn about ${ARTIST_FULL_NAME} — a Rwandan poet, performer, and founder of IMIKARAGO POETS GROUP preserving culture through ibisigo.`,
  path: "/bio",
});

export default function BioPage() {
  return <BioContent />;
}