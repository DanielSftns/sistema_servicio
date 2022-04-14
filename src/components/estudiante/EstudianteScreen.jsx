import React, { useEffect } from 'react';
import EstudianteHeader from './EstudianteHeader';

import {
  Outlet
} from "react-router-dom";
import { getNotificaciones } from '../../services/notificaciones.service';

const EstudianteScreen = () => {
  useEffect(() => {
    getNotificaciones()
    .then(notificaciones => {
      console.log('notificaciones', notificaciones)
    })
  }, [])

  return (
    <>
      <EstudianteHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Outlet />
      </div>
    </>
  );
}
 
export default EstudianteScreen;