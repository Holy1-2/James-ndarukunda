import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PhotoGallery from "@/components/PhotoGallery";
import { artist } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Gallery — ${artist.fullName}`,
};

export default function GalleryPage() {
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
            <p className="section-eyebrow">Gallery</p>
            <h1 className="font-display mt-5 text-5xl tracking-wide text-white sm:text-6xl md:text-7xl">
              Moments &amp; Vibes
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm italic text-white/50 sm:text-base">
              Frames from the studio, the stage, and everything in between.
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