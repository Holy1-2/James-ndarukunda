"use client";

import { LANGS } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1.5 backdrop-blur-md"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          title={l.label}
          aria-pressed={lang === l.code}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm leading-none transition-all duration-300 ${
            lang === l.code
              ? "ring-1 ring-[#c9962e] shadow-[0_0_12px_rgba(201,150,46,0.45)]"
              : "opacity-45 grayscale hover:opacity-90 hover:grayscale-0"
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}