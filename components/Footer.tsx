"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaXTwitter,
  FaSpotify,
} from "react-icons/fa6";
import { artist, navLinks, socialLinks, type SocialPlatform } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
  Spotify: FaSpotify,
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 px-6 pb-10 pt-16 text-center">
      <div className="font-signature text-3xl text-white">
        {artist.firstName}
      </div>
      <p className="mt-1 text-[10px] tracking-[0.35em] text-white/70">
        {artist.surname.toUpperCase()}
      </p>
      <p className="mx-auto mt-5 max-w-sm text-xs italic text-white/50">
        &ldquo;{t("hero.tagline")}&rdquo;
      </p>

      <nav className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-[#e0b04a]"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>

      <div className="mt-9 flex justify-center gap-3">
        {socialLinks.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#c9962e] hover:text-[#e0b04a]"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-2 text-[11px] text-white/40">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        <p className="flex gap-5">
          <span className="cursor-pointer transition-colors hover:text-[#e0b04a]">
            {t("footer.privacy")}
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#e0b04a]">
            {t("footer.terms")}
          </span>
        </p>
      </div>
    </footer>
  );
}