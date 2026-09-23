"use client";

import { AudioLines } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function HeroFooter() {
  const { t } = useLanguage();

  return (
    <footer className="anim-footer absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-center">
      <AudioLines className="h-4 w-4 text-[#c9962e]/80" />
      <p className="text-[11px] tracking-wide text-white/50">
        {t("footer.rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
