import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";



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

  useEffect(() => {
    const raw = localStorage.getItem("wv_auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.user?.email) {
          dispatch({ type: "LOGIN", payload: parsed });
        }
      } catch {
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("wv_auth", JSON.stringify({ user: state.user, token: state.token }));
    } else {
      localStorage.removeItem("wv_auth");
    }
  }, [state.user, state.token]);

  const login = useCallback((user) => {
    const token = "local:" + btoa(user.email + ":" + Date.now());
    dispatch({ type: "LOGIN", payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
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
 
   
