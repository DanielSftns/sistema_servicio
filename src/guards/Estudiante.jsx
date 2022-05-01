import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import EstudianteHeader from '../components/estudiante/EstudianteHeader';

const Estudiante = () => {
  const { usuario } = useAuth();

  if (usuario.rol_name === 'estudiante') {
    return (
      <>
        <EstudianteHeader />
        <div style={{'paddingTop': '2rem'}}>
          <Outlet />
        </div>
      </>
    );
  }

  return <Navigate to="/forbiden" />;
}
 
export default Estudiante;