"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Globe2, Mail, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteInfo } from "@/lib/api";

export default function ContactContent() {
  const { t } = useLanguage();

  const [contactEmail, setContactEmail] = useState("bookings@jaemsndarukunda.com");
  const [contactPhone, setContactPhone] = useState("+250 700 000 000");
  const [based, setBased] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSiteInfo()
      .then(({ siteInfo }) => {
        if (!active) return;
        if (siteInfo.contactEmail) setContactEmail(siteInfo.contactEmail);
        if (siteInfo.contactPhone) setContactPhone(siteInfo.contactPhone);
        if (siteInfo.based) setBased(siteInfo.based);
        if (siteInfo.availability) setAvailability(siteInfo.availability);
      })
      .catch(() => {
        // API offline — fall back to defaults.
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
            <p className="section-eyebrow">{t("contact.eyebrow")}</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.02] tracking-wide text-white sm:text-6xl md:text-7xl">
              {t("contact.heading1")}{" "}
              <span className="text-[#c9962e]">{t("contact.heading2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm text-white/50 sm:text-base">
              {t("contact.desc")}
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
                    {t("contact.booking")}
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-white transition-colors hover:text-[#e0b04a]"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {t("contact.phone")}
                  </p>
                  <a
                    href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
                    className="font-semibold text-white transition-colors hover:text-[#e0b04a]"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {t("contact.based")}
                  </p>
                  <p className="font-semibold text-white">{based ?? t("contact.basedValue")}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {t("contact.avail")}
                  </p>
                  <p className="font-semibold text-white">
                    {availability ??
                      t("contact.availValue", { year: new Date().getFullYear() })}
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