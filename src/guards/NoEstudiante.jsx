import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import ProfesorHeader from '../components/profesor/ProfesorHeader';

const NoEstudiante = () => {
  const { usuario } = useAuth();

  if (usuario.rol_name !== 'estudiante') {
    return (
      <>
        <ProfesorHeader />
        <div style={{'paddingTop': '2rem'}}>
          <Outlet />
        </div>
      </>
    );
  }

  return <Navigate to="/forbiden" />;
}
 
export default NoEstudiante;