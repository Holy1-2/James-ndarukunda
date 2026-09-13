import StageBackground from "@/components/StageBackground";
import Nav from "@/components/Nav";
import HeroFooter from "@/components/HeroFooter";
import SocialLinks from "@/components/SocialLinks";
import { artist } from "@/lib/data";

export default function ArtistHero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <StageBackground />
      <Nav />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 pb-14 pt-24">
        <div className="w-full">
          <h1 className="artist-name font-display anim-title block w-full text-center text-[24vw] leading-[0.8] tracking-[-0.035em] text-white sm:text-[11rem] md:text-[13rem] lg:text-[15rem]">
            {artist.firstName.toUpperCase()}
          </h1>
        </div>

        <p className="anim-label mt-1 text-[5.5vw] tracking-[0.34em] text-[#c9962e] sm:text-2xl md:text-3xl">
          {artist.surname.toUpperCase().split("").join(" ")}
        </p>

        <p className="anim-label mt-7 text-[10px] font-semibold tracking-[0.42em] text-white/80 uppercase sm:text-xs">
          {artist.label}
        </p>

        <p className="anim-tagline mx-auto mt-5 max-w-md text-center text-sm italic text-white/80 sm:text-base">
          &ldquo;{artist.tagline}&rdquo;
        </p>

        <div className="anim-social mt-10 sm:mt-14">
          <SocialLinks />
        </div>
      </div>

      <HeroFooter />
    </section>
  );
}