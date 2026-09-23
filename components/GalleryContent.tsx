"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PhotoGallery from "@/components/PhotoGallery";
import { useLanguage } from "@/components/LanguageProvider";

export default function GalleryContent() {
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

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40">
        <Reveal>
          <div className="text-center">
            <p className="section-eyebrow">{t("gallery.eyebrow")}</p>
            <h1 className="font-display mt-5 text-5xl tracking-wide text-white sm:text-6xl md:text-7xl">
              {t("gallery.heading")}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm italic text-white/50 sm:text-base">
              {t("gallery.desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-16 sm:mt-20">
          <PhotoGallery />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}