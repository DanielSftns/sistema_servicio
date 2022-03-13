import React from 'react';
import FacilitadorHeader from './FacilitadorHeader';
import {
  Outlet
} from "react-router-dom";

const FacilitadorScreen = () => {
  return (
    <>
      <FacilitadorHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Outlet />
      </div>
    </>
  );
}
 
export default FacilitadorScreen;