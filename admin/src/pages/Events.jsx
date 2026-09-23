import { useEffect, useState } from "react";
import { api, errMessage } from "../api/client.js";
import { Empty, Header, PageLoading } from "./Dashboard.jsx";

const EMPTY_FORM = {
  title: "",
  date: "",
  location: "",
  description: "",
  link: "",
  published: true,
};

function toInputDate(iso) {
  const d = new Date(iso);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      dateStyle: "long",
    });
  } catch {
    return iso;
  }
}

export default function Events() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/api/events");
      setEvents(data.events);
      setError("");
    } catch (err) {
      setError(errMessage(err, "Could not load events."));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      date: toInputDate(event.date),
      location: event.location,
      description: event.description,
      link: event.link,
      published: event.published,
    });
    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...form, published: Boolean(form.published) };
      if (editingId) {
        await api.patch(`/api/events/${editingId}`, payload);
      } else {
        await api.post("/api/events", payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not save the event."));
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (event) => {
    setBusy(event._id);
    try {
      await api.patch(`/api/events/${event._id}`, { published: !event.published });
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not update the event."));
    } finally {
      setBusy("");
    }
  };

  const remove = async (event) => {
    if (!window.confirm(`Delete "${event.title}"?`)) return;
    setBusy(event._id);
    try {
      await api.delete(`/api/events/${event._id}`);
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not delete the event."));
    } finally {
      setBusy("");
    }
  };

  if (!events) return <PageLoading />;

  return (
    <div>
      <Header
        title="Events"
        subtitle="Upcoming shows and events shown on the main site."
        actions={
          <button className="btn btn-primary" onClick={openCreate} type="button">
            + New event
          </button>
        }
      />

      {error && <div className="alert alert-error">{error}</div>}

      {events.length === 0 ? (
        <section className="card">
          <Empty text="No events yet. Create your first one." />
        </section>
      ) : (
        <section className="card no-pad">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Location</th>
                <th>Status</th>
                <th className="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{fmtDate(event.date)}</td>
                  <td>
                    <strong>{event.title}</strong>
                    {event.description && (
                      <div className="table-sub">{event.description}</div>
                    )}
                  </td>
                  <td>{event.location || "—"}</td>
                  <td>
                    <span className={`chip ${event.published ? "chip-ok" : "chip-off"}`}>
                      {event.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="num">
                    <div className="row-actions">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(event)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        disabled={busy === event._id}
                        onClick={() => togglePublish(event)}
                      >
                        {event.published ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        disabled={busy === event._id}
                        onClick={() => remove(event)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>{editingId ? "Edit event" : "New event"}</h2>

            <label className="field">
              <span>Title *</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Date *</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </label>
              <label className="field">
                <span>Location</span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </label>
            </div>

            <label className="field">
              <span>Description</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>

            <label className="field">
              <span>Ticket / link (optional)</span>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://…"
              />
            </label>

            <label className="check">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <span>Published on the site</span>
            </label>

            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save event"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}