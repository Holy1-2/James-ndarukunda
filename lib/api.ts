export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface EventItem {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  link: string;
  published: boolean;
}

export interface GalleryItem {
  _id: string;
  title: string;
  url: string;
}

export interface SiteInfo {
  contactEmail?: string;
  contactPhone?: string;
  based?: string;
  availability?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
}

export function resolveUrl(url: string): string {
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return res.json();
}

export function getEvents(): Promise<{ events: EventItem[] }> {
  return getJSON("/api/events/upcoming");
}

export function getGallery(): Promise<{ images: GalleryItem[] }> {
  return getJSON("/api/gallery");
}

export function getSiteInfo(): Promise<{ siteInfo: SiteInfo }> {
  return getJSON("/api/site-info");
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }
}

export function trackVisit(path: string): void {
  void fetch(`${API_BASE}/api/analytics/visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  }).catch(() => {
    // Tracking is best-effort; never block the page.
  });
}