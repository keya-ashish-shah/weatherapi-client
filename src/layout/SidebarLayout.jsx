import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Sidebar.css";

export default function SidebarLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Weather", to: "/weather" },
      { label: "Signup", to: "/signup" },
      { label: "Login", to: "/login" },
    ],
    []
  );

  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🌤️ WeatherVision</h2>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`nav-link ${location.pathname === n.to ? "active" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <>
              <div className="user-profile">
                <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="name">{user.name}</div>
                  <div className="email">{user.email}</div>
                </div>
              </div>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <p className="not-logged">Not logged in</p>
          )}
        </div>
      </aside>

      <div className="main-container">
        <main className="main-content">{children}</main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} WeatherVision | Powered by Open-Meteo API</p>
        </footer>
      </div>
    </div>
  );
}
