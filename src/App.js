import React from 'react';
import './App.css';
import CustomRouter from './CustomRouter';
import {
  Routes,
  Route
} from "react-router-dom";
import { history } from "./history";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Container } from '@chakra-ui/react'
import LandingScreen from './components/landing/LandingScreen';
import EstudiantePerfil from './components/estudiante/EstudiantePerfil';
import EstudianteSeccion from './components/estudiante/EstudianteSeccion';
import { AuthProvider } from './contexts/AuthContext'
import FacilitadorSeccion from './components/facilitador/FacilitadorSeccion';
import FacilitadorRegistrarSeccion from './components/facilitador/FacilitadorRegistrarSeccion';
import FacilitadorAsignaciones from './components/facilitador/FacilitadorAsignaciones';
import EstudianteAsignaciones from './components/estudiante/EstudianteAsignaciones';
import FacilitadorAprobarFaseFormativa from './components/facilitador/FacilitadorAprobarFaseFormativa';
import EstudianteSolicitud from './components/estudiante/EstudianteSolicitud';
import EstudianteProyecto from './components/estudiante/EstudianteProyecto';
import CumplimientoSolicitudes from './components/cumplimiento/solicitudes/CumplimientoSolicitudes';
import CumplimientoProyectos from './components/cumplimiento/proyectos/CumplimientoProyectos';
import CumplimientoRegistrarProyecto from './components/cumplimiento/proyectos/CumplimientoRegistrarProyecto';
import CumplimientoProyectoDetalles from './components/cumplimiento/proyectos/CumplimientoProyectoDetalles';
import CumplimientoMacroProyectos from './components/cumplimiento/macroproyectos/CumplimientoMacroProyectos';
import CumplimientoMacroProyectoDetalles from './components/cumplimiento/macroproyectos/CumplimientoMacroProyectoDetalles';
import CumplimientoGrupoDetalles from './components/cumplimiento/macroproyectos/CumplimientoGrupoDetalles';
import PerfilCompletoRequerido from './guards/PerfilCompletoRequerido'
import RequireAuth from './guards/RequireAuth';
import CumplimientoRegistrarMacroProyecto from './components/cumplimiento/macroproyectos/CumplimientoRegistrarMacroProyecto';
import CumplimientoRegistrarGrupo from './components/cumplimiento/macroproyectos/CumplimientoRegistrarGrupo';
import EnFaseFormativa from './guards/EnFaseFormativa';
import EnFaseCumplimiento from './guards/EnFaseCumplimiento';
import CumplimientoInforme from './components/cumplimiento/CumplimientoInforme';
import NoEstudiante from './guards/NoEstudiante';
import Estudiante from './guards/Estudiante';
import NoFacilitador from './guards/NoFacilitador';
import NoTutorCumplimiento from './guards/NoTutorCumplimiento';
import CoordinadorInformes from './components/coordinador/CoordinadorInformes';
import NoTutorAcademico from './guards/NoTutorAcademico';


function App() {
  return (
    <AuthProvider>
      <CustomRouter history={history}>
        <Container maxW='container.xl' pb={12}>
          <Routes>
            <Route path='/' element={<LandingScreen /> } />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
            
            <Route element={<RequireAuth />}>
              <Route element={<Estudiante />}>
                <Route path='perfil' element={<EstudiantePerfil />} />
                <Route element={<PerfilCompletoRequerido />}>
                  <Route element={<EnFaseFormativa />}>
                    <Route path='seccion' element={<EstudianteSeccion />} />
                    <Route path='asignaciones' element={<EstudianteAsignaciones />} />
                  </Route>

                  <Route element={<EnFaseCumplimiento />}>
                    <Route path='proyecto' element={<EstudianteProyecto />} />
                    <Route path='solicitud' element={<EstudianteSolicitud />} />
                  </Route>
                </Route>
              </Route>

              <Route path='/profesor' element={<NoEstudiante />}>
                <Route path='perfil' element={<EstudiantePerfil />} />

                <Route path='tutor'>
                  <Route path='proyectos'>
                    <Route path=':proyectoID' element={<CumplimientoProyectoDetalles />} />
                    <Route index element={<CumplimientoProyectos />} />
                  </Route>
                  <Route path='macroproyectos' >
                    <Route path=':proyectoID' element={<CumplimientoMacroProyectoDetalles />} />
                    <Route path=':proyectoID/:grupoID' element={<CumplimientoGrupoDetalles />} />
                    <Route index element={<CumplimientoMacroProyectos />} />                
                  </Route>
                </Route>

                <Route element={<NoTutorAcademico />}>
                  <Route path='seccion' element={<FacilitadorSeccion />} />
                  <Route path='asignaciones' element={<FacilitadorAsignaciones />} />
                  <Route path='registrar-seccion' element={<FacilitadorRegistrarSeccion />} />
                  <Route path='aprobar-fase-formativa' element={<FacilitadorAprobarFaseFormativa />} />
                  
                  <Route element={<NoFacilitador />}>
                    <Route path='informe' element={<CumplimientoInforme />} />
                    <Route path='solicitudes' element={<CumplimientoSolicitudes />} />

                    <Route path='proyectos'>
                      <Route path='registrar' element={<CumplimientoRegistrarProyecto />} />
                      <Route path=':proyectoID' element={<CumplimientoProyectoDetalles />} />
                      <Route index element={<CumplimientoProyectos />} />
                    </Route>
                    <Route path='macroproyectos' >
                      <Route path=':proyectoID' element={<CumplimientoMacroProyectoDetalles />} />
                      <Route path=':proyectoID/crear' element={<CumplimientoRegistrarGrupo />} />
                      <Route path=':proyectoID/:grupoID' element={<CumplimientoGrupoDetalles />} />
                      <Route index element={<CumplimientoMacroProyectos />} />                
                    </Route>

                    <Route element={<NoTutorCumplimiento />}>
                      <Route path='informes' element={<CoordinadorInformes />} />
                      <Route path='macroproyectos/registrar' element={<CumplimientoRegistrarMacroProyecto />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            
            <Route path='forbiden' element={<>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
              }}>
                <h1 style={{
                  textAlign: 'center',
                  fontSize: '5rem',
                  fontWeight: 'bold'
                }}>403</h1>
                <h2 style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}>Acceso denegado</h2>
              </div>
            </>} />
            <Route path='*' element={<>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
              }}>
                <h1 style={{
                  textAlign: 'center',
                  fontSize: '5rem',
                  fontWeight: 'bold'
                }}>404</h1>
                <h2 style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}>Pagina no encontrada</h2>
              </div>
            </>} />
          </Routes>
        </Container>
      </CustomRouter>
    </AuthProvider>
  );
}

export default App;
