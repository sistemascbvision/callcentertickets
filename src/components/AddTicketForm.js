

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Select, MenuItem, FormControl,
  InputLabel, Modal, Snackbar, Alert, Grid, Autocomplete, Checkbox, FormControlLabel, Collapse
} from '@mui/material';
import { getSucursales, buscarCliente } from '../services/ClientService';
import { addTicket, fetchDepartments } from '../services/TicketService';
import { getUserInfo } from '../services/UserService';
import TicketHistorial from './TicketHistorial';
import { useNotification } from '../NotificacionContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function AddTicketForm({ open, handleClose }) {
  const { socket } = useNotification();
  const [sucursales, setSucursales] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [sinClienteDefinido, setSinClienteDefinido] = useState(false);
  const [ticket, setTicket] = useState({
    agency_id: '',
    requester_name: '',
    requester_contact: '',
    title: '',
    description: '',
    status: 'open',
    client_id: '',
    contract_id: '',
    department_id: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [clienteInput, setClienteInput] = useState('');
  const [showHistorial, setShowHistorial] = useState(false);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const token = localStorage.getItem('token');
        const sucursalesData = await getSucursales(token);
        setSucursales(Array.isArray(sucursalesData) ? sucursalesData : []);
      } catch (error) {
        console.error('Error al cargar sucursales:', error);
        setError('Error al cargar las sucursales');
      }
    };

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

    fetchSucursales();
    fetchDepartmentsData();
  }, []);

  const resetForm = () => {
    setTicket({
      agency_id: '',
      requester_name: '',
      requester_contact: '',
      title: '',
      description: '',
      status: 'open',
      client_id: '',
      contract_id: '',
      department_id: '',
    });
    setNotification(null);
    setError(null);
    setSuccess(false);
    setShowHistorial(false);
  };

  useEffect(() => {
    if (selectedCliente && selectedCliente.contratos && selectedCliente.contratos.length === 1) {
      setTicket(prev => ({
        ...prev,
        contract_id: selectedCliente.contratos[0]
      }));
    }
  }, [selectedCliente]);

  const handleSucursalChange = async (event, value) => {
    setSelectedSucursal(value);
    if (value) {
      setTicket(prev => ({ ...prev, agency_id: value.id_sucursal }));
      setNotification(`Se ha conectado a la BD ${value.nombre_base}`);
      setIsFormDisabled(false);
      setClientes([]);
      setSelectedCliente(null);
    } else {
      setIsFormDisabled(true);
    }
  };

  const handleClienteInputChange = async (event, newInputValue) => {
    setClienteInput(newInputValue);
    if (newInputValue.length >= 3 && selectedSucursal) {
      try {
        const token = localStorage.getItem('token');
        const clientesData = await buscarCliente(token, selectedSucursal.id_sucursal, newInputValue);
        if (clientesData && clientesData.clientes) {
          const filteredClientes = clientesData.clientes.filter(cliente => {
            const fullName = `${cliente.Nombre1} ${cliente.Nombre2 || ''} ${cliente.Apellido1} ${cliente.Apellido2 || ''}`.toLowerCase();
            const searchTerms = newInputValue.toLowerCase().split(' ');
            return searchTerms.every(term => fullName.includes(term));
          });
          setClientes(filteredClientes);
        } else {
          setClientes([]);
        }
      } catch (error) {
        console.error('Error al buscar clientes:', error);
        setError('Error al buscar clientes');
        setClientes([]);
      }
    }
  };

  const handleClienteChange = (event, value) => {
    setSelectedCliente(value);
    if (value) {
      setTicket(prev => ({
        ...prev,
        client_id: value.Cod_Cliente,
        requester_name: `${value.Nombre1} ${value.Nombre2 || ''} ${value.Apellido1} ${value.Apellido2 || ''}`.trim(),
        requester_contact: value.Celular || value.Telefono,
        contract_id: value.contratos.length === 1 ? value.contratos[0] : ''
      }));
      setNotification(`Cliente seleccionado: ${value.Nombre1} ${value.Apellido1}`);
    }
  };

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSinClienteDefinidoChange = (event) => {
    setSinClienteDefinido(event.target.checked);
    if (event.target.checked) {
      setSelectedCliente(null);
      setTicket(prev => ({
        ...prev,
        client_id: '',
        requester_name: '',
        requester_contact: '',
        contract_id: ''
      }));
    } else {
      setTicket(prev => ({
        ...prev,
        requester_name: selectedCliente ? `${selectedCliente.Nombre1} ${selectedCliente.Nombre2 || ''} ${selectedCliente.Apellido1} ${selectedCliente.Apellido2 || ''}`.trim() : '',
        requester_contact: selectedCliente ? selectedCliente.Celular || selectedCliente.Telefono : '',
        contract_id: selectedCliente && selectedCliente.contratos.length === 1 ? selectedCliente.contratos[0] : ''
      }));
    }
  };

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const userInfo = await getUserInfo(token); // Asegúrate de pasar el token aquí
    const ticketData = {
      agencyId: parseInt(selectedSucursal.id_sucursal),
      clientId: ticket.client_id ? parseInt(ticket.client_id) : null,
      contractId: ticket.contract_id || null,
      requesterName: ticket.requester_name,
      requesterContact: ticket.requester_contact,
      title: ticket.title,
      description: ticket.description,
      status: 'open',
      priority: 'high',
      createdBy: parseInt(userInfo.id),
      departmentId: ticket.department_id ? parseInt(ticket.department_id) : null
    };
    // console.log('Datos del ticket a enviar:', ticketData);
    const response = await addTicket(ticketData, token);
    // console.log('Respuesta del servidor:', response);

    // Verificar que response.id tenga un valor válido
    if (response.id) {
      // console.log('ID del ticket creado:', response.id);
      if (socket) {
        console.log('Emitiendo evento create_ticket:', {
          ticketId: response.id,
          createdBy: userInfo.username,
          title: ticket.title,
          agencyName: selectedSucursal.nombre // Asegurarse de usar el nombre correcto
        });
        socket.emit('create_ticket', {
          ticketId: response.id,
          createdBy: userInfo.username,
          title: ticket.title,
          agencyName: selectedSucursal.nombre // Asegurarse de usar el nombre correcto
        });
        // console.log('Evento create_ticket emitido');
      }
    } else {
      // console.error('El ID del ticket no está presente en la respuesta del servidor');
    }

    setSuccess(true);
    setTimeout(() => {
      handleClose();
      resetForm();
    }, 2000);
  } catch (error) {
    console.error('Error al crear ticket:', error);
    setError(error.message || 'Error al crear el ticket');
  }
};



  const toggleHistorial = () => {
    setShowHistorial(!showHistorial);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setError(null);
    setSuccess(false);
  };



  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Agregar Nuevo Ticket</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={sucursales}
                getOptionLabel={(option) => option.nombre || ''}
                renderInput={(params) => <TextField {...params} label="Sucursal" />}
                onChange={handleSucursalChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sinClienteDefinido}
                    onChange={handleSinClienteDefinidoChange}
                    name="sinClienteDefinido"
                  />
                }
                label="No tengo cliente definido"
              />
            </Grid>
            {!sinClienteDefinido && (
              <Grid item xs={12}>
                <Autocomplete
                  options={clientes}
                  getOptionLabel={(option) => 
                    `${option.Nombre1} ${option.Nombre2 || ''} ${option.Apellido1} ${option.Apellido2 || ''}`.trim()
                  }
                  isOptionEqualToValue={(option, value) => option.Cod_Cliente === value.Cod_Cliente}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cliente"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                  onInputChange={handleClienteInputChange}
                  onChange={handleClienteChange}
                  disabled={isFormDisabled}
                  fullWidth
                  renderOption={(props, option) => (
                    <li {...props}>
                      {`${option.Nombre1} ${option.Nombre2 || ''} ${option.Apellido1} ${option.Apellido2 || ''}`.trim()}
                    </li>
                  )}
                  filterOptions={(x) => x}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <TextField
                label="Nombre del solicitante"
                name="requester_name"
                value={ticket.requester_name}
                onChange={handleChange}
                fullWidth
                disabled={isFormDisabled || (!sinClienteDefinido && selectedCliente)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contacto del solicitante"
                name="requester_contact"
                value={ticket.requester_contact}
                onChange={handleChange}
                fullWidth
                disabled={isFormDisabled || (!sinClienteDefinido && selectedCliente)}
              />
            </Grid>
            {!sinClienteDefinido && (
              <Grid item xs={12}>
                {selectedCliente && selectedCliente.contratos && selectedCliente.contratos.length > 1 ? (
                  <FormControl fullWidth disabled={isFormDisabled}>
                    <InputLabel>ID de Contrato</InputLabel>
                    <Select
                      name="contract_id"
                      value={ticket.contract_id}
                      onChange={handleChange}
                    >
                      {selectedCliente.contratos.map((contrato) => (
                        <MenuItem key={contrato} value={contrato}>{contrato}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label="ID de Contrato"
                    name="contract_id"
                    value={ticket.contract_id}
                    onChange={handleChange}
                    fullWidth
                    disabled={isFormDisabled || (selectedCliente && selectedCliente.contratos && selectedCliente.contratos.length === 1)}
                  />
                )}
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Título"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                fullWidth
                disabled={isFormDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={ticket.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                disabled={isFormDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={isFormDisabled}>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="department_id"
                  value={ticket.department_id}
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
            </Grid>
            {!sinClienteDefinido && selectedCliente && (
              <Grid item xs={12}>
                <Button onClick={toggleHistorial} fullWidth variant="outlined">
                  {showHistorial ? "Ocultar Historial" : "Mostrar Historial"}
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Collapse in={showHistorial}>
                {selectedCliente && <TicketHistorial clientId={selectedCliente.Cod_Cliente} />}
              </Collapse>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit} 
                fullWidth
                disabled={isFormDisabled}
              >
                Agregar Ticket
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleClose} 
                fullWidth
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Ticket creado exitosamente
        </Alert>
      </Snackbar>
      <Snackbar open={notification !== null} autoHideDuration={6000} onClose={() => setNotification(null)}>
        <Alert onClose={() => setNotification(null)} severity="info" sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddTicketForm;