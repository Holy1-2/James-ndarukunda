"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, Menu, Play, X } from "lucide-react";
import { artist, navLinks } from "@/lib/data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#050505]/85 py-2.5 backdrop-blur-xl sm:py-3.5"
            : "border-b border-transparent bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="anim-logo leading-none" onClick={() => setOpen(false)}>
            <span className="font-signature text-3xl text-white sm:text-4xl">
              {artist.firstName}
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.35em] text-white/85 sm:text-xs">
              {artist.surname.toUpperCase()}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-xs tracking-[0.08em] transition-colors duration-300 ${
                  isActive(link.href)
                    ? "bg-white/10 text-[#e0b04a]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Link href="/bio" className="glass-pill">
              <Link2 className="h-3.5 w-3.5" />
              {t("nav.linksToBio")}
            </Link>
            <Link href="/music" className="glass-pill">
              <Play className="h-3.5 w-3.5" />
              {t("nav.listenToMusic")}
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              className="glass-pill"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">{t("nav.menu")}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-[#050505]/97 backdrop-blur-xl transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-6 px-6 pb-10 pt-24">
          <LanguageSwitcher />

          <nav className="flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-display px-5 py-1.5 text-2xl tracking-[0.14em] uppercase transition-colors duration-300 sm:text-3xl ${
                  isActive(link.href) ? "text-[#e0b04a]" : "text-white hover:text-[#e0b04a]"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex w-full max-w-xs flex-col items-stretch gap-3">
            <Link
              href="/bio"
              className="btn-gold w-full"
              onClick={() => setOpen(false)}
            >
              <Link2 className="h-4 w-4" />
              {t("nav.linksToBio")}
            </Link>
            <Link
              href="/music"
              className="btn-gold w-full"
              onClick={() => setOpen(false)}
            >
              <Play className="h-4 w-4" />
              {t("nav.listenToMusic")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}