import React from 'react';
import CumplimientoHeader from './CumplimientoHeader';
import {
  Outlet
} from "react-router-dom";

const CumplimientoScreen = () => {
  return (
    <>
      <CumplimientoHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Outlet />
      </div>
    </>
  );
}
 
export default CumplimientoScreen;