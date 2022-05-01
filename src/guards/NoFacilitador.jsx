import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const NoFacilitador = () => {
  const { usuario } = useAuth();

  if (usuario.rol_name !== 'facilitador') {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to="/forbiden" />;
}
 
export default NoFacilitador;