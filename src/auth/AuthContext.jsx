import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem("wv_user");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user?.email) {
          dispatch({ type: "LOGIN", payload: user });
        }
      } catch {
        localStorage.removeItem("wv_user");
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("wv_user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("wv_user");
    }
  }, [state.user]);

  const login = useCallback((user) => {
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
