export function validateName(name) {
  if (!name || name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}

export function validateEmail(email) {
  if (!email) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Invalid email address";
  return "";
}

export function validateDOB(dob) {
  if (!dob) return "Date of birth is required";
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return "Invalid date";
  const ageDiff = Date.now() - d.getTime();
  const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  if (age < 13) return "You must be at least 13 years old";
  return "";
}
 
export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Include at least one number";
  if (!/[!@#$%^&*]/.test(password)) return "Include at least one special character (!@#$%^&*)";
  return "";
}
