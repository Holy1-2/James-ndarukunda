"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, TouchEvent as ReactTouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TranslationKey } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";

interface Photo {
  src: string;
  key: TranslationKey;
}

const PHOTOS: Photo[] = [
  { src: "/james-images/james-1.jpg", key: "photo.1" },
  { src: "/james-images/james-2.jpg", key: "photo.2" },
  { src: "/james-images/james-3.jpg", key: "photo.3" },
  { src: "/james-images/james-4.jpg", key: "photo.4" },
  { src: "/james-images/james-5.jpg", key: "photo.5" },
  { src: "/james-images/james-6.jpg", key: "photo.6" },
];

const COUNT = PHOTOS.length;
const SLIDE_INTERVAL = 4500;
const GAP = 28;
const SWIPE_THRESHOLD = 42;

function shortestRelative(i: number, active: number): number {
  let diff = i - active;
  if (diff > COUNT / 2) diff -= COUNT;
  if (diff < -COUNT / 2) diff += COUNT;
  return diff;
}

export default function PhotoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const prefersReduced = useRef(false);
  const { t } = useLanguage();

  const [slideW, setSlideW] = useState(0);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      prefersReduced.current =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const vp = viewportRef.current;
    if (!vp) return;
    const measure = () => setSlideW(Math.min(400, vp.clientWidth * 0.58));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (hovering || prefersReduced.current) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % COUNT),
      SLIDE_INTERVAL
    );
    return () => window.clearInterval(id);
  }, [hovering]);

  const goNext = useCallback(() => setActive((a) => (a + 1) % COUNT), []);
  const goPrev = useCallback(
    () => setActive((a) => (a - 1 + COUNT) % COUNT),
    []
  );
  const jumpTo = useCallback((i: number) => setActive(i), []);

  const stride = slideW + GAP;
  const containerH = slideW * 1.333;

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="relative mx-auto w-full max-w-6xl select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={viewportRef}
        className="relative w-full overflow-visible"
        style={{ height: containerH || "72vw" }}
      >
        {PHOTOS.map((photo, i) => {
          const relPos = shortestRelative(i, active);
          const isCenter = relPos === 0;
          const offset = relPos * stride;

          const wrapperStyle: CSSProperties = {
            width: slideW || "58vw",
            height: "100%",
            left: "50%",
            transform: `translate3d(calc(-50% + ${offset}px), 0, 0) scale(${isCenter ? 1.12 : 1})`,
            transition:
              "transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease, filter 700ms ease, box-shadow 700ms ease",
            zIndex: 100 - Math.abs(relPos),
          };

          return (
            <div
              key={`${photo.src}-${i}`}
              className={`absolute top-0 overflow-hidden rounded-2xl ring-1 ${
                isCenter
                  ? "ring-[#c9962e] shadow-[0_0_60px_rgba(201,150,46,0.35)]"
                  : "ring-white/10 opacity-45 brightness-[0.55] blur-[3px]"
              }`}
              style={wrapperStyle}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={t(photo.key)}
                draggable={false}
                className="h-full w-full object-cover scale-105"
              />
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t transition-opacity duration-700 ${
                  isCenter
                    ? "from-black/70 via-black/10 to-black/20 opacity-100"
                    : "from-black/40 via-transparent to-black/30 opacity-80"
                }`}
              />
              {isCenter && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-6 text-left">
                  <p className="text-[10px] tracking-[0.3em] text-[#e0b04a]">
                    JAEMS
                  </p>
                  <p className="font-display mt-1 text-xl tracking-wide text-white">
                    {t(photo.key).toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={goPrev}
        aria-label={t("gallery.prev")}
        className="absolute left-2 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label={t("gallery.next")}
        className="absolute right-2 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={t("gallery.goTo", { n: i + 1 })}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              i === active
                ? "w-10 bg-[#c9962e]"
                : "w-4 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}