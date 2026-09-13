import Link from "next/link";
import { Armchair, CalendarDays, Mic2, Music2, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoCarousel from "@/components/PhotoCarousel";
import Reveal from "@/components/Reveal";
import { artist } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About — ${artist.fullName}`,
};

const FACTS = [
  { icon: Mic2, label: "Genre", value: "Afrobeat · Soul · R&B" },
  { icon: Sparkles, label: "Origin", value: "Rwanda" },
  { icon: CalendarDays, label: "Active since", value: "2016" },
  { icon: Armchair, label: "Based in", value: "East Africa" },
];

export default function BioPage() {
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
          <p className="section-eyebrow">About the Artist</p>
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
          <p className="section-eyebrow text-center">About Jaems</p>
          <h2 className="font-display mt-5 text-center text-3xl leading-[1.05] tracking-wide text-white sm:text-5xl">
            The Journey, The Music,
            <span className="text-[#c9962e]"> The Mission.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-white/80 sm:text-lg">
            <p>{artist.shortBio}</p>
            <p className="text-white/65">
              From church choirs to street radios to packed arenas — every song
              is a letter written to the heart. James believes the stage is a
              home, and everyone listening is family.
            </p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-6 text-center transition-colors duration-300 hover:border-[#c9962e]/40"
              >
                <Icon className="h-4 w-4 text-[#c9962e]" />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ THE ARTIST IN FRAMES ============ */}
      <section className="relative z-10 border-t border-white/10 bg-black/30 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center">
              <p className="section-eyebrow">The Artist</p>
              <h2 className="font-display mt-4 text-3xl tracking-wide text-white sm:text-5xl">
                IN FRAMES
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-[#c9962e]/70" />
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-12 sm:mt-16">
            <PhotoCarousel />
          </Reveal>
        </div>
      </section>

      {/* ============ MILESTONES ============ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <h2 className="section-eyebrow">Milestones</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ol className="mt-10 border-l border-white/15">
            {artist.history.map((item) => (
              <li key={item.year} className="relative pb-12 pl-9 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#c9962e] ring-4 ring-[#c9962e]/20" />
                <p className="font-display text-2xl tracking-wide text-white/90">
                  {item.year}
                </p>
                <p className="mt-1.5 text-base font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/65">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative z-10 px-6 pb-28 text-center sm:pb-36">
        <Reveal>
          <Link href="/music" className="btn-gold">
            <Music2 className="h-4 w-4" />
            LISTEN TO MY MUSIC
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}