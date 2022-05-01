import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const EnFaseFormativa = ({ children }) => {
  const { usuario } = useAuth();

  if (usuario.fase_formativa) {
    return <Navigate to="/estudiante/proyecto" />;
  }

  return children;
}
 
export default EnFaseFormativa;