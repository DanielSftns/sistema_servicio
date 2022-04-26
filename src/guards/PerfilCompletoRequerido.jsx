import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PerfilCompletoRequerido = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario.perfil_completo) {
    return <Navigate to="perfil" />;
  }

  return children;
}
 
export default PerfilCompletoRequerido;