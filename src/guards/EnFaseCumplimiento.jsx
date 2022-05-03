import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const EnFaseCumplimiento = () => {
  const { usuario } = useAuth();

  if (usuario.fase_formativa) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  
  return <Navigate to="/seccion" />;
}
 
export default EnFaseCumplimiento;