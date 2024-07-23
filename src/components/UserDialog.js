import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const UserDialog = ({ open, handleClose, handleSave, user }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.phone_number || '',
        is_active: user.is_active || true,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    handleSave(userData);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          name="username"
          label="Nombre de Usuario"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Correo Electrónico"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="first_name"
          label="Nombre"
          value={userData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="last_name"
          label="Apellido"
          value={userData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone_number"
          label="Número de Teléfono"
          value={userData.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Activo</InputLabel>
          <Select
            name="is_active"
            value={userData.is_active}
            onChange={handleChange}
          >
            <MenuItem value={true}>Sí</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;