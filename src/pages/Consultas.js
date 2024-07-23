// src/pages/LandingPage.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RadioIcon from '@mui/icons-material/Radio';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: theme.palette.common.white,
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

function Consultas() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const productos = [
    { nombre: 'Internet', icono: <WifiIcon fontSize="inherit" />, descripcion: 'Servicios de internet de alta velocidad para todas tus necesidades.' },
    { nombre: 'Televisión', icono: <TvIcon fontSize="inherit" />, descripcion: 'Una amplia gama de canales con calidad cristalina.' },
    { nombre: 'CBPlay', icono: <PlayCircleOutlineIcon fontSize="inherit" />, descripcion: 'Nuestro nuevo servicio de streaming con contenido exclusivo.' },
    { nombre: 'CBRadio', icono: <RadioIcon fontSize="inherit" />, descripcion: 'Escucha tu música y programas favoritos donde quiera que vayas.' },
  ];

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant={isMobile ? 'h3' : 'h2'} gutterBottom>
            Bienvenido a la Intranet de CBVision
          </Typography>
          <Typography variant="h5">
            Tu portal para todos los recursos e información de empleados
          </Typography>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Nuestros Productos y Servicios
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {productos.map((producto) => (
            <Grid item xs={12} sm={6} md={3} key={producto.nombre}>
              <StyledCard>
                <CardContent>
                  <ProductIcon>{producto.icono}</ProductIcon>
                  <Typography variant="h5" component="div" gutterBottom>
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.descripcion}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Recursos para Empleados
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" fullWidth size="large">
                Tickets
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" fullWidth size="large">
                Información
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" fullWidth size="large">
                Consultas
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Últimas Noticias
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Título de la Noticia {item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                  <Button sx={{ mt: 2 }}>Leer Más</Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Consultas;