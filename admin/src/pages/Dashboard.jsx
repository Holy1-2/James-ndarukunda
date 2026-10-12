import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeOpenIcon,
  EyeIcon,
  FireIcon,
  InboxIcon,
  MapPinIcon,
  PhotoIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { api, errMessage } from "../api/client.js";

function fmtDay(dateStr, opts = { month: "short", day: "numeric" }) {
  try {
    return new Date(dateStr).toLocaleDateString(undefined, opts);
  } catch {
    return dateStr;
  }
}

function fmtTime(dateStr) {
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateStr;
  }
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (soft = false) => {
    if (soft) setRefreshing(true);
    try {
      const [summaryRes, contactsRes] = await Promise.all([
        api.get("/api/analytics/summary"),
        api.get("/api/contacts").catch(() => ({ data: { contacts: [] } })),
      ]);
      setSummary(summaryRes.data.summary);
      setMessages(contactsRes.data.contacts.slice(0, 5));
      setError("");
    } catch (err) {
      setError(errMessage(err, "Could not load the dashboard."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const stats = summary
    ? [
        {
          label: "Total visits",
          value: summary.totalVisits,
          Icon: EyeIcon,
          tone: "gold",
          hint: "All-time page views",
        },
        {
          label: "Messages",
          value: summary.totalContacts,
          Icon: ChatBubbleLeftRightIcon,
          tone: "blue",
          hint: "From the contact form",
        },
        {
          label: "Unread",
          value: summary.unreadContacts,
          Icon: EnvelopeOpenIcon,
          tone: summary.unreadContacts > 0 ? "red" : "green",
          hint: summary.unreadContacts > 0 ? "Needs your attention" : "All caught up",
        },
        {
          label: "Gallery",
          value: summary.galleryImages,
          Icon: PhotoIcon,
          tone: "purple",
          hint: "Published images",
        },
        {
          label: "Upcoming events",
          value: summary.upcomingEvents,
          Icon: CalendarDaysIcon,
          tone: "green",
          hint: "Scheduled ahead",
        },
      ]
    : [];

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="page-eyebrow">{fmtDay(new Date(), { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1>
            {greeting()}, <span className="text-gold">James</span>
          </h1>
          <p className="page-sub">Here&apos;s how your site is performing today.</p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => load(true)}
          disabled={refreshing}
          type="button"
        >
          <ArrowPathIcon className={`icon-16 ${refreshing ? "spin" : ""}`} />
          Refresh
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {summary && (
        <>
          <section className="kpi-grid">
            {stats.map((stat, i) => (
              <article
                key={stat.label}
                className={`kpi tone-${stat.tone}`}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="kpi-icon">
                  <stat.Icon />
                </div>
                <div className="kpi-body">
                  <span className="kpi-label">{stat.label}</span>
                  <strong className="kpi-value">{stat.value.toLocaleString()}</strong>
                  <span className="kpi-hint">{stat.hint}</span>
                </div>
              </article>
            ))}
          </section>

          <section className="dash-grid">
            <article className="card chart-card">
              <div className="card-head">
                <h2>Visitors this month</h2>
                <span className="badge">
                  <ArrowTrendingUpIcon className="icon-14" />
                  {summary.visitsByDay.reduce((sum, d) => sum + d.count, 0).toLocaleString()} total
                </span>
              </div>
              {summary.visitsByDay.length === 0 ? (
                <Empty text="No visits recorded yet." />
              ) : (
                <AreaChart data={summary.visitsByDay} />
              )}
            </article>

            <article className="card">
              <div className="card-head">
                <h2>Top pages</h2>
                <span className="badge subtle">
                  <FireIcon className="icon-14" />
                  Most viewed
                </span>
              </div>
              {summary.visitsByPath.length === 0 ? (
                <Empty text="No visits recorded yet." />
              ) : (
                <ul className="rank-list">
                  {summary.visitsByPath.map((row, i) => {
                    const max = Math.max(1, summary.visitsByPath[0].count);
                    return (
                      <li key={row.path}>
                        <span className="rank">{i + 1}</span>
                        <div className="rank-main">
                          <div className="rank-top">
                            <code>{row.path}</code>
                            <span className="num">{row.count.toLocaleString()}</span>
                          </div>
                          <div className="bar-track">
                            <div
                              className="bar"
                              style={{ width: `${Math.max(4, Math.round((row.count / max) * 100))}%` }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          </section>

          <section className="dash-grid">
            <article className="card">
              <div className="card-head">
                <h2>Recent messages</h2>
                <Link className="card-link" to="/contacts">
                  View all <ArrowUpRightIcon className="icon-14" />
                </Link>
              </div>
              {messages.length === 0 ? (
                <Empty text="No messages yet." />
              ) : (
                <ul className="msg-list">
                  {messages.map((m) => (
                    <li key={m._id} className={m.read ? "" : "unread"}>
                      <span className="msg-avatar">
                        {m.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                      <div className="msg-main">
                        <div className="msg-top">
                          <strong>{m.name}</strong>
                          <span className="muted small">{fmtTime(m.createdAt)}</span>
                        </div>
                        <p className="msg-snippet">{m.message}</p>
                      </div>
                      {!m.read && <span className="dot" />}
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="card">
              <div className="card-head">
                <h2>Quick actions</h2>
              </div>
              <div className="quick-grid">
                <Link className="quick" to="/events">
                  <span className="quick-icon tone-green">
                    <PlusIcon />
                  </span>
                  <span>
                    <strong>New event</strong>
                    <small>Add a show or appearance</small>
                  </span>
                </Link>
                <Link className="quick" to="/gallery">
                  <span className="quick-icon tone-purple">
                    <PhotoIcon />
                  </span>
                  <span>
                    <strong>Upload image</strong>
                    <small>Add to the gallery</small>
                  </span>
                </Link>
                <Link className="quick" to="/site-info">
                  <span className="quick-icon tone-blue">
                    <SparklesIcon />
                  </span>
                  <span>
                    <strong>Edit site info</strong>
                    <small>Contact details &amp; more</small>
                  </span>
                </Link>
                <Link className="quick" to="/contacts">
                  <span className="quick-icon tone-gold">
                    <InboxIcon />
                  </span>
                  <span>
                    <strong>Inbox</strong>
                    <small>{summary.unreadContacts} unread</small>
                  </span>
                </Link>
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}

function AreaChart({ data }) {
  const counts = data.map((d) => d.count);
  const max = Math.max(1, ...counts);
  const W = 100;
  const H = 34;
  const step = counts.length > 1 ? W / (counts.length - 1) : 0;
  const points = counts.map((c, i) => {
    const x = i * step;
    const y = H - (c / max) * (H - 4) - 2;
    return [x, y];
  });
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  const labels = [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]];

  return (
    <div className="chart">
      <svg
        className="area-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily visits chart"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0b04a" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#e0b04a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#areaFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="#e0b04a"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="chart-axis">
        {labels.map((d, i) => (
          <span key={i}>{fmtDay(d.date)}</span>
        ))}
      </div>
    </div>
  );
}

export function Header({ title, subtitle, actions }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function PageLoading() {
  return (
    <div className="skeleton-stack">
      <div className="skeleton sk-title" />
      <div className="skeleton sk-row" />
      <div className="skeleton sk-block" />
    </div>
  );
}

export function Empty({ text }) {
  return (
    <p className="empty">
      <MapPinIcon className="empty-icon" />
      {text}
    </p>
  );
}

function DashboardSkeleton() {
  return (
    <div className="page">
      <div className="skeleton-stack">
        <div className="skeleton sk-title" />
        <div className="kpi-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton sk-kpi" />
          ))}
        </div>
        <div className="dash-grid">
          <div className="skeleton sk-chart" />
          <div className="skeleton sk-chart" />
        </div>
      </div>
    </div>
  );
}