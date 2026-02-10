import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./validation";
import { useAuth } from "./AuthContext";
import { loginUser } from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    if (eErr || pErr) return setError(eErr || pErr);

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      navigate("/weather");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20, background: "white", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
      <h2>Welcome back</h2>
      <p style={{ color: "#6b7280" }}>Login to access the Weather Dashboard</p>

      {error && <div style={{ background: "#fee", color: "#c00", padding: 12, borderRadius: 8 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
        <button disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
