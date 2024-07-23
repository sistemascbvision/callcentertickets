// src/components/Breadcrumbs.js
import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const routeNames = {
  '': 'Inicio',
  'tickets': 'Tickets',
  'consultas': 'Consultas',
  'cbplay': 'CBPlay',
  'cbinfo': 'Estadísticas',
  'configuraciones': 'Configuraciones',
};

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <Link
        component={RouterLink}
        color="inherit"
        to="/home"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Special case for ticket details
        if (value === 'tickets' && pathnames[index + 1]) {
          return last ? (
            <Typography color="textPrimary" key={to}>
              Ticket Details
            </Typography>
          ) : (
            <Link component={RouterLink} color="inherit" to={to} key={to}>
              Tickets
            </Link>
          );
        }

        return last ? (
          <Typography color="textPrimary" key={to}>
            {routeNames[value] || value}
          </Typography>
        ) : (
          <Link component={RouterLink} color="inherit" to={to} key={to}>
            {routeNames[value] || value}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;