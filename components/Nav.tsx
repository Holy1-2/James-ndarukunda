"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, Menu, Play, X } from "lucide-react";
import { artist, navLinks } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/bio" className="glass-pill">
              <Link2 className="h-3.5 w-3.5" />
              LINKS TO BIO
            </Link>
            <Link href="/music" className="glass-pill">
              <Play className="h-3.5 w-3.5" />
              LISTEN TO MUSIC
            </Link>
          </div>

          <button
            className="glass-pill lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display px-6 py-2.5 text-3xl tracking-[0.15em] uppercase transition-colors duration-300 ${
                isActive(link.href) ? "text-[#e0b04a]" : "text-white hover:text-[#e0b04a]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link href="/bio" className="btn-gold" onClick={() => setOpen(false)}>
            <Link2 className="h-4 w-4" />
            LINKS TO BIO
          </Link>
          <Link href="/music" className="btn-gold" onClick={() => setOpen(false)}>
            <Play className="h-4 w-4" />
            LISTEN TO MUSIC
          </Link>
        </div>
      </div>
    </>
  );
}