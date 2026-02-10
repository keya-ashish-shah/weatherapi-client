import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const rawUser = localStorage.getItem("wv_user");
    const token = localStorage.getItem("wv_token");
    if (rawUser && token) {
      try {
        const user = JSON.parse(rawUser);
        dispatch({ type: "LOGIN", payload: { user, token } });
      } catch {
        localStorage.removeItem("wv_user");
        localStorage.removeItem("wv_token");
      }
    }
  }, []);

  // Persist user + token
  useEffect(() => {
    if (state.user && state.token) {
      localStorage.setItem("wv_user", JSON.stringify(state.user));
      localStorage.setItem("wv_token", state.token);
    } else {
      localStorage.removeItem("wv_user");
      localStorage.removeItem("wv_token");
    }
  }, [state.user, state.token]);

  const login = useCallback((user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("wv_user");
    localStorage.removeItem("wv_token");
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
