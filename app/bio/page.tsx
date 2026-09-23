import type { Metadata } from "next";
import BioContent from "@/components/BioContent";
import { artist } from "@/lib/data";

export const metadata: Metadata = {
  title: `About — ${artist.fullName}`,
};

export default function BioPage() {
  return <BioContent />;
}