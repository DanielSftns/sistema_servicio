import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const NoTutorCumplimiento = () => {
  const { usuario } = useAuth();

  if (usuario.rol_name !== 'tutor etapa cumplimiento') {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to="/forbiden" />;
}
 
export default NoTutorCumplimiento;