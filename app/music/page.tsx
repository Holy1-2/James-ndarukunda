import type { Metadata } from "next";
import MusicContent from "@/components/MusicContent";
import { getLatestVideos } from "@/lib/youtube";
import { artist } from "@/lib/data";

export const metadata: Metadata = {
  title: `Music — ${artist.fullName}`,
};

export const revalidate = 3600;

export default async function MusicPage() {
  const videos = await getLatestVideos(9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${artist.fullName} — Music`,
    itemListElement: videos.slice(0, 9).map((video, index) => ({
      "@type": "VideoObject",
      position: index + 1,
      name: video.title,
      thumbnailUrl: video.thumbnail || undefined,
      contentUrl: video.url !== "#" ? video.url : undefined,
      uploadDate: video.publishedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MusicContent videos={videos} />
    </>
  );
}