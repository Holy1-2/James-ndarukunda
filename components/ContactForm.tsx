"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import type { TranslationKey } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";
import { submitContact } from "@/lib/api";

const INQUIRY_TYPES: TranslationKey[] = [
  "form.opt1",
  "form.opt2",
  "form.opt3",
  "form.opt4",
  "form.opt5",
  "form.opt6",
];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 focus:border-[#c9962e]";

const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/60";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");
    try {
      await submitContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        inquiryType: String(data.get("type") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request failed.");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#c9962e]/30 bg-[#c9962e]/[0.06] px-8 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
          <Send className="h-6 w-6" />
        </div>
        <h3 className="font-display mt-6 text-3xl tracking-wide text-white">
          {t("form.sent")}
        </h3>
        <p className="mt-3 max-w-sm text-sm text-white/60">
          {t("form.sentBody")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="glass-pill mt-8"
          type="button"
        >
          {t("form.again")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      {status === "error" && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t("form.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("form.namePh")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("form.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("form.emailPh")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("form.phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("form.phonePh")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            {t("form.type")}
          </label>
          <select
            id="type"
            name="type"
            className={inputClass}
            defaultValue={t(INQUIRY_TYPES[0])}
          >
            {INQUIRY_TYPES.map((key) => (
              <option key={key} value={t(key)} className="bg-[#101010]">
                {t(key)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("form.messagePh")}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button type="submit" className="btn-gold w-full sm:w-auto" disabled={status === "sending"}>
        <Send className="h-4 w-4" />
        {status === "sending" ? "…" : t("form.send")}
      </button>
    </form>
  );
}