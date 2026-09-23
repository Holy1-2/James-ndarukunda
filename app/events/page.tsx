import type { Metadata } from "next";
import EventsContent from "@/components/EventsContent";
import { artist } from "@/lib/data";

export const metadata: Metadata = {
  title: `Events — ${artist.fullName}`,
};

export default function EventsPage() {
  return <EventsContent />;
}