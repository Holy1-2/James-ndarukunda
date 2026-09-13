"use client";

import { useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const PHOTOS = [
  { src: "/james-images/james-1.jpg", title: "Portrait" },
  { src: "/james-images/james-2.jpg", title: "Studio Session" },
  { src: "/james-images/james-3.jpg", title: "Live Performance" },
  { src: "/james-images/james-4.jpg", title: "Behind the Scenes" },
  { src: "/james-images/james-5.jpg", title: "In the Studio" },
  { src: "/james-images/james-6.jpg", title: "On Stage" },
];

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 42) return;
    if (dx < 0)
      setLightbox((i) => (i === null ? i : (i + 1) % PHOTOS.length));
    else
      setLightbox((i) =>
        i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
      );
  };

  return (
    <div className="columns-2 gap-4 space-y-4 sm:columns-3 lg:columns-4">
      {PHOTOS.map((photo, i) => (
        <button
          key={photo.src}
          onClick={() => setLightbox(i)}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl break-inside-avoid border border-white/10 transition-colors duration-300 hover:border-[#c9962e]/60"
          aria-label={`Open ${photo.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 text-left text-xs font-semibold tracking-[0.2em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {photo.title.toUpperCase()}
          </span>
        </button>
      ))}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setLightbox(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-[#c9962e] hover:text-[#e0b04a]"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            className="absolute left-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) =>
                i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
              );
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % PHOTOS.length));
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure
            className="flex max-h-[88vh] max-w-[90vw] flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].title}
              className="max-h-[72vh] max-w-[90vw] rounded-xl object-contain"
            />
            <figcaption className="text-center">
              <p className="text-[10px] tracking-[0.3em] text-[#e0b04a]">
                JAEMS · {String(lightbox + 1).padStart(2, "0")} /{" "}
                {String(PHOTOS.length).padStart(2, "0")}
              </p>
              <p className="font-display mt-1 text-2xl tracking-wide text-white">
                {PHOTOS[lightbox].title.toUpperCase()}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}