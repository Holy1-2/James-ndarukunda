"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { translations } from "@/lib/translations";
import type { Lang, Translate } from "@/lib/translations";

export const STORAGE_KEY = "jaems-lang";

const LOCALES: Record<Lang, string> = {
  en: "en-US",
  fr: "fr-FR",
  rw: "rw-RW",
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translate;
  locale: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "fr" || value === "rw";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) {
      window.setTimeout(() => setLangState(saved), 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const t = useCallback<Translate>(
    (key, vars) => {
      const dict = translations[lang] ?? translations.en;
      let str = dict[key] ?? translations.en[key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          str = str.replaceAll(`{{${name}}}`, String(value));
        }
      }
      return str;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, locale: LOCALES[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}