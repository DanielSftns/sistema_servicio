import React from 'react';
import EstudianteHeader from './EstudianteHeader';

import {
  Outlet
} from "react-router-dom";

const EstudianteScreen = () => {
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