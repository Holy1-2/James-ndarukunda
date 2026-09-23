import { useEffect, useState } from "react";
import { api, errMessage } from "../api/client.js";
import { Empty, Header, PageLoading } from "./Dashboard.jsx";

function fmt(dateStr) {
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateStr;
  }
}

export default function Contacts() {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get("/api/contacts");
      setContacts(data.contacts);
      setError("");
    } catch (err) {
      setError(errMessage(err, "Could not load contact messages."));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (contact) => {
    setBusy(contact._id);
    try {
      await api.patch(`/api/contacts/${contact._id}`, { read: !contact.read });
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not update the message."));
    } finally {
      setBusy("");
    }
  };

  const remove = async (contact) => {
    if (!window.confirm("Delete this message permanently?")) return;
    setBusy(contact._id);
    try {
      await api.delete(`/api/contacts/${contact._id}`);
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not delete the message."));
    } finally {
      setBusy("");
    }
  };

  if (!contacts) return <PageLoading />;

  return (
    <div>
      <Header
        title="Contacts"
        subtitle={`Messages from the site contact form — ${contacts.filter((c) => !c.read).length} unread.`}
        actions={
          <button className="btn btn-ghost" onClick={load} type="button">
            Refresh
          </button>
        }
      />

      {error && <div className="alert alert-error">{error}</div>}

      {contacts.length === 0 ? (
        <section className="card">
          <Empty text="No contact messages yet." />
        </section>
      ) : (
        <section className="card no-pad">
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact._id} className={`contact-item ${contact.read ? "" : "unread"}`}>
                <button
                  type="button"
                  className="contact-summary"
                  onClick={() => setExpanded(expanded === contact._id ? null : contact._id)}
                >
                  <div>
                    <strong>
                      {contact.name}
                      {!contact.read && <span className="dot" />}
                    </strong>
                    <span className="muted">
                      {contact.email}
                      {contact.phone ? ` · ${contact.phone}` : ""}
                    </span>
                  </div>
                  <div className="contact-meta">
                    {contact.inquiryType && <span className="chip">{contact.inquiryType}</span>}
                    <span className="muted">{fmt(contact.createdAt)}</span>
                  </div>
                </button>

                {expanded === contact._id && (
                  <div className="contact-body">
                    <p>{contact.message}</p>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        disabled={busy === contact._id}
                        onClick={() => toggleRead(contact)}
                      >
                        Mark as {contact.read ? "unread" : "read"}
                      </button>
                      <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
                        Reply
                      </a>
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={busy === contact._id}
                        onClick={() => remove(contact)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}