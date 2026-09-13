# Jaems Ndarukunda — Official Website

A dark, cinematic Next.js artist site with:

- `/` — full-screen hero (logo, "About the Artist", official links, socials, CTAs)
- `/bio` — artist photo/visual, biography, and career history timeline
- `/music` — grid of the artist's latest YouTube uploads

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Configure

- **Content**: edit `lib/data.ts` — name, tagline, bio text, history entries,
  and social links.
- **Latest YouTube videos**: copy `.env.example` to `.env.local` and set
  `YOUTUBE_CHANNEL_ID` to the artist's real channel ID. `/music` pulls the
  channel's public RSS feed (no API key needed) and updates hourly. Until
  it's set, the page shows a placeholder notice instead of guessing at data.
- **Background artwork**: `components/StageBackground.tsx` currently uses a
  stylized silhouette + stage-light treatment rather than a real photo. Swap
  in the artist's actual photography by replacing that component's contents
  with an `<Image>`/`background-image` of the photo, keeping the existing
  dark overlay and vignette layers for text legibility.

## Build

```bash
npm run build
npm start
```
