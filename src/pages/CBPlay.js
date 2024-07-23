import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Snackbar,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const StyledCard = styled(Card)(({ theme, gradient }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  background: gradient,
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const NeumorphicCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.palette.mode === 'dark' 
    ? '5px 5px 10px #1a1a1a, -5px -5px 10px #242424'
    : '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
  borderRadius: '15px',
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell:hover': {
    color: theme.palette.primary.main,
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
  },
  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    color: theme.palette.text.secondary,
  },
}));

// Datos de ejemplo para la tabla
const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 35, city: 'New York' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28, city: 'Los Angeles' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 42, city: 'Chicago' },
  { id: 4, firstName: 'Alice', lastName: 'Brown', age: 31, city: 'Houston' },
  { id: 5, firstName: 'Charlie', lastName: 'Davis', age: 39, city: 'Phoenix' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'city', headerName: 'City', width: 150 },
];


function CBPlay() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenSnackbar(true);
    handleCloseModal();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" gutterBottom>
        CBPlay
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Basic Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A simple card with hover effect.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard gradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom color="white">
                Gradient Card
              </Typography>
              <Typography variant="body2" color="white">
                A card with a beautiful gradient background.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <GlassCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Glass Card
              </Typography>
              <Typography variant="body2">
                A card with a glass morphism effect.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <NeumorphicCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Neumorphic Card
              </Typography>
              <Typography variant="body2">
                A card with a neumorphic design.
              </Typography>
            </CardContent>
          </NeumorphicCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <FavoriteIcon color="error" fontSize="large" />
              <Typography variant="h5" component="div" gutterBottom>
                Icon Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A card featuring a prominent icon.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <CardContent>
              <ShareIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom color="white">
                Share Card
              </Typography>
              <Typography variant="body2" color="white">
                A card for sharing content.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <ThumbUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom>
                Like Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A card for liking content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<ThumbUpIcon />}>
                Like
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard gradient="linear-gradient(to right, #fc5c7d, #6a82fb)">
            <CardContent>
              <StarIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom color="white">
                Star Card
              </Typography>
              <Typography variant="body2" color="white">
                A card for starring favorite items.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <LocalOfferIcon color="secondary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom>
                Offer Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A card for displaying special offers.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard gradient="linear-gradient(to right, #00b09b, #96c93d)">
            <CardContent>
              <TrendingUpIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom color="white">
                Trending Card
              </Typography>
              <Typography variant="body2" color="white">
                A card for showing trending items.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <EmojiEventsIcon color="warning" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom>
                Achievement Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A card for displaying achievements.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard gradient="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)">
            <CardContent>
              <WorkIcon sx={{ color: 'white', fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="div" gutterBottom color="white">
                Job Card
              </Typography>
              <Typography variant="body2" color="white">
                A card for job listings or work-related content.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
        sx={{ mb: 4 }}
      >
        Open Modal
      </Button>

      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <Typography variant="h2" gutterBottom>
          Data Table
        </Typography>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          sx={{ height: 400 }}
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Add New Item
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

    </Box>
  );
}

export default CBPlay;