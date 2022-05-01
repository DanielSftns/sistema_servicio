import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const NoTutorAcademico = () => {
  const { usuario } = useAuth();

  if (usuario.rol_name !== 'tutor academico') {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to="/forbiden" />;
}
 
export default NoTutorAcademico;