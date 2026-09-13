import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaXTwitter,
  FaSpotify,
} from "react-icons/fa6";
import { socialLinks, type SocialPlatform } from "@/lib/data";

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
  Spotify: FaSpotify,
};

export default function SocialLinks() {
  return (
    <div className="anim-social flex flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-7 sm:gap-y-5">
      {socialLinks.map(({ name, url }) => {
        const Icon = iconMap[name];
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-[3px] group-hover:scale-[1.08] group-hover:border-[#c9962e] group-hover:bg-white/[0.07] group-hover:shadow-[0_0_18px_rgba(201,150,46,0.45)] sm:h-[70px] sm:w-[70px]">
              <Icon className="h-4 w-4 text-white sm:h-6 sm:w-6" />
            </span>
            <span className="text-[11px] tracking-wide text-white/70 transition-colors duration-300 group-hover:text-[#e0b04a] sm:text-xs">
              {name}
            </span>
          </a>
        );
      })}
    </div>
  );
}