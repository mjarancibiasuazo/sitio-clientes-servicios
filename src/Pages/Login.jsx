import React, { useState } from 'react';
import NavbarLogin from '../Components/NavbarLogin/NavbarLogin';
import { useNavigate } from 'react-router-dom'; 
import './CSS/Login.css';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    // Simulación de credenciales predefinidas
    const validUsername = 'jumbo';
    const validPassword = '123456';

    if (username === validUsername && password === validPassword) {
      // Si las credenciales son válidas, almacenar en localStorage
      localStorage.setItem('isLoggedIn', true);
      // Redireccionar a la página de servicios
      navigate('/mis-servicios'); 
    } else {
      // Si las credenciales son inválidas, mostrar mensaje de error o hacer lo que consideres apropiado
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <NavbarLogin />
      <div className='navbarlogin-background'>
        <div className='navbarlogin-content'>
          {/* Contenido del formulario de inicio de sesión */}
          <div className='navbarlogin-container'>
            <h1>Bienvenido</h1>
            <TextField
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: '65%', marginBottom: '3px', marginLeft: '60px' }} style={{ marginTop: '30px' }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: '65%', marginBottom: '15px', marginLeft: '60px' }} style={{ marginTop: '30px' }} 
            />
            <Button
              variant="contained"
              color="primary" 
              sx={{ width: '50%', marginLeft: '95px' }} 
              onClick={handleLogin} 
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

