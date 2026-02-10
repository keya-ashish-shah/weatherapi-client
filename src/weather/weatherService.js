export const fetchWeather = async ({ city }) => {
  const token = localStorage.getItem("wv_token");
  const res = await fetch("http://localhost:5000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ city }),
  });

  if (!res.ok) throw new Error("Weather fetch failed");
  return await res.json();
};
