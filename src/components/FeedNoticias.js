
import React from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const FeedNoticias = () => {
  const noticias = [
    {
      titulo: 'Nueva promoción de velocidad de internet',
      contenido: '¡Aprovecha nuestra última oferta de velocidad de internet!',
      fecha: '12 de junio de 2024',
      icono: <FiberManualRecordIcon sx={{ color: 'orange' }} />,
    },
    {
      titulo: 'Actualización del plan de servicio',
      contenido: 'Hemos actualizado nuestro plan de servicio para mejorar tu experiencia.',
      fecha: '11 de junio de 2024',
      icono: <FiberManualRecordIcon sx={{ color: 'orange' }} />,
    },
    {
        titulo: 'Nueva promoción de velocidad de internet',
        contenido: '¡Aprovecha nuestra última oferta de velocidad de internet!',
        fecha: '12 de junio de 2024',
        icono: <FiberManualRecordIcon sx={{ color: 'orange' }} />,
      },
      {
        titulo: 'Nueva promoción de velocidad de internet',
        contenido: '¡Aprovecha nuestra última oferta de velocidad de internet!',
        fecha: '12 de junio de 2024',
        icono: <FiberManualRecordIcon sx={{ color: 'orange' }} />,
      },
      {
        titulo: 'Nueva promoción de velocidad de internet',
        contenido: '¡Aprovecha nuestra última oferta de velocidad de internet!',
        fecha: '12 de junio de 2024',
        icono: <FiberManualRecordIcon sx={{ color: 'orange' }} />,
      },
   
  ];

  return (
    <Card sx={{ maxHeight: '610px', overflowY: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Útlimas Noticias
        </Typography>
        {noticias.map((noticia, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{noticia.titulo}</Typography>
            <Typography variant="body2">{noticia.contenido}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {noticia.fecha}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeedNoticias;
