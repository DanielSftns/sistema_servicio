import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PanelEstudiante from './components/estudiante/PanelEstudiante';

import {
  Box
} from '@chakra-ui/react'
import LandingScreen from './components/landing/LandingScreen';


function App() {
  return (
    <BrowserRouter>
      <Box maxW={1024} m="auto">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/estudiante' element={<PanelEstudiante />} />
          <Route path='/' element={<LandingScreen /> } />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
