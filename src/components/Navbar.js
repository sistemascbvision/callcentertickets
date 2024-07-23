// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem, Snackbar } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';
// const socket = io(socketUrl);

// function Navbar({ onToggleSidebar, onToggleTheme, darkMode, theme }) {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [user, setUser] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }

//         socket.on('user_disconnected', (data) => {
//             setSnackbarMessage(`${data.username} ha cerrado sesión`);
//             setSnackbarOpen(true);
//         });

//         return () => {
//             socket.off('user_disconnected');
//         };
//     }, []);

//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         const username = user.username;
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         socket.emit('user_logout', { username });
        
//         navigate('/login');
//         handleClose();
//     };

//     const handleSnackbarClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setSnackbarOpen(false);
//     };

//     return (
//         <>
//             <AppBar
//                 position="fixed"
//                 sx={{
//                   zIndex: theme.zIndex.drawer + 1,
//                     backgroundColor: theme.palette.primary.main,  
//                 }}
//             >
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         edge="start"
//                         onClick={onToggleSidebar}
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap>
//                         CBVision Tickets
//                     </Typography>
//                     <Box ml="auto" display="flex" alignItems="center">
//                         <IconButton
//                             color="inherit"
//                             aria-label="toggle theme"
//                             onClick={onToggleTheme}
//                         >
//                             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//                         </IconButton>
//                         {user && (
//                             <Box display="flex" alignItems="center">
//                                 <Typography variant="body1" sx={{ pr: 1 }}>{user.username}</Typography>
//                                 <Avatar
//                                     sx={{ backgroundColor: 'purple' }}
//                                     onClick={handleMenu}
//                                 >
//                                     {user.username.charAt(0).toUpperCase()}
//                                 </Avatar>
//                             </Box>
//                         )}
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorEl}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorEl)}
//                             onClose={handleClose}
//                         >
//                             <MenuItem onClick={handleClose}>Configuraciones</MenuItem>
//                             <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Snackbar
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'left',
//                 }}
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 message={snackbarMessage}
//             />
//         </>
//     );
// }

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Avatar, 
    Box, 
    Menu, 
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../NotificacionContext';


function Navbar({ onToggleSidebar, onToggleTheme, darkMode, theme }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { socket } = useNotification();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleLogout = () => {
        const username = user.username;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Emitir evento de cierre de sesión
        socket.emit('user_logout', { username });
        
        navigate('/login');
        handleClose();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onToggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    CBVision Tickets
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        onClick={onToggleTheme}
                        sx={{ mr: 1 }}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    {user && (
                        <>
                            <Typography variant="body1" sx={{ mr: 1 }}>
                                {user.username}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                <MenuItem onClick={handleProfile} >Mi cuenta</MenuItem>
                                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;