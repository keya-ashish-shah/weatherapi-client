import React, { useState, useRef, useDeferredValue, useTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalUsers from "./useLocalUsers";
import { validateEmail, validatePassword } from "./validation";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const deferredEmail = useDeferredValue(email);
  const [isPending, startTransition] = useTransition();
  const { findByEmail } = useLocalUsers();
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus(); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eErr = validateEmail(deferredEmail);
    const pErr = validatePassword(password);

    if (eErr || pErr) {
      alert(eErr || pErr);
      return;
    }

    startTransition(() => {
      const user = findByEmail(deferredEmail);
      if (!user) {
        alert("No account found with that email. Please sign up.");
        return;
      }

      if (user.passwordHash !== btoa(password)) {
        alert("Invalid credentials");
        return;
      }

      login({ name: user.name, email: user.email, dob: user.dob });
      navigate("/weather");
    });
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20, background: "white", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
      <h2 style={{ marginTop: 0 }}>Welcome back</h2>
      <p style={{ color: "#6b7280" }}>Login to access the Weather Dashboard</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 14 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
          <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Password</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your password" required />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#0f172a", color: "white", border: "none" }}>
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  ); 
}


