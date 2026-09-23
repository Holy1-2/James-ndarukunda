"use client";

import { Play } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { CHANNEL_URL } from "@/lib/youtube";
import type { YouTubeVideo } from "@/lib/youtube";
import { useLanguage } from "@/components/LanguageProvider";

function formatViews(views: string | undefined, t: ReturnType<typeof useLanguage>["t"]): string {
  if (!views) return "";
  const n = Number(views);
  if (Number.isNaN(n)) return "";
  return `${new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n)} ${t("music.views")}`;
}

function formatDate(publishedAt: string, locale: string): string {
  try {
    return new Date(publishedAt).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
    });
  } catch {
    return new Date(publishedAt).toLocaleDateString("en", {
      year: "numeric",
      month: "short",
    });
  }
}

export default function MusicContent({ videos }: { videos: YouTubeVideo[] }) {
  const { t, locale } = useLanguage();
  const hasRealVideos = videos.some((v) => v.id !== "placeholder-1");
  const [featured, ...rest] = videos;

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
            <p className="section-eyebrow">{t("music.eyebrow")}</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.02] tracking-wide text-white sm:text-6xl md:text-7xl">
              {t("music.heading1")}{" "}
              <span className="text-[#c9962e]">{t("music.heading2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm italic text-white/50 sm:text-base">
              {t("music.desc")}
            </p>
          </div>
        </Reveal>

        {!hasRealVideos && (
          <Reveal>
            <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-[#c9962e]/30 bg-[#c9962e]/[0.06] px-5 py-4 text-sm text-white/70">
              Connect this page to the artist&apos;s real channel by setting the{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-[#e0b04a]">
                YOUTUBE_CHANNEL_ID
              </code>{" "}
              environment variable — the grid below will then update
              automatically. For view counts, add{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-[#e0b04a]">
                YOUTUBE_API_KEY
              </code>
              .
            </div>
          </Reveal>
        )}

        {/* Bento-style grid — one large "spotlight" tile, then a regular row */}
        <Reveal delay={140}>
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]">
            {featured && (
              <VideoCard
                video={featured}
                index={0}
                className="sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[16/10] lg:aspect-auto"
                featured
                formatDate={formatDate}
                formatViews={formatViews}
                t={t}
                locale={locale}
              />
            )}

            {rest.map((video, i) => (
              <VideoCard
                key={`${video.id}-${i}`}
                video={video}
                index={i + 1}
                className="aspect-video lg:aspect-auto"
                formatDate={formatDate}
                formatViews={formatViews}
                t={t}
                locale={locale}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 text-center sm:mt-20">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <FaYoutube className="h-5 w-5" />
            {t("music.viewAll")}
          </a>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

function VideoCard({
  video,
  index,
  className = "",
  featured = false,
  formatDate,
  formatViews,
  t,
  locale,
}: {
  video: YouTubeVideo;
  index: number;
  className?: string;
  featured?: boolean;
  formatDate: (publishedAt: string, locale: string) => string;
  formatViews: (
    views: string | undefined,
    t: ReturnType<typeof useLanguage>["t"]
  ) => string;
  t: ReturnType<typeof useLanguage>["t"];
  locale: string;
}) {
  return (
    <a
      href={video.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate flex w-full flex-col overflow-hidden rounded-[28px] bg-[#0b0b0b] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_40px_-20px_rgba(0,0,0,0.7)] outline outline-1 outline-white/10 transition-all duration-500 ease-out will-change-transform hover:-translate-y-1 hover:outline-[#c9962e]/60 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(201,150,46,0.25)] focus-visible:outline-2 focus-visible:outline-[#c9962e] ${className}`}
    >
      {/* Thumbnail fills the whole card, Apple TV+ style */}
      <div className="absolute inset-0">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.12]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-white/20">
            <Play className="h-10 w-10" />
          </div>
        )}
      </div>

      {/* Permanent bottom scrim so titles stay readable, deepens on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black" />
      {/* Faint top scrim to keep the index badge legible on bright thumbs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Index badge */}
      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/80 backdrop-blur-md">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Centered play control — glassy circle, scales in on hover like tvOS focus */}
      <span
        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-out ${
          featured ? "h-16 w-16" : "h-12 w-12"
        } scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100`}
      >
        <Play className={`${featured ? "h-6 w-6" : "h-4 w-4"} fill-white text-white`} />
      </span>

      {/* Text content, bottom-anchored */}
      <div className="relative z-10 mt-auto flex flex-col gap-2 p-5 sm:p-6">
        <h3
          className={`font-display line-clamp-2 leading-snug text-white transition-colors duration-300 group-hover:text-[#e0b04a] ${
            featured ? "text-xl sm:text-2xl" : "text-[15px] sm:text-base"
          }`}
        >
          {video.title}
        </h3>

        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
          <span>{formatDate(video.publishedAt, locale)}</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="text-[#c9962e]/90">
            {formatViews(video.viewCount, t) || t("music.newUpload")}
          </span>
        </div>
      </div>
    </a>
  );
}