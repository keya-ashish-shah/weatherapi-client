import React, { Suspense, useMemo } from "react";
import Weather from "../weather/Weather";

export default function WeatherPage() {
  const title = useMemo(() => "Global Weather Dashboard", []);
  return (
    <div style={{ maxWidth: 1100, margin: "20px auto" }}>
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ marginTop: 6, color: "#6b7280" }}>Real-time weather (Open-Meteo) — hourly forecast for sample Indian cities.</p>
      </div>

      <Suspense fallback={<div>Loading weather UI...</div>}>
        <Weather />
      </Suspense>
    </div>
  );
}
// suspense for fallback ui it is a component used to render fallback ui while the updated latest ui gets ready to render