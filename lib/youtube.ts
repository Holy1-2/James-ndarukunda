export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  viewCount?: string;
}

// Set this to the artist's real YouTube channel ID (starts with "UC...")
// in your environment as YOUTUBE_CHANNEL_ID. You can find a channel ID from
// the channel's "About" page > Share > Copy channel ID.
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "";

// Optional: set YOUTUBE_API_KEY to also pull exact view counts via the
// YouTube Data API v3. Without it the feed still works, just without views.
const API_KEY = process.env.YOUTUBE_API_KEY;

export const CHANNEL_URL = CHANNEL_ID
  ? `https://www.youtube.com/channel/${CHANNEL_ID}`
  : "https://www.youtube.com/@jaemsndarukunda";

// Fallback videos shown when no channel ID is configured yet, or the feed
// can't be reached (e.g. at build time with no network access). Replace the
// ids with real video ids, or just configure YOUTUBE_CHANNEL_ID above and
// remove this once the channel is live.
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "placeholder-1",
    title: "Add your channel ID to show real videos here",
    publishedAt: new Date().toISOString(),
    thumbnail: "",
    url: "#",
  },
];

function extractTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : null;
}

async function fetchVideoStats(ids: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!API_KEY || ids.length === 0) return map;
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids.join(",")}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return map;
    const data = await res.json();
    for (const item of data.items ?? []) {
      map.set(item.id, String(item.statistics?.viewCount ?? "0"));
    }
  } catch {
    // Stats are optional — fall back to no view counts.
  }
  return map;
}

/**
 * Fetches the latest uploads for a YouTube channel using its public RSS
 * feed. This works without an API key, but only returns the most recent
 * ~15 uploads (YouTube's feed limit) and isn't searchable/paginated. For
 * production use at scale, swap this for the YouTube Data API v3
 * `search.list` endpoint with an API key instead.
 */
export async function getLatestVideos(limit = 9): Promise<YouTubeVideo[]> {
  if (!CHANNEL_ID) return FALLBACK_VIDEOS;

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_VIDEOS;

    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    if (entries.length === 0) return FALLBACK_VIDEOS;

    const videos: YouTubeVideo[] = entries.slice(0, limit).map((entry) => {
      const videoId = extractTag(entry, "yt:videoId") ?? "";
      const title = extractTag(entry, "media:title") ?? extractTag(entry, "title") ?? "Untitled";
      const published = extractTag(entry, "published") ?? new Date().toISOString();

      return {
        id: videoId,
        title,
        publishedAt: published,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });

    const stats = await fetchVideoStats(videos.map((v) => v.id));
    for (const video of videos) {
      video.viewCount = stats.get(video.id);
    }

    return videos;
  } catch {
    return FALLBACK_VIDEOS;
  }
}
