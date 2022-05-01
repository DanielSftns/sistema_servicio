import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { usuario } = useAuth();

  if (usuario && usuario.token) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  
  return <Navigate to="/login" />;
}
 
export default RequireAuth;