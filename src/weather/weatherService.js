export const fetchWeather = async ({ city, user, token }) => {
  const res = await fetch("http://localhost:5000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      city,
      userId: user?._id || null,
      userName: user?.name || null,
    }),
  });

  if (!res.ok) throw new Error("Weather fetch failed");
  return await res.json();
};
