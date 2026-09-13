import { ArrowUpRight, Eye, Play } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { artist } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Music — ${artist.fullName}`,
};

export const revalidate = 3600;

function formatViews(views?: string): string {
  if (!views) return "";
  const n = Number(views);
  if (Number.isNaN(n)) return "";
  return `${new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n)} views`;
}

export default async function MusicPage() {
  const videos = await getLatestVideos(9);
  const hasRealVideos = videos.some((v) => v.id !== "placeholder-1");

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
            <p className="section-eyebrow">Latest Music</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.02] tracking-wide text-white sm:text-6xl md:text-7xl">
              Listen to My <span className="text-[#c9962e]">Latest Tracks</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm italic text-white/50 sm:text-base">
              Fresh videos and releases, straight from the channel.
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

        <Reveal delay={140}>
          <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video, idx) => (
              <a
                key={`${video.id}-${idx}`}
                href={video.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9962e]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-[#c9962e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                  {video.thumbnail ? (
                    // Thumbnail comes from an external YouTube CDN host chosen
                    // at request time, so a plain img is used.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/30">
                      <Play className="h-10 w-10" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/85 backdrop-blur-md">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <span className="absolute bottom-3 left-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#c9962e] text-black opacity-0 shadow-[0_8px_24px_rgba(201,150,46,0.45)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <h3 className="line-clamp-2 flex-1 text-[15px] font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#e0b04a]">
                      {video.title}
                    </h3>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e0b04a]" />
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/25" />
                    <span className="inline-flex items-center gap-1.5 text-[#c9962e]/90">
                      <Eye className="h-3.5 w-3.5" />
                      {formatViews(video.viewCount) || "New Upload"}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 text-center sm:mt-20">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <FaYoutube className="h-5 w-5" />
            VIEW ALL ON YOUTUBE
          </a>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}