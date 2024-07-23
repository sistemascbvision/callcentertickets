
// import React from 'react';
// import { Box, Paper, Typography, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import PlanIcon from '@mui/icons-material/Assessment';
// import FeedNoticias from '../components/FeedNoticias'; // feed noticias
// import AnunciosCarousel from '../components/AnunciosCarousel';

// const Home = () => {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={9}>
//         <Box sx={{ p: 2 }}>

    
//           <Box sx={{ mb: 3 }}>
//             <AnunciosCarousel />
//           </Box>

//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={3}>
//               <Link to="/tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '&:hover': {
//                       backgroundColor: 'primary.main',
//                       color: 'white',
//                       transform: 'scale(1.1)',
//                       transition: 'transform 0.3s ease',
//                     },
//                   }}
//                 >
//                   <InboxIcon sx={{ fontSize: 40 }} />
//                   <Typography variant="h6">Tickets</Typography>
//                 </Paper>
//               </Link>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Link to="/consultas" style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '&:hover': {
//                       backgroundColor: 'primary.main',
//                       color: 'white',
//                       transform: 'scale(1.1)',
//                       transition: 'transform 0.3s ease',
//                     },
//                   }}
//                 >
//                   <DraftsIcon sx={{ fontSize: 40 }} />
//                   <Typography variant="h6">Consultas</Typography>
//                 </Paper>
//               </Link>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Link to="/planes" style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '&:hover': {
//                       backgroundColor: 'primary.main',
//                       color: 'white',
//                       transform: 'scale(1.1)',
//                       transition: 'transform 0.3s ease',
//                     },
//                   }}
//                 >
//                   <PlanIcon sx={{ fontSize: 40 }} />
//                   <Typography variant="h6">Planes</Typography>
//                 </Paper>
//               </Link>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Link to="/cbplay" style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '&:hover': {
//                       backgroundColor: 'primary.main',
//                       color: 'white',
//                       transform: 'scale(1.1)',
//                       transition: 'transform 0.3s ease',
//                     },
//                   }}
//                 >
//                   <SendIcon sx={{ fontSize: 40 }} />
//                   <Typography variant="h6">CBPlay</Typography>
//                 </Paper>
//               </Link>
//             </Grid>
           
//           </Grid>
//         </Box>
//       </Grid>
//       <Grid item xs={12} sm={3}>
//         <Box sx={{ p: 3 }}>
//           <FeedNoticias />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default Home;

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../theme';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Box, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { WifiTethering, Support, LiveTv, Menu } from '@mui/icons-material';
import FeedNoticias from '../components/FeedNoticias';
import AnunciosCarousel from '../components/AnunciosCarousel';

const Home = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <img src="https://www.cbvision.net.ec/wp-content/uploads/2023/10/cbvision-logo@1x-sticky.png" alt="CBVision Logo" style={{ height: '40px' }} />
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {['Inicio', 'Noticias', 'Recursos', 'Contacto'].map((item) => (
                  <Button key={item} color="inherit" component={Link} to="/login">
                    {item}
                  </Button>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{ ml: 2 }}
              >
                Iniciar Sesión
              </Button>
              <IconButton color="inherit" sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
                <Menu />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                  Sistema de tickets de CBVision
                </Typography>
                <Typography variant="body1" paragraph>
                  Bienvenido al sistema de gestión de tickets de CBVision. Aquí podrás gestionar tus solicitudes y recibir soporte.
                </Typography>
              </Paper>

              <Box sx={{ mb: 3 }}>
                <AnunciosCarousel />
              </Box>

              <Grid container spacing={2}>
                {[
                  { icon: <WifiTethering />, title: 'Tickets', link: '/login' },
                  { icon: <Support />, title: 'Consultas', link: '/login' },
                  { icon: <LiveTv />, title: 'CBPlay', link: '/login' },
                ].map((item, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card 
                      component={Link} 
                      to={item.link}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: '0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3,
                          backgroundColor: 'primary.main',
                          color: 'white',
                        },
                      }}
                    >
                      {React.cloneElement(item.icon, { sx: { fontSize: 40, mb: 1 } })}
                      <Typography variant="h6">{item.title}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                  Noticias y Actualizaciones
                </Typography>
                <FeedNoticias />
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ mb: 3, backgroundColor: 'secondary.main', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Productos Destacados
                  </Typography>
                  {[
                    { name: 'Plan Inicial', speed: '120 Megas', price: '$15' },
                    { name: 'Plan Familia', speed: '200 Megas', price: '$20' },
                    { name: 'Plan Premium', speed: '300 Megas', price: '$25' },
                  ].map((plan, index) => (
                    <Box key={index} sx={{ mb: 2, p: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                      <Typography variant="h6">{plan.name}</Typography>
                      <Typography variant="body2">{plan.speed}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {plan.price} +impuestos
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ backgroundColor: 'background.paper', mt: 4, py: 3 }}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  CBVision
                </Typography>
                <Typography variant="body2">
                  Conectando hogares y negocios con la mejor tecnología.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Enlaces Útiles
                </Typography>
                <Typography variant="body2" component="div">
                  <Link to="/login" style={{ display: 'block', marginBottom: '8px', color: 'inherit' }}>Soporte Técnico</Link>
                  <Link to="/login" style={{ display: 'block', marginBottom: '8px', color: 'inherit' }}>Preguntas Frecuentes</Link>
                  <Link to="/login" style={{ display: 'block', color: 'inherit' }}>Contacto</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Contacto
                </Typography>
                <Typography variant="body2">
                  Email: callcenter@cbvision.net.ec<br />
                  Teléfono: 096 100 3000<br />
                  Horario: Lun-Dom 24/7
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;