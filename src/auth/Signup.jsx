import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateName, validateEmail, validateDOB, validatePassword } from "./validation";
import { registerUser } from "./api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", dob: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      dob: validateDOB(form.dob),
      password: validatePassword(form.password)
    };

    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      setError(Object.values(errors).filter(Boolean).join("\n"));
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        dob: form.dob,
        password: form.password
      });

      setSuccess("Account created! Redirecting to login...");
      setForm({ name: "", email: "", dob: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "30px auto", padding: 20, background: "white", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 6 }}>Create an account</h2>
      <p style={{ textAlign: "center", color: "#6b7280", marginTop: 0 }}>Signup for WeatherVision</p>

      {error && (
        <div style={{ padding: 12, background: "#fee", color: "#c00", borderRadius: 8, marginBottom: 12, fontSize: 14, whiteSpace: "pre-line" }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ padding: 12, background: "#efe", color: "#0a0", borderRadius: 8, marginBottom: 12, fontSize: 14 }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Full name</div>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Jane Doe"
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Date of Birth</div>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={onChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Password</div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="At least 8 characters"
            required
            style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 8,
              background: loading ? "#6b7280" : "#111827",
              color: "white",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#6b7280", color: "white", border: "none", cursor: "pointer" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
