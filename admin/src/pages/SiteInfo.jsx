import { useEffect, useState } from "react";
import { api, errMessage } from "../api/client.js";
import { Header, PageLoading } from "./Dashboard.jsx";

const EMPTY = { contactEmail: "", contactPhone: "", based: "", availability: "" };

export default function SiteInfo() {
  const [form, setForm] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get("/api/site-info");
        if (active) setForm({ ...EMPTY, ...(data.siteInfo ?? {}) });
      } catch (err) {
        if (active) setError(errMessage(err, "Could not load site info."));
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      await api.put("/api/site-info", form);
      setSaved(true);
    } catch (err) {
      setError(errMessage(err, "Could not save site info."));
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <PageLoading />;

  return (
    <div>
      <Header
        title="Site Info"
        subtitle="Contact details shown on the main site. Leave empty to keep the defaults."
      />

      {error && <div className="alert alert-error">{error}</div>}
      {saved && <div className="alert alert-ok">Saved.</div>}

      <section className="card">
        <form className="form-stack" onSubmit={save}>
          <label className="field">
            <span>Contact email</span>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              placeholder="bookings@jaemsndarukunda.com"
            />
          </label>

          <label className="field">
            <span>Contact phone</span>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              placeholder="+250 700 000 000"
            />
          </label>

          <label className="field">
            <span>Based in</span>
            <input
              type="text"
              value={form.based}
              onChange={(e) => setForm({ ...form, based: e.target.value })}
              placeholder="Rwanda · East Africa"
            />
          </label>

          <label className="field">
            <span>Availability line</span>
            <input
              type="text"
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              placeholder="2026 Tour & Show Dates"
            />
          </label>

          <div>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}