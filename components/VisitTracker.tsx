"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/api";

const STORAGE_KEY = "jaems_visited_paths";

export default function VisitTracker() {
  const pathname = usePathname();
  const tracked = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (tracked.current === null) {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        tracked.current = new Set(
          raw ? (JSON.parse(raw) as string[]) : []
        );
      } catch {
        tracked.current = new Set();
      }
    }
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...tracked.current])
      );
    } catch {
      // Storage unavailable — still count this view.
    }
    trackVisit(pathname);
  }, [pathname]);

  return null;
}