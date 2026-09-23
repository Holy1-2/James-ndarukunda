"use client";

import { useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getGallery, resolveUrl } from "@/lib/api";
import type { GalleryItem } from "@/lib/api";

interface Photo {
  id: string;
  src: string;
  title: string;
}

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [remote, setRemote] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const touchX = useRef<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let active = true;
    getGallery()
      .then(({ images }) => {
        if (active) setRemote(images);
      })
      .catch(() => {
        // API offline — show the empty state.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const photos: Photo[] = remote.map((image) => ({
    id: image._id,
    src: resolveUrl(image.url),
    title: image.title || "Gallery",
  }));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? i : (i - 1 + photos.length) % photos.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, photos.length]);

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 42) return;
    if (dx < 0)
      setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
    else
      setLightbox((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length
      );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-24 text-center">
        <div className="h-10 w-10 animate-pulse rounded-full border border-white/15 bg-white/5" />
        <p className="mt-5 text-sm text-white/50">{t("gallery.loading")}</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
        <ImageOff className="mx-auto h-8 w-8 text-[#c9962e]/70" />
        <p className="mt-5 text-sm text-white/60">{t("gallery.empty")}</p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 space-y-4 sm:columns-3 lg:columns-4">
      {photos.map((photo, i) => (
        <button
          key={photo.id}
          onClick={() => setLightbox(i)}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl break-inside-avoid border border-white/10 transition-colors duration-300 hover:border-[#c9962e]/60"
          aria-label={t("gallery.open", { title: photo.title })}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
      ))}

      {lightbox !== null && photos[lightbox] && (
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
            aria-label={t("gallery.close")}
          >
            <X className="h-5 w-5" />
          </button>

          <button
            className="absolute left-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) =>
                i === null ? i : (i - 1 + photos.length) % photos.length
              );
            }}
            aria-label={t("gallery.prev")}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-[#c9962e] hover:text-[#e0b04a] sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            aria-label={t("gallery.next")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure
            className="flex max-h-[88vh] max-w-[90vw] flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].title}
              className="max-h-[72vh] max-w-[90vw] rounded-xl object-contain"
            />
            <figcaption className="text-center">
              <p className="text-[10px] tracking-[0.3em] text-[#e0b04a]">
                JAEMS · {String(lightbox + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </p>
              <p className="font-display mt-1 text-2xl tracking-wide text-white">
                {photos[lightbox].title.toUpperCase()}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}