import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Select, MenuItem, FormControl,
  InputLabel, Modal, Snackbar, Alert
} from '@mui/material';
import { updateTicket, fetchDepartments } from '../services/TicketService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function EditTicketForm({ open, handleClose, ticket }) {
  const [departments, setDepartments] = useState([]);
  const [editedTicket, setEditedTicket] = useState({
    department_id: ticket.department_id || '',
    description: ticket.description || '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const token = localStorage.getItem('token');
        const departmentsData = await fetchDepartments(token);
        setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
      } catch (error) {
        console.error('Error al cargar departamentos:', error);
        setError('Error al cargar los departamentos');
      }
    };

    fetchDepartmentsData();
  }, []);

  const handleChange = (e) => {
    setEditedTicket({ ...editedTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateTicket(ticket.id, editedTicket, token);
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar ticket:', error);
      setError(error.message || 'Error al actualizar el ticket');
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Editar Ticket</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Departamento</InputLabel>
            <Select
              name="department_id"
              value={editedTicket.department_id}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Sin asignar</em>
              </MenuItem>
              {departments.map(department => (
                <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Observación"
            name="description"
            value={editedTicket.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            fullWidth
            sx={{ mb: 1 }}
          >
            Actualizar Ticket
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleClose} 
            fullWidth
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Ticket actualizado exitosamente
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditTicketForm;