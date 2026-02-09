import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <div style={{ background: "white", padding: 24, borderRadius: 12, boxShadow: "0 8px 30px rgba(2,6,23,0.06)" }}>
        <h2 style={{ marginTop: 0 }}>Welcome to WeatherVision</h2>
        <p style={{ color: "#6b7280" }}>
          Use the sidebar to navigate. Sign up and log in to access the Weather Dashboard. This demo stores accounts locally in your browser using LocalStorage.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <Link to="/signup" style={{ padding: "10px 12px", background: "#0f172a", color: "white", borderRadius: 8, textDecoration: "none" }}>Create account</Link>
          <Link to="/login" style={{ padding: "10px 12px", background: "#6b7280", color: "white", borderRadius: 8, textDecoration: "none" }}>Login</Link>
          <Link to="/weather" style={{ padding: "10px 12px", background: "#0369a1", color: "white", borderRadius: 8, textDecoration: "none" }}>Open Weather (protected)</Link>
        </div>
      </div>
    </div>
  );
}
