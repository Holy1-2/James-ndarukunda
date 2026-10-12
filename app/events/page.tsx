import type { Metadata } from "next";
import EventsContent from "@/components/EventsContent";
import { ARTIST_FULL_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description: `Upcoming and past live performances, shows, and events featuring ${ARTIST_FULL_NAME}.`,
  path: "/events",
});

export default function EventsPage() {
  return <EventsContent />;
}