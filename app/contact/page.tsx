import { CalendarDays, Globe2, Mail, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { artist } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact — ${artist.fullName}`,
};

export default function ContactPage() {
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
            <p className="section-eyebrow">Contact</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.02] tracking-wide text-white sm:text-6xl md:text-7xl">
              Let&apos;s Create Something <span className="text-[#c9962e]">Meaningful.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm text-white/50 sm:text-base">
              For bookings, event performances, brand collaborations, media
              interviews and everything in between — the line is always open.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Booking &amp; Management
                  </p>
                  <a
                    href="mailto:bookings@jaemsndarukunda.com"
                    className="font-semibold text-white transition-colors hover:text-[#e0b04a]"
                  >
                    bookings@jaemsndarukunda.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Phone / WhatsApp
                  </p>
                  <a
                    href="tel:+250700000000"
                    className="font-semibold text-white transition-colors hover:text-[#e0b04a]"
                  >
                    +250 700 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Based in
                  </p>
                  <p className="font-semibold text-white">Rwanda · East Africa</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Availability
                  </p>
                  <p className="font-semibold text-white">
                    {new Date().getFullYear()} Tour &amp; Show Dates
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}