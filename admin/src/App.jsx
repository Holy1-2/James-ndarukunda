import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { getToken } from "./api/client.js";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Contacts from "./pages/Contacts.jsx";
import Events from "./pages/Events.jsx";
import Gallery from "./pages/Gallery.jsx";
import SiteInfo from "./pages/SiteInfo.jsx";

function RequireAuth() {
  const location = useLocation();
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default function App() {
  useEffect(() => {
    document.title = "Jaems — Admin Panel";
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="site-info" element={<SiteInfo />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}