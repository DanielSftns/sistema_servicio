import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PerfilCompletoRequerido = () => {
  const { usuario } = useAuth();

  if (usuario.perfil_completo) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to="/perfil" />;
}
 
export default PerfilCompletoRequerido;