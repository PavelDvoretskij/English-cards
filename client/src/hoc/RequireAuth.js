import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }) {
  const { token } = useAuth();

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
