"use client";

import Link from "next/link";
import { Music2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { artist } from "@/lib/data";
import type { TranslationKey } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";

const MILESTONE_KEYS: { title: TranslationKey; text: TranslationKey }[] = [
  { title: "milestones.1Title", text: "milestones.1Text" },
  { title: "milestones.2Title", text: "milestones.2Text" },
  { title: "milestones.3Title", text: "milestones.3Text" },
];

export default function BioContent() {
  const { t } = useLanguage();

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

      {/* ============ HEADER ============ */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-32 text-center sm:pt-40">
        <Reveal>
          <p className="section-eyebrow">{t("about.eyebrow")}</p>
          <h1 className="font-display mt-5 text-[13vw] leading-[0.85] text-white sm:text-8xl md:text-9xl">
            {artist.firstName.toUpperCase()}
          </h1>
          <p className="mt-4 text-lg tracking-[0.28em] text-[#c9962e] sm:text-xl">
            {artist.surname.toUpperCase().split("").join(" ")}
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[#c9962e]/70" />
        </Reveal>
      </section>

      {/* ============ THE STORY ============ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-20 sm:pb-28 sm:pt-24">
        <Reveal>
          <p className="section-eyebrow text-center">{t("about.eyebrowJaems")}</p>
          <h2 className="font-display mt-5 text-center text-3xl leading-[1.05] tracking-wide text-white sm:text-5xl">
            {t("about.heading1")} <span className="text-[#c9962e]">{t("about.heading2")}</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-white/80 sm:text-lg">
            <p>{t("about.story1")}</p>
            <p className="text-white/65">{t("about.story2")}</p>
          </div>
        </Reveal>
      </section>

      {/* ============ MILESTONES ============ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <h2 className="section-eyebrow">{t("milestones.title")}</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ol className="mt-10 border-l border-white/15">
            {artist.history.map((item, i) => {
              const keys = MILESTONE_KEYS[i] ?? MILESTONE_KEYS[0];
              return (
                <li key={`${item.year}-${i}`} className="relative pb-12 pl-9 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#c9962e] ring-4 ring-[#c9962e]/20" />
                  <p className="font-display text-2xl tracking-wide text-white/90">
                    {item.year}
                  </p>
                  <p className="mt-1.5 text-base font-semibold text-white">
                    {t(keys.title)}
                  </p>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/65">
                    {t(keys.text)}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative z-10 px-6 pb-28 text-center sm:pb-36">
        <Reveal>
          <Link href="/music" className="btn-gold">
            <Music2 className="h-4 w-4" />
            {t("cta.listen")}
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}