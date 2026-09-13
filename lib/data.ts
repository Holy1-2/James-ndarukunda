export type SocialPlatform =
  | "Instagram"
  | "YouTube"
  | "TikTok"
  | "Facebook"
  | "Twitter"
  | "Spotify";

export interface SocialLink {
  name: SocialPlatform;
  url: string;
}

// Replace these with the artist's real profile URLs.
export const socialLinks: SocialLink[] = [
  { name: "Instagram", url: "https://www.instagram.com/james_ndarukunda?igsi=dzZoNWRsZTJkZWVw" },
  { name: "YouTube", url: "https://youtube.com/@jamesndarukunda8979?si=bf-vxVD1ZnMBBDNE" },
  { name: "TikTok", url: "https://tiktok.com/@jaemsndarukunda" },
  { name: "Facebook", url: "https://www.facebook.com/share/1Eyr8P1xNv/" },
  { name: "Twitter", url: "https://twitter.com/jaemsndarukunda" },
  { name: "Spotify", url: "https://open.spotify.com/artist/jaemsndarukunda" },
];

export const artistLinks = {
  bio: "/bio",
  music: "/music",
  gallery: "/gallery",
  contact: "/contact",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/bio" },
  { label: "Music", href: "/music" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const artist = {
  fullName: "James Ndarukunda",
  firstName: "James",
  surname: "Ndarukunda",
  label: "Rwandan Artist & Performer",
  tagline: "Making music that speaks to the heart.",
  // Short bio shown on the /bio page. Replace with the real biography.
  shortBio:
    "James Ndarukunda is a singer-songwriter whose sound moves between Afrobeat rhythm, soul, and contemporary R&B. Raised on the sound of church choirs and street radios, he writes songs built for both packed arenas and quiet nights alone with headphones on.",
  history: [
    {
      year: "2016",
      title: "First Recordings",
      text: "Recorded his first demos in a friend's home studio, trading favors for time behind the mic.",
    },
    {
      year: "2018",
      title: "Breakthrough Single",
      text: "Released a single that spread through local radio and playlists, introducing his voice to a wider audience.",
    },
    {
      year: "2020",
      title: "Debut Project",
      text: "Released his first full-length project, blending live instrumentation with modern production.",
    },
    {
      year: "2022",
      title: "First Headline Tour",
      text: "Took the stage as a headliner for the first time, performing to sold-out rooms across the region.",
    },
    {
      year: "2024",
      title: "Continued Growth",
      text: "Kept building — new music, new stages, and a growing audience that keeps the songs alive long after the show ends.",
    },
  ],
};
