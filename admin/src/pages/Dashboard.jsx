import { useEffect, useState } from "react";
import { api, errMessage } from "../api/client.js";

function fmtDate(dateStr, withTime = true) {
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      ...(withTime ? { timeStyle: "short" } : {}),
    });
  } catch {
    return dateStr;
  }
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get("/api/analytics/summary");
        if (active) setSummary(data.summary);
      } catch (err) {
        if (active) setError(errMessage(err, "Could not load the dashboard."));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div>
      <Header title="Dashboard" subtitle="Site overview and performance." />

      {error && <div className="alert alert-error">{error}</div>}

      {summary && (
        <>
          <div className="stat-grid">
            <Stat label="Total visits" value={summary.totalVisits.toLocaleString()} tone="gold" />
            <Stat label="Contact messages" value={summary.totalContacts.toLocaleString()} />
            <Stat label="Unread" value={summary.unreadContacts.toLocaleString()} tone={summary.unreadContacts > 0 ? "red" : ""} />
            <Stat label="Gallery images" value={summary.galleryImages.toLocaleString()} />
            <Stat label="Upcoming events" value={summary.upcomingEvents.toLocaleString()} />
          </div>

          <div className="cards-grid">
            <section className="card">
              <h2>Visits by page</h2>
              {summary.visitsByPath.length === 0 ? (
                <Empty text="No visits recorded yet." />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th className="num">Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.visitsByPath.map((row) => (
                      <tr key={row.path}>
                        <td>
                          <code>{row.path}</code>
                        </td>
                        <td className="num">{row.count.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section className="card">
              <h2>Daily visits</h2>
              {summary.visitsByDay.length === 0 ? (
                <Empty text="No daily data yet." />
              ) : (
                <ul className="day-list">
                  {summary.visitsByDay.map((row) => (
                    <li key={row.date}>
                      <span>{fmtDate(row.date, false)}</span>
                      <div className="bar-track">
                        <div
                          className="bar"
                          style={{
                            width: `${Math.max(
                              4,
                              Math.round((row.count / Math.max(1, summary.visitsByDay[0].count)) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="num">{row.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export function Header({ title, subtitle, actions }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function PageLoading() {
  return <div className="loading">Loading…</div>;
}

export function Empty({ text }) {
  return <p className="empty">{text}</p>;
}

function Stat({ label, value, tone = "" }) {
  return (
    <div className={`stat ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}