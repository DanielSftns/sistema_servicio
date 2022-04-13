import React from 'react';
import './App.css';
import {
  Router,
  Routes,
  Route
} from "react-router-dom";
import { history } from "./history";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Container } from '@chakra-ui/react'
import LandingScreen from './components/landing/LandingScreen';
import EstudianteScreen from './components/estudiante/EstudianteScreen';
import EstudiantePerfil from './components/estudiante/EstudiantePerfil';
import EstudianteSeccion from './components/estudiante/EstudianteSeccion';
import { AuthProvider } from './contexts/AuthContext'
import FacilitadorScreen from './components/facilitador/FacilitadorScreen';
import FacilitadorSeccion from './components/facilitador/FacilitadorSeccion';
import FacilitadorRegistrarSeccion from './components/facilitador/FacilitadorRegistrarSeccion';
import Perfil from './components/facilitador/Perfil';
import FacilitadorAsignaciones from './components/facilitador/FacilitadorAsignaciones';
import EstudianteAsignaciones from './components/estudiante/EstudianteAsignaciones';
import FacilitadorAprobarFaseFormativa from './components/facilitador/FacilitadorAprobarFaseFormativa';
import EstudianteSolicitud from './components/estudiante/EstudianteSolicitud';
import EstudianteProyecto from './components/estudiante/EstudianteProyecto';
import CumplimientoSolicitudes from './components/cumplimiento/solicitudes/CumplimientoSolicitudes';
import CumplimientoScreen from './components/cumplimiento/CumplimientoScreen';

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <CustomRouter history={history}>
        <Container maxW='container.xl' pb={12}>
          <Routes>
            <Route path='/' element={<LandingScreen /> } />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
            
              <Route path='/estudiante' element={<EstudianteScreen />}>
                <Route path='asignaciones' element={<EstudianteAsignaciones />} />
                <Route path='proyecto' element={<EstudianteProyecto />} />
                <Route path='solicitud' element={<EstudianteSolicitud />} />
                <Route path='perfil' element={<EstudiantePerfil />} />
                <Route index element={<EstudianteSeccion />} />
              </Route>

              <Route path='/facilitador' element={<FacilitadorScreen />}>
                <Route path='asignaciones' element={<FacilitadorAsignaciones />} />
                <Route path='registrar-seccion' element={<FacilitadorRegistrarSeccion />} />
                <Route path='perfil' element={<Perfil />} />
                <Route path='aprobar-fase-formativa' element={<FacilitadorAprobarFaseFormativa />} />
                <Route index element={<FacilitadorSeccion />} />
              </Route>

              <Route path='/solicitudes' element={<CumplimientoSolicitudes />} />
          </Routes>
        </Container>
      </CustomRouter>
    </AuthProvider>
  );
}

export default App;
