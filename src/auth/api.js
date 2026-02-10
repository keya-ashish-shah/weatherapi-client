const API_URL = "http://localhost:5000/api";

// REGISTER USER
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Registration failed");
  return data;
}

// LOGIN USER
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");

  // Save token in localStorage
  localStorage.setItem("wv_token", data.token);
  return data;
}

// GENERIC FETCH WITH AUTH TOKEN
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("wv_token");
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
