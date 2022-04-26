import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario || !usuario.token) {
    return <Navigate to="/login" />;
  }

  return children;
}
 
export default RequireAuth;