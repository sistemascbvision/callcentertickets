import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

function Sidebar({ mobileOpen, onDrawerToggle, darkMode, open, drawerWidth, onCollapseSidebar }) {
  const [selectedItem, setSelectedItem] = useState('Inicio');

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/home' },
    { text: 'Tickets', icon: <InboxIcon />, path: '/tickets' },
    { text: 'Consultas', icon: <DraftsIcon />, path: '/consultas' },
    { text: 'CBPlay', icon: <SendIcon />, path: '/cbplay' },
    { text: 'Estadísticas', icon: <BarChartIcon />, path: '/cbinfo' },
    { text: 'Configuraciones', icon: <SettingsIcon />, path: '/configuraciones' },
  ];

  const gradientBackground = darkMode
    ? 'linear-gradient(to bottom, #4a148c, #880e4f)'  // Gradiente oscuro
    : 'linear-gradient(to bottom, #fff3e0, #fff3e5)'; // Gradiente claro
   // fff3e0 e1bee7
  const drawer = (
    <Box
      sx={{
        width: open ? drawerWidth : theme => theme.spacing(8),
        background: gradientBackground,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onCollapseSidebar} sx={{ color: darkMode ? 'white' : '#4a148c' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)' }} />
      <List sx={{ flexGrow: 1, marginTop: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            selected={selectedItem === item.text}
            onClick={() => handleItemClick(item.text)}
            key={item.text}
            sx={{
              color: darkMode ? 'white' : '#4a148c',
              padding: '10px 16px',
              marginBottom: 0.5,
              '&.Mui-selected': {
                bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(74,20,140,0.1)',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(74,20,140,0.2)',
                },
                '& .MuiListItemIcon-root': {
                  color: darkMode ? 'white' : '#4a148c',
                },
              },
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(74,20,140,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem' }} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: theme => theme.zIndex.drawer },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={onDrawerToggle}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? drawerWidth : theme => theme.spacing(8),
            zIndex: theme => theme.zIndex.drawer - 1,
            transition: theme => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Sidebar;