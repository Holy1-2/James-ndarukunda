import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { artist } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact — ${artist.fullName}`,
};

export default function ContactPage() {
  return <ContactContent />;
}