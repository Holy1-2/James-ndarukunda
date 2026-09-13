"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";

const INQUIRY_TYPES = [
  "Booking Inquiry",
  "Event Performance",
  "Brand Collaboration",
  "Media Interview",
  "Music Production",
  "General Message",
];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 focus:border-[#c9962e]";

const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/60";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#c9962e]/30 bg-[#c9962e]/[0.06] px-8 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9962e]/15 text-[#e0b04a]">
          <Send className="h-6 w-6" />
        </div>
        <h3 className="font-display mt-6 text-3xl tracking-wide text-white">
          MESSAGE SENT
        </h3>
        <p className="mt-3 max-w-sm text-sm text-white/60">
          Thank you for reaching out. The team will get back to you within a
          few days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="glass-pill mt-8"
          type="button"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+250 …"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            Inquiry Type
          </label>
          <select id="type" className={inputClass} defaultValue={INQUIRY_TYPES[0]}>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#101010]">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell me about your project, event, or idea…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button type="submit" className="btn-gold w-full sm:w-auto">
        <Send className="h-4 w-4" />
        SEND MESSAGE
      </button>
    </form>
  );
}