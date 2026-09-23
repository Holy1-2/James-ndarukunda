import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../api/client.js";

const NAV = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/contacts", label: "Contacts" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/site-info", label: "Site Info" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">J</span>
          <div>
            <strong>JAEMS</strong>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className="side-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="side-footer">
          <a href="http://localhost:3000" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button className="link-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}