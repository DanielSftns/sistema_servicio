import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import PanelEstudiante from './components/estudiante/PanelEstudiante';

import {
  Box
} from '@chakra-ui/react'


function App() {
  return (
    <Box
      maxW={1024}
      m="auto"
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/estudiante' element={<PanelEstudiante />} />
          <Route path='/' element={<h1>landing</h1>} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
