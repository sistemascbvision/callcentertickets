// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { Box, ThemeProvider, CssBaseline, Snackbar } from '@mui/material';
// import { lightTheme, darkTheme } from '../theme';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Breadcrumbs from './Breadcrumbs';
// import Tickets from '../pages/Tickets';
// import Consultas from '../pages/Consultas';
// import CBPlay from '../pages/CBPlay';
// import CBInfo from '../pages/CBInfo';
// import Configuraciones from '../pages/Configuraciones';
// import Pruebas from '../pages/Pruebas';
// import WSockets from '../pages/wsockets';
// import TicketDetails from '../pages/TicketDetails';
// import MuiAlert from '@mui/material/Alert';
// import { io } from 'socket.io-client';

// const drawerWidth = 240;

// function Dashboard() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const location = useLocation();
//   const theme = darkMode ? darkTheme : lightTheme;

//   useEffect(() => {
//     const newSocket = io(process.env.REACT_APP_SOCKET_URL);
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Socket connected:', newSocket.id);
//       setSocketConnected(true);
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Socket disconnected');
//       setSocketConnected(false);
//     });

//     return () => {
//       newSocket.disconnect();
//       console.log('Socket disconnected');
//       setSocketConnected(false);
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('notification', (data) => {
//         console.log('Received notification:', data.message);
//         setNotification(data.message);
//         setOpenSnackbar(true);
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off('notification');
//       }
//     };
//   }, [socket]);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleThemeToggle = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
//         <Navbar
//           onToggleSidebar={handleDrawerToggle}
//           onToggleTheme={handleThemeToggle}
//           darkMode={darkMode}
//           isOpen={mobileOpen}
//           drawerWidth={drawerWidth}
//           theme={theme}
//         />
//         <Sidebar
//           mobileOpen={mobileOpen}
//           onDrawerToggle={handleDrawerToggle}
//           darkMode={darkMode}
//           open={mobileOpen}
//           drawerWidth={drawerWidth}
//           zIndex={-1}
//         />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${mobileOpen ? drawerWidth : 0}px)` },
//             ml: { sm: `${mobileOpen ? drawerWidth : 0}px` },
//             transition: theme.transitions.create(['width', 'margin'], {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.leavingScreen,
//             }),
//             mt: `${theme.mixins.toolbar.minHeight + 8}px`,
//           }}
//         >
//           <Breadcrumbs />
//           <Box mt={2}>
//             <Routes>
//               <Route path="tickets" element={<Tickets />} />
//               <Route path="tickets/:ticketId" element={<TicketDetails />} />
//               <Route path="consultas" element={<Consultas />} />
//               <Route path="cbplay" element={<CBPlay />} />
//               <Route path="cbinfo" element={<CBInfo />} />
//               <Route path="configuraciones" element={<Configuraciones />} />
//               <Route path="pruebas" element={<Pruebas />} />
//               <Route path="wsockets" element={<WSockets />} />
//               <Route path="*" element={<Navigate to="tickets" replace />} />
//             </Routes>
//           </Box>
//         </Box>

//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         >
//           <MuiAlert elevation={6} variant="filled" severity="info">
//             {notification}
//           </MuiAlert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline, Snackbar } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import Tickets from '../pages/Tickets';
import Consultas from '../pages/Consultas';
import CBPlay from '../pages/CBPlay';
import CBInfo from '../pages/CBInfo';
import Configuraciones from '../pages/Configuraciones';
import Pruebas from '../pages/Pruebas';
import WSockets from '../pages/wsockets';
import TicketDetails from '../pages/TicketDetails';
import MuiAlert from '@mui/material/Alert';
import Profile from '../pages/Profile';
import { io } from 'socket.io-client';
import GlobalNotification from '../GlobalNotification';

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const location = useLocation();
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setSocketConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setSocketConnected(false);
    });

    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected');
      setSocketConnected(false);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data) => {
        console.log('Received notification:', data.message);
        setNotification(data.message);
        setOpenSnackbar(true);
      });
    }

    return () => {
      if (socket) {
        socket.off('notification');
      }
    };
  }, [socket]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
        <Navbar
          onToggleSidebar={handleDrawerToggle}
          onToggleTheme={handleThemeToggle}
          darkMode={darkMode}
          isOpen={mobileOpen}
          drawerWidth={drawerWidth}
          theme={theme}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          darkMode={darkMode}
          open={mobileOpen}
          drawerWidth={drawerWidth}
          zIndex={-1}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${mobileOpen ? drawerWidth : 0}px)` },
            ml: { sm: `${mobileOpen ? drawerWidth : 0}px` },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            mt: `${theme.mixins.toolbar.minHeight + 8}px`,
          }}
        >
          <Breadcrumbs />
          <Box mt={2}>
            <Routes>
              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/:ticketId" element={<TicketDetails />} />
              <Route path="consultas" element={<Consultas />} />
              <Route path="cbplay" element={<CBPlay />} />
              <Route path="cbinfo" element={<CBInfo />} />
              <Route path="configuraciones" element={<Configuraciones />} />
              <Route path="pruebas" element={<Pruebas />} />
              <Route path="wsockets" element={<WSockets />} />
              <Route path="*" element={<Navigate to="tickets" replace />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="outlined" severity="info">
            {notification}
          </MuiAlert>
        </Snackbar>

        <GlobalNotification />
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;