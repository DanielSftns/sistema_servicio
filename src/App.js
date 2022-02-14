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

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/estudiante' element={<PanelEstudiante />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
