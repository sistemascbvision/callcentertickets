// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Button,
// //   Typography,
// //   Modal,
// //   TextField,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Grid,
// //   IconButton,
// //   Snackbar,
// //   Paper,
// // } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// // import AddIcon from '@mui/icons-material/Add';
// // import CloseIcon from '@mui/icons-material/Close';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import ShareIcon from '@mui/icons-material/Share';
// // import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// // import StarIcon from '@mui/icons-material/Star';
// // import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// // import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// // import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// // import WorkIcon from '@mui/icons-material/Work';
// // import { DataGrid, GridToolbar } from '@mui/x-data-grid';


// // const StyledCard = styled(Card)(({ theme, gradient }) => ({
// //   transition: 'transform 0.3s, box-shadow 0.3s',
// //   '&:hover': {
// //     transform: 'translateY(-5px)',
// //     boxShadow: theme.shadows[8],
// //   },
// //   background: gradient,
// // }));

// // const GlassCard = styled(Card)(({ theme }) => ({
// //   background: 'rgba(255, 255, 255, 0.2)',
// //   backdropFilter: 'blur(10px)',
// //   border: '1px solid rgba(255, 255, 255, 0.3)',
// //   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
// // }));

// // const NeumorphicCard = styled(Card)(({ theme }) => ({
// //   background: theme.palette.background.paper,
// //   boxShadow: theme.palette.mode === 'dark' 
// //     ? '5px 5px 10px #1a1a1a, -5px -5px 10px #242424'
// //     : '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
// //   borderRadius: '15px',
// // }));

// // const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
// //   border: 'none',
// //   '& .MuiDataGrid-cell:hover': {
// //     color: theme.palette.primary.main,
// //   },
// //   '& .MuiDataGrid-columnHeaders': {
// //     backgroundColor: theme.palette.primary.main,
// //     color: theme.palette.primary.contrastText,
// //     fontSize: 16,
// //   },
// //   '& .MuiDataGrid-virtualScroller': {
// //     backgroundColor: theme.palette.background.default,
// //   },
// //   '& .MuiDataGrid-footerContainer': {
// //     backgroundColor: theme.palette.background.paper,
// //     color: theme.palette.text.secondary,
// //     borderTop: '1px solid',
// //     borderColor: theme.palette.divider,
// //   },
// //   '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
// //     color: theme.palette.text.secondary,
// //   },
// // }));

// // // Datos de ejemplo para la tabla
// // const rows = [
// //   { id: 1, firstName: 'John', lastName: 'Doe', age: 35, city: 'New York' },
// //   { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28, city: 'Los Angeles' },
// //   { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 42, city: 'Chicago' },
// //   { id: 4, firstName: 'Alice', lastName: 'Brown', age: 31, city: 'Houston' },
// //   { id: 5, firstName: 'Charlie', lastName: 'Davis', age: 39, city: 'Phoenix' },
// // ];

// // const columns = [
// //   { field: 'id', headerName: 'ID', width: 70 },
// //   { field: 'firstName', headerName: 'First Name', width: 130 },
// //   { field: 'lastName', headerName: 'Last Name', width: 130 },
// //   { field: 'age', headerName: 'Age', type: 'number', width: 90 },
// //   { field: 'city', headerName: 'City', width: 150 },
// // ];


// // function CBPlay() {
// //   const [openModal, setOpenModal] = useState(false);
// //   const [openSnackbar, setOpenSnackbar] = useState(false);

// //   const handleOpenModal = () => setOpenModal(true);
// //   const handleCloseModal = () => setOpenModal(false);

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     setOpenSnackbar(true);
// //     handleCloseModal();
// //   };

// //   return (
// //     <Box sx={{ p: 4 }}>
// //       <Typography variant="h1" gutterBottom>
// //         CBPlay
// //       </Typography>

// //       <Grid container spacing={3} sx={{ mb: 4 }}>
// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard>
// //             <CardContent>
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Basic Card
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 A simple card with hover effect.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard gradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)">
// //             <CardContent>
// //               <Typography variant="h5" component="div" gutterBottom color="white">
// //                 Gradient Card
// //               </Typography>
// //               <Typography variant="body2" color="white">
// //                 A card with a beautiful gradient background.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <GlassCard>
// //             <CardContent>
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Glass Card
// //               </Typography>
// //               <Typography variant="body2">
// //                 A card with a glass morphism effect.
// //               </Typography>
// //             </CardContent>
// //           </GlassCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <NeumorphicCard>
// //             <CardContent>
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Neumorphic Card
// //               </Typography>
// //               <Typography variant="body2">
// //                 A card with a neumorphic design.
// //               </Typography>
// //             </CardContent>
// //           </NeumorphicCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard>
// //             <CardContent>
// //               <FavoriteIcon color="error" fontSize="large" />
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Icon Card
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 A card featuring a prominent icon.
// //               </Typography>
// //             </CardContent>
// //             <CardActions>
// //               <Button size="small">Learn More</Button>
// //             </CardActions>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
// //             <CardContent>
// //               <ShareIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom color="white">
// //                 Share Card
// //               </Typography>
// //               <Typography variant="body2" color="white">
// //                 A card for sharing content.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard>
// //             <CardContent>
// //               <ThumbUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Like Card
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 A card for liking content.
// //               </Typography>
// //             </CardContent>
// //             <CardActions>
// //               <Button size="small" startIcon={<ThumbUpIcon />}>
// //                 Like
// //               </Button>
// //             </CardActions>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard gradient="linear-gradient(to right, #fc5c7d, #6a82fb)">
// //             <CardContent>
// //               <StarIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom color="white">
// //                 Star Card
// //               </Typography>
// //               <Typography variant="body2" color="white">
// //                 A card for starring favorite items.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard>
// //             <CardContent>
// //               <LocalOfferIcon color="secondary" sx={{ fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Offer Card
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 A card for displaying special offers.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard gradient="linear-gradient(to right, #00b09b, #96c93d)">
// //             <CardContent>
// //               <TrendingUpIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom color="white">
// //                 Trending Card
// //               </Typography>
// //               <Typography variant="body2" color="white">
// //                 A card for showing trending items.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard>
// //             <CardContent>
// //               <EmojiEventsIcon color="warning" sx={{ fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom>
// //                 Achievement Card
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 A card for displaying achievements.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={4}>
// //           <StyledCard gradient="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)">
// //             <CardContent>
// //               <WorkIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
// //               <Typography variant="h5" component="div" gutterBottom color="white">
// //                 Job Card
// //               </Typography>
// //               <Typography variant="body2" color="white">
// //                 A card for job listings or work-related content.
// //               </Typography>
// //             </CardContent>
// //           </StyledCard>
// //         </Grid>
// //       </Grid>
// //       <Button
// //         variant="contained"
// //         startIcon={<AddIcon />}
// //         onClick={handleOpenModal}
// //         sx={{ mb: 4 }}
// //       >
// //         Open Modal
// //       </Button>

// //       <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
// //         <Typography variant="h2" gutterBottom>
// //           Data Table
// //         </Typography>
// //         <StyledDataGrid
// //           rows={rows}
// //           columns={columns}
// //           initialState={{
// //             pagination: {
// //               paginationModel: { page: 0, pageSize: 5 },
// //             },
// //           }}
// //           pageSizeOptions={[5, 10]}
// //           checkboxSelection
// //           disableRowSelectionOnClick
// //           components={{
// //             Toolbar: GridToolbar,
// //           }}
// //           sx={{ height: 400 }}
// //         />
// //       </Paper>

// //       <Modal
// //         open={openModal}
// //         onClose={handleCloseModal}
// //         aria-labelledby="modal-title"
// //         aria-describedby="modal-description"
// //       >
// //         <Box
// //           sx={{
// //             position: 'absolute',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //             width: 400,
// //             bgcolor: 'background.paper',
// //             borderRadius: 2,
// //             boxShadow: 24,
// //             p: 4,
// //           }}
// //         >
// //           <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
// //             Add New Item
// //           </Typography>
// //           <form onSubmit={handleSubmit}>
// //             <TextField
// //               fullWidth
// //               label="Name"
// //               variant="outlined"
// //               margin="normal"
// //               required
// //             />
// //             <TextField
// //               fullWidth
// //               label="Description"
// //               variant="outlined"
// //               margin="normal"
// //               multiline
// //               rows={4}
// //               required
// //             />
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               color="primary"
// //               sx={{ mt: 2 }}
// //             >
// //               Submit
// //             </Button>
// //           </form>
// //         </Box>
// //       </Modal>

// //     </Box>
// //   );
// // }

// // export default CBPlay;

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Button,
//   AppBar,
//   Toolbar,
//   InputBase,
//   Tabs,
//   Tab,
//   Chip,
//   Alert,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import AddIcon from '@mui/icons-material/Add';
// import DevicesIcon from '@mui/icons-material/Devices';
// import HdIcon from '@mui/icons-material/Hd';
// import GroupIcon from '@mui/icons-material/Group';
// import CheckIcon from '@mui/icons-material/Check';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const HeroContent = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   height: '70vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   color: 'white',
//   padding: theme.spacing(4),
//   backgroundImage: 'url(https://picsum.photos/seed/hero/1600/900)',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
// }));

// const ContentWrapper = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   zIndex: 1,
// }));

// const ContentRow = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
// }));

// const GradientCard = styled(Card)(({ theme, gradient }) => ({
//   background: gradient,
//   color: 'white',
//   transition: 'transform 0.3s',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// }));

// const PlanCard = styled(Card)(({ theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   transition: 'transform 0.3s',
//   '&:hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: theme.shadows[10],
//   },
// }));

// function CBPlay() {
//   const [tabValue, setTabValue] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const gradients = [
//     'linear-gradient(to right, #ff416c, #ff4b2b)',
//     'linear-gradient(to right, #4facfe, #00f2fe)',
//     'linear-gradient(to right, #43e97b, #38f9d7)',
//     'linear-gradient(to right, #fa709a, #fee140)',
//   ];

//   const plans = [
//     { name: 'Básico', price: '$8.99', features: ['1 pantalla', 'Calidad estándar', 'Sin anuncios'] },
//     { name: 'Estándar', price: '$13.99', features: ['2 pantallas', 'HD disponible', 'Sin anuncios'] },
//     { name: 'Premium', price: '$17.99', features: ['4 pantallas', '4K+HDR disponible', 'Sin anuncios'] },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" color="transparent">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             CBPlay
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Buscar…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//         </Toolbar>
//       </AppBar>

//       <Alert severity="info" sx={{ mb: 2 }}>
//         Esta información es solo para fines demostrativos. El contenido mostrado no representa un servicio real.
//       </Alert>

//       <HeroContent>
//         <ContentWrapper>
//           <Typography variant="h2" component="h1" gutterBottom>
//             CBPlay Originals
//           </Typography>
//           <Typography variant="h5" gutterBottom>
//             Contenido exclusivo
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{ mr: 1 }}>
//               Reproducir
//             </Button>
//             <Button variant="outlined" startIcon={<InfoOutlinedIcon />}>
//               Más información
//             </Button>
//           </Box>
//         </ContentWrapper>
//       </HeroContent>

//       <Box sx={{ p: 4 }}>
//         <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }}>
//           <Tab label="Inicio" />
//           <Tab label="Series" />
//           <Tab label="Películas" />
//           <Tab label="Canales" />
//         </Tabs>

//         <ContentRow>
//           <Typography variant="h4" gutterBottom>
//             Tendencias
//           </Typography>
//           <Grid container spacing={2}>
//             {[1, 2, 3, 4].map((item, index) => (
//               <Grid item xs={12} sm={6} md={3} key={item}>
//                 <GradientCard gradient={gradients[index]}>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={`https://picsum.photos/seed/${item}/300/200`}
//                     alt={`Tendencia ${item}`}
//                   />
//                   <CardContent>
//                     <Typography variant="h6" component="div">
//                       Tendencia {item}
//                     </Typography>
//                     <Typography variant="body2">
//                       Descripción breve de la tendencia {item}
//                     </Typography>
//                   </CardContent>
//                 </GradientCard>
//               </Grid>
//             ))}
//           </Grid>
//         </ContentRow>

//         <ContentRow>
//           <Typography variant="h4" gutterBottom>
//             Series populares
//           </Typography>
//           <Grid container spacing={2}>
//             {[5, 6, 7, 8, 9, 10].map((item) => (
//               <Grid item xs={6} sm={4} md={2} key={item}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={`https://picsum.photos/seed/${item}/300/200`}
//                     alt={`Serie ${item}`}
//                   />
//                   <CardContent>
//                     <Typography variant="body2">Serie {item}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </ContentRow>

//         <ContentRow>
//           <Typography variant="h4" gutterBottom>
//             Canales en vivo
//           </Typography>
//           <Grid container spacing={2}>
//             {[11, 12, 13, 14].map((item) => (
//               <Grid item xs={6} sm={3} key={item}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={`https://picsum.photos/seed/${item}/300/200`}
//                     alt={`Canal ${item}`}
//                   />
//                   <CardContent>
//                     <Typography variant="body2">Canal {item}</Typography>
//                     <Chip label="EN VIVO" color="error" size="small" sx={{ mt: 1 }} />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </ContentRow>

//         <ContentRow>
//           <Typography variant="h4" gutterBottom>
//             Próximamente
//           </Typography>
//           <Grid container spacing={2}>
//             {[15, 16, 17, 18].map((item) => (
//               <Grid item xs={6} sm={3} key={item}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={`https://picsum.photos/seed/${item}/300/200`}
//                     alt={`Próximamente ${item}`}
//                   />
//                   <CardContent>
//                     <Typography variant="body2">Próximamente {item}</Typography>
//                     <Button
//                       startIcon={<AddIcon />}
//                       size="small"
//                       sx={{ mt: 1 }}
//                     >
//                       Recordatorio
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </ContentRow>

//         <ContentRow>
//           <Typography variant="h4" gutterBottom>
//             Planes de suscripción
//           </Typography>
//           <Grid container spacing={2}>
//             {plans.map((plan, index) => (
//               <Grid item xs={12} sm={4} key={index}>
//                 <PlanCard>
//                   <CardContent>
//                     <Typography variant="h5" component="div" gutterBottom>
//                       {plan.name}
//                     </Typography>
//                     <Typography variant="h4" color="primary" gutterBottom>
//                       {plan.price}/mes
//                     </Typography>
//                     <List>
//                       {plan.features.map((feature, i) => (
//                         <ListItem key={i} disablePadding>
//                           <ListItemIcon>
//                             <CheckIcon color="primary" />
//                           </ListItemIcon>
//                           <ListItemText primary={feature} />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                     <Button variant="contained" color="primary">
//                       Elegir plan
//                     </Button>
//                   </CardActions>
//                 </PlanCard>
//               </Grid>
//             ))}
//           </Grid>
//         </ContentRow>
//       </Box>
//     </Box>
//   );
// }

// export default CBPlay;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Tabs,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'white',
  padding: theme.spacing(4),
  backgroundImage: 'url(https://via.assets.so/game.jpg?w=1280&h=724)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const ContentRow = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const GradientCard = styled(Card)(({ theme, gradient }) => ({
  background: gradient,
  color: 'white',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PlanCard = styled(Card)(({ theme, featured }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s, box-shadow 0.3s',
  position: 'relative',
  overflow: 'visible',
  ...(featured && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&::before': {
      content: '"DESTACADO"',
      position: 'absolute',
      top: -20,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      padding: theme.spacing(0.5, 2),
      borderRadius: theme.shape.borderRadius,
      fontWeight: 'bold',
    },
  }),
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

function CBPlay() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const gradients = [
    'linear-gradient(to right, #ff416c, #ff4b2b)',
    'linear-gradient(to right, #4facfe, #00f2fe)',
    'linear-gradient(to right, #43e97b, #38f9d7)',
    'linear-gradient(to right, #fa709a, #fee140)',
  ];

  const plans = [
    { name: 'Básico', price: '$8.99', features: ['1 pantalla', 'Calidad estándar', 'Sin anuncios', 'Catálogo limitado'] },
    { name: 'Estándar', price: '$13.99', features: ['2 pantallas', 'HD disponible', 'Sin anuncios', 'Catálogo completo', 'Descarga de contenido'], featured: true },
    { name: 'Premium', price: '$17.99', features: ['4 pantallas', '4K+HDR disponible', 'Sin anuncios', 'Catálogo completo', 'Descarga de contenido', 'Acceso anticipado'] },
  ];

  const tabContent = [
    {
      title: 'Series populares',
      items: [
        { title: 'Stranger Things', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'The Crown', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=99' },
        { title: 'Bridgerton', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=98' },
        { title: 'The Witcher', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=80' },
        { title: 'Money Heist', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=90' },
        { title: 'The Mandalorian', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=95' },
      ],
    },
    {
      title: 'Películas destacadas',
      items: [
        { title: 'The Irishman', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=75' },
        { title: 'Bird Box', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=80' },
        { title: 'Extraction', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=60' },
        { title: 'The Old Guard', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=40' },
        { title: 'Roma', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=78' },
        { title: 'Marriage Story', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=55' },
      ],
    },
    {
      title: 'Documentales',
      items: [
        { title: 'Our Planet', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=64' },
        { title: 'The Social Dilemma', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=60' },
        { title: 'Tiger King', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=50' },
        { title: 'The Last Dance', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=86' },
        { title: 'My Octopus Teacher', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=91' },
        { title: 'Icarus', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
      ],
    },
    {
      title: 'Anime',
      items: [
        { title: 'Attack on Titan', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'Death Note', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'One Punch Man', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'My Hero Academia', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'Fullmetal Alchemist', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
        { title: 'Demon Slayer', image: 'https://via.assets.so/game.jpg?w=300&h=200&q=100' },
      ],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeroContent>
        <ContentWrapper>
          <Typography variant="h2" component="h1" gutterBottom>
            CBPlay Originals
          </Typography>
          <Typography variant="h5" gutterBottom>
            Contenido exclusivo y de alta calidad
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{ mr: 1 }}>
              Reproducir
            </Button>
            <Button variant="outlined" startIcon={<InfoOutlinedIcon />}>
              Más información
            </Button>
          </Box>
        </ContentWrapper>
      </HeroContent>

      <Box sx={{ p: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }} centered>
          <Tab label="Series" />
          <Tab label="Películas" />
          <Tab label="Documentales" />
          <Tab label="Anime" />
        </Tabs>

        <ContentRow>
          <Typography variant="h4" gutterBottom>
            {tabContent[tabValue].title}
          </Typography>
          <Grid container spacing={2}>
            {tabContent[tabValue].items.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <GradientCard gradient={gradients[index % gradients.length]}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="body2">{item.title}</Typography>
                  </CardContent>
                </GradientCard>
              </Grid>
            ))}
          </Grid>
        </ContentRow>

        <ContentRow>
          <Typography variant="h4" gutterBottom>
            Planes de suscripción
          </Typography>
          <Grid container spacing={2}>
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PlanCard featured={plan.featured}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Typography variant="h4" color={plan.featured ? 'inherit' : 'primary'} gutterBottom>
                      {plan.price}/mes
                    </Typography>
                    <List>
                      {plan.features.map((feature, i) => (
                        <ListItem key={i} disablePadding>
                          <ListItemIcon>
                            <CheckIcon color={plan.featured ? 'inherit' : 'primary'} />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button 
                      variant="contained" 
                      color={plan.featured ? 'secondary' : 'primary'}
                      startIcon={plan.featured ? <StarIcon /> : null}
                    >
                      Elegir plan
                    </Button>
                  </CardActions>
                </PlanCard>
              </Grid>
            ))}
          </Grid>
        </ContentRow>

        <ContentRow>
          <Typography variant="h4" gutterBottom>
            Próximamente
          </Typography>
          <Grid container spacing={2}>
            {[25, 26, 27, 28].map((item) => (
              <Grid item xs={6} sm={3} key={item}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://via.assets.so/game.jpg?w=300&h=200&q=${item}`}
                    alt={`Próximamente ${item}`}
                  />
                  <CardContent>
                    <Typography variant="body2">Próximamente {item}</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Recordatorio
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ContentRow>
      </Box>
    </Box>
  );
}

export default CBPlay;