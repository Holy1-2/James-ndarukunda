import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  CalendarDaysIcon,
  EnvelopeIcon,
  PhotoIcon,
  Squares2X2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clearToken } from "../api/client.js";

const NAV = [
  { to: "/", label: "Dashboard", end: true, Icon: Squares2X2Icon },
  { to: "/contacts", label: "Contacts", Icon: EnvelopeIcon },
  { to: "/events", label: "Events", Icon: CalendarDaysIcon },
  { to: "/gallery", label: "Gallery", Icon: PhotoIcon },
  { to: "/site-info", label: "Site Info", Icon: UserCircleIcon },
];

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">J</span>
      <div className="brand-text">
        <strong>JAMES</strong>
        <small>Admin Panel</small>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const logout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <div
        className={`sidebar-scrim ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            className="icon-btn sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon />
          </button>
        </div>

        <nav className="side-nav">
          {NAV.map(({ to, label, end, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
            >
              <Icon className="side-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="side-footer">
          <a
            className="side-link"
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
          >
            <ArrowTopRightOnSquareIcon className="side-icon" />
            <span>View live site</span>
          </a>
          <button className="side-link danger" onClick={logout} type="button">
            <ArrowRightStartOnRectangleIcon className="side-icon" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="main-col">
        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon />
          </button>

          <div className="topbar-title">
            <span className="pulse-dot" />
            <span>Control Center</span>
          </div>

          <div className="topbar-actions">
            <a
              className="topbar-link"
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
            >
              <ArrowTopRightOnSquareIcon />
              <span>View site</span>
            </a>
            <div className="user-pill">
              <span className="avatar">A</span>
              <span className="user-name">admin</span>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}