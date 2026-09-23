import type { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";
import { artist } from "@/lib/data";

export const metadata: Metadata = {
  title: `Gallery — ${artist.fullName}`,
};

export default function GalleryPage() {
  return <GalleryContent />;
}