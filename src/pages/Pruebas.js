




import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Configuraciones from './Configuraciones';

const StyledCard = styled(Card)(({ theme, gradient }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  background: gradient || theme.palette.background.paper,
}));

const StatCard = ({ icon, title, value, gradient }) => (
  <StyledCard gradient={gradient}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6" component="div" ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </StyledCard>
);

// Datos de ejemplo
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
];

const branches = [
  { id: 1, name: 'North Zone', location: 'New York', manager: 'Alice Brown' },
  { id: 2, name: 'South Zone', location: 'Miami', manager: 'Charlie Davis' },
  { id: 3, name: 'West Zone', location: 'Los Angeles', manager: 'Eve Wilson' },
];

function Pruebas() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
       Panel de configuración
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<PersonIcon fontSize="large" color="primary" />}
            title="Total Users"
            value={users.length}
            gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<BusinessIcon fontSize="large" color="secondary" />}
            title="Total Branches"
            value={branches.length}
            gradient="linear-gradient(45deg, #FF9800 30%, #FFC107 90%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<ConfirmationNumberIcon fontSize="large" color="error" />}
            title="Total Tickets"
            value="150"
            gradient="linear-gradient(45deg, #F44336 30%, #FF5722 90%)"
          />
        </Grid>
      </Grid>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton size="small"><EditIcon /></IconButton>
                      <IconButton size="small"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Branch Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBranches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.location}</TableCell>
                    <TableCell>{branch.manager}</TableCell>
                    <TableCell>
                      <IconButton size="small"><EditIcon /></IconButton>
                      <IconButton size="small"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Pruebas;