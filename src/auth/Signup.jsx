import React, { useReducer, useRef, useId, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalUsers from "./useLocalUsers";
import { validateName, validateEmail, validateDOB, validatePassword } from "./validation";

const initialForm = {
  name: "",
  email: "",
  dob: "",
  password: ""
};

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialForm;
    default:
      return state;
  }
}

export default function Signup() {
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const { addUser, findByEmail } = useLocalUsers();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const id = useId();

  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onChange = (e) => {
    dispatch({ type: "CHANGE", field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      dob: validateDOB(form.dob),
      password: validatePassword(form.password)
    };

    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      alert(Object.values(errors).filter(Boolean).join("\n"));
      return;
    }

    if (findByEmail(form.email)) {
      alert("An account with this email already exists. Login instead.");
      return;
    }

    const passwordHash = btoa(form.password);
    addUser({ name: form.name.trim(), email: form.email.toLowerCase().trim(), dob: form.dob, passwordHash });
    alert("Account created. Please login.");
    dispatch({ type: "RESET" });
    navigate("/login");
  };

  return (
    <div className="auth-card" style={{ maxWidth: 520, margin: "30px auto", padding: 20, background: "white", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 6 }}>Create an account</h2>
      <p style={{ textAlign: "center", color: "#6b7280", marginTop: 0 }}>Signup for WeatherVision</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Full name</div>
          <input name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" required />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
          <input ref={emailRef} id={id + "-email"} type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Date of Birth</div>
          <input type="date" name="dob" value={form.dob} onChange={onChange} required />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Password</div>
          <input type="password" name="password" value={form.password} onChange={onChange} placeholder="At least 8 characters" required />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#111827", color: "white", border: "none" }}>Sign up</button>
          <button type="button" onClick={() => navigate("/login")} style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#6b7280", color: "white", border: "none" }}>Login</button>
        </div>
      </form>
    </div>
  );
}
