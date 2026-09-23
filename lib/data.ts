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
  { name: "Facebook", url: "https://www.facebook.com/share/1Eyr8P1xNv/" },
  { name: "Twitter", url: "https://x.com/ndarukunda202" },
];

export const artistLinks = {
  bio: "/bio",
  music: "/music",
  gallery: "/gallery",
  contact: "/contact",
};

import type { TranslationKey } from "./translations";

export const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/bio" },
  { key: "nav.music", href: "/music" },
  { key: "nav.gallery", href: "/gallery" },
  { key: "nav.events", href: "/events" },
  { key: "nav.contact", href: "/contact" },
];

export const artist = {
  fullName: "James Ndarukunda",
  firstName: "James",
  surname: "Ndarukunda",

  label: "Rwandan Poet & Founder",
  tagline: "Poetry that preserves culture and delivers meaningful messages.",

  shortBio:
    "James Ndarukunda is a Rwandan poet and the Founder and Owner of IMIKARAGO POETS GROUP. Since 2021, he has been creating and performing ibisigo (poetry) that deliver messages through different themes and perspectives. His work is centered on preserving and promoting Rwandan culture and literary heritage.",

  history: [
    {
      year: "2021",
      title: "Beginning of His Poetry Journey",
      text:
        "Started his journey in poetry, creating ibisigo focused on delivering meaningful messages rather than music.",
    },
    {
      year: "2021",
      title: "Cultural & Literary Expression",
      text:
        "Developed poetry across different themes, bringing together messages that contribute to preserving Rwandan culture and literary heritage.",
    },
    {
      year: "2021",
      title: "Founder of IMIKARAGO POETS GROUP",
      text:
        "Founded and became the owner of IMIKARAGO POETS GROUP, creating a platform dedicated to poetry and the promotion of Rwandan literary culture.",
    },
  ],
};