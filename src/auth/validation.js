export function validateName(name) {
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export function validateDOB(dob) {
  if (!dob) {
    return "Date of birth is required";
  }
  const date = new Date(dob);
  const now = new Date();
  if (date >= now) {
    return "Invalid date of birth";
  }
  return null;
}

export function validatePassword(password) {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
}
