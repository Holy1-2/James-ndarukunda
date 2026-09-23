"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getEvents } from "@/lib/api";
import type { EventItem } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";

export default function EventsContent() {
  const { t, locale } = useLanguage();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getEvents()
      .then(({ events: items }) => {
        if (active) setEvents(items);
      })
      .catch(() => {
        // API offline — fall back to the empty state.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(201,150,46,0.08), transparent 70%)",
        }}
      />
      <Nav />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
        <Reveal>
          <div className="text-center">
            <p className="section-eyebrow">{t("events.eyebrow")}</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.02] tracking-wide text-white sm:text-6xl md:text-7xl">
              {t("events.heading")}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm italic text-white/50 sm:text-base">
              {t("events.desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-16">
            {loading ? (
              <p className="py-20 text-center text-sm text-white/40">
                Loading events…
              </p>
            ) : events.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-[#c9962e]/70" />
                <p className="mt-5 text-sm text-white/60">{t("events.empty")}</p>
              </div>
            ) : (
              <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  const date = new Date(event.date);
                  return (
                    <li
                      key={event._id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9962e]/60 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
                    >
                      <div className="flex items-center gap-4 border-b border-white/10 bg-[#c9962e]/[0.06] px-6 py-5">
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-[#c9962e]/40 bg-black/40">
                          <span className="font-display text-2xl leading-none text-[#e0b04a]">
                            {date.getDate()}
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                            {date
                              .toLocaleDateString(locale, { month: "short" })
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c9962e]">
                            {date.toLocaleDateString(locale, {
                              weekday: "long",
                            })}
                          </p>
                          <p className="text-sm text-white/70">
                            {date.getFullYear()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <h2 className="font-display text-2xl leading-tight tracking-wide text-white transition-colors group-hover:text-[#e0b04a]">
                          {event.title}
                        </h2>
                        {event.location && (
                          <p className="flex items-center gap-2 text-sm text-white/60">
                            <MapPin className="h-4 w-4 shrink-0 text-[#c9962e]" />
                            {event.location}
                          </p>
                        )}
                        {event.description && (
                          <p className="text-sm leading-relaxed text-white/60">
                            {event.description}
                          </p>
                        )}
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9962e] transition-colors hover:text-[#e0b04a]"
                          >
                            {t("events.tickets")}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}