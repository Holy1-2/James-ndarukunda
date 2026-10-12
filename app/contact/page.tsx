import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { ARTIST_FULL_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${ARTIST_FULL_NAME} for bookings, collaborations, and media enquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}