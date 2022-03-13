import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container maxW='container.xl' pb={12}>
          <Routes>
            <Route path='/' element={<LandingScreen /> } />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
            
              <Route path='/estudiante' element={<EstudianteScreen />}>
                <Route path='proyecto' element={<h1>Proyecto</h1>} />
                <Route path='perfil' element={<EstudiantePerfil />} />
                <Route index element={<EstudianteSeccion />} />
              </Route>

              <Route path='/facilitador' element={<FacilitadorScreen />}>
                <Route index element={<FacilitadorSeccion />} />
              </Route>

          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
