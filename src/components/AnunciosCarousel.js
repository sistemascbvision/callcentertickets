
import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Button, Slide } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const AnunciosCarousel = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const banners = [
    {
      imageUrl: 'https://cbvision.net.ec/images/NUEVOSPLANES/Sin_ttulo-1_Mesa_de_trabajo_1_1.png',
      title: 'Promoción 1',
      description: 'Descripción de la promoción 1',
    },
    {
      imageUrl: 'https://cbvision.net.ec/images/NUEVOSPLANES/Sin_ttulo-1_Mesa_de_trabajo_1_copia.png',
      title: 'Promoción 2',
      description: 'Descripción de la promoción 2',
    },
    {
      imageUrl: 'https://cbvision.net.ec/images/NUEVOSPLANES/Sin_ttulo-1_Mesa_de_trabajo_1_copia_2.png',
      title: 'Promoción 3',
      description: 'Descripción de la promoción 3',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000); // Cambiar cada 8 segundos

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNext = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Slide direction="right" in={true} timeout={1800}>
          <CardMedia
            component="img"
            height="380"
            image={banners[currentBannerIndex].imageUrl}
            alt={banners[currentBannerIndex].title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.8s ease-in-out',
              width: '100%',
            }}
          />
        </Slide>
        <Box sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <IconButton onClick={handlePrev} sx={{ color: 'white', opacity: 0.7 }}>
            <NavigateBefore />
          </IconButton>
        </Box>
        <Box sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <IconButton onClick={handleNext} sx={{ color: 'white', opacity: 0.7 }}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default AnunciosCarousel;
