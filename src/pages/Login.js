import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import io from 'socket.io-client';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
  Home as HomeIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const orangeColor = process.env.REACT_APP_THEME_COLOR || '#FF6F00';

const apiUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`;
const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';
// console.log('Socket URL:', socketUrl);
const socket = io(socketUrl);
// const socket = io(process.env.REACT_APP_SOCKET_URL);

const theme = createTheme({
  palette: {
    primary: {
      main: orangeColor,
    },
  },
});

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

//NOTIFICACIONESSSSSSS

useEffect(() => {
  // console.log('Intentando conectar al socket...');
  
  socket.on('connect', () => {
    // console.log('Conectado al servidor Socket.IO');
  });

  socket.on('connect_error', (error) => {
    console.error('Error de conexión Socket.IO:', error);
  });

  socket.on('user_connected', (data) => {
    // console.log('Notificación recibida:', data);
  });

  return () => {
    // console.log('Limpiando listeners de socket');
    socket.off('connect');
    socket.off('connect_error');
    socket.off('user_connected');
  };
}, []);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axios.post(apiUrl, credentials);
    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setError('');
      // console.log('Emitiendo evento user_login:', user);
      socket.emit('user_login', user);
      setSnackbarOpen(true);
      setTimeout(() => navigate('/home'), 1500);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    setError('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
  } finally {
    setIsLoading(false);
  }
};


  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  

  return (

    
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      //  background: 'linear-gradient(45deg, #FF6F00 30%, #9C27B0 90%)',
      
      }}>
        
        <style>{'body { background-color:  #f0f0f0; }'}</style>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="https://www.cbvision.net.ec/wp-content/uploads/2023/10/cbvision-logo@1x-sticky.png"
              alt="CBVision Logo"
              style={{ width: '200px', marginBottom: '20px' }}
            />
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: orangeColor }}>
              Sistema de gestión de tickets
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <TextField
                name="username"
                label="Nombre de usuario"
                variant="outlined"
                margin="normal"
                fullWidth
                value={credentials.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password"
                label="Contraseña"
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, height: '50px' }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
              </Button>
            </form>
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Volver a la página principal
            </Button>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Inicio de sesión exitoso. Redirigiendo..."
      />
    </ThemeProvider>
  );
};

export default Login;