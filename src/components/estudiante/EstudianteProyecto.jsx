import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EstudianteProyecto = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    navigate('/estudiante/solicitud')
  }, [navigate])
  
  return (
    <h1>proyecto</h1>
  );
}
 
export default EstudianteProyecto;