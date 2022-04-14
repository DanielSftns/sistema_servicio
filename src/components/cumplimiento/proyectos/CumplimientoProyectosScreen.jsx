import React from 'react';
import CumplimientoHeader from '../CumplimientoHeader';
import {
  Outlet
} from "react-router-dom";

const CumplimientoProyectosScreen = () => {
  return (
    <>
      <CumplimientoHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Outlet />
      </div>
    </>
  );
}
 
export default CumplimientoProyectosScreen;