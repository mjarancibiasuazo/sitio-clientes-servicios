import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'
import MisServicios from './Pages/MisServicios';
import Login from './Pages/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* Página de inicio de sesión */}
        <Route path="/" element={<Login />} />

        {/* Página de Mis Servicios */}
        <Route path="/mis-servicios" element={<>
          <Navbar /> {/* Navbar para la página de Mis Servicios */}
          <MisServicios />
        </>} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
