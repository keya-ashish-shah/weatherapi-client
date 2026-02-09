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

    if (eErr || pErr) {
      setError(eErr || pErr);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      login(response.user);
      navigate("/weather");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20, background: "white", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
      <h2 style={{ marginTop: 0 }}>Welcome back</h2>
      <p style={{ color: "#6b7280" }}>Login to access the Weather Dashboard</p>

      {error && (
        <div style={{ padding: 12, background: "#fee", color: "#c00", borderRadius: 8, marginBottom: 12, fontSize: 14 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 14 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
          <input
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Password</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            background: loading ? "#6b7280" : "#0f172a",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{ background: "none", border: "none", color: "#0f172a", textDecoration: "underline", cursor: "pointer" }}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
