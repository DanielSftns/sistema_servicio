import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const EnFaseCumplimiento = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario.fase_formativa) {
    return <Navigate to="/estudiante/seccion" />;
  }

  return children;
}
 
export default EnFaseCumplimiento;