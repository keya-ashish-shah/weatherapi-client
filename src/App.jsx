
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import WeatherPage from "./pages/WeatherPage";
import Home from "./pages/Home";
import SidebarLayout from "./layout/SidebarLayout";
import "./App.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/weather"
              element={
                <PrivateRoute>
                  <WeatherPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
