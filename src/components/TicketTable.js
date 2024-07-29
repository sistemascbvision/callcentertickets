import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, IconButton, TableSortLabel, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Button, Snackbar, Alert
} from '@mui/material';
import { Edit, Delete, Visibility, AccessTime } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import moment from 'moment-timezone';
import EditTicketForm from './EditTicketForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const TicketTable = ({ tickets, handleEditTicket, handleDeleteTicket, isAdmin, showColoredRows, onTicketUpdated }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc');
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState({});

  const handleDeleteClick = (ticketId) => {
    setTicketToDelete(ticketId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteTicket(ticketToDelete);
    setDeleteConfirmOpen(false);
    setSnackbarOpen(true);
  };

  const handleEditClick = (ticket) => {
    setTicketToEdit(ticket);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setTicketToEdit({});
  };

  const handleTicketUpdated = (updatedTicket) => {
    onTicketUpdated(updatedTicket);
    setEditModalOpen(false);
    setTicketToEdit({});
    setSnackbarOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'error';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'in_progress': return 'En proceso';
      case 'resolved': return 'Resuelto';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  };

  const getRowColor = (status) => {
    switch (status) {
      case 'open': return alpha('#f44336', 0.2);
      case 'in_progress': return alpha('#ff9800', 0.2);
      case 'resolved': return alpha('#4caf50', 0.2);
      case 'closed': return alpha('#9e9e9e', 0.2);
      default: return 'inherit';
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleViewDetails = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const sortedTickets = React.useMemo(() => {
    return [...tickets].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tickets, order, orderBy]);

  const formatDate = (dateString) => {
    return moment(dateString).tz('America/Guayaquil').format('DD [de] MMMM [de] YYYY');
  };

  const formatTime = (dateString) => {
    return moment(dateString).tz('America/Guayaquil').format('HH:mm');
  };

  return (
    <>
      <TableContainer component={Paper} style={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'desc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'requester_name'}
                  direction={orderBy === 'requester_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('requester_name')}
                >
                  Solicitante
                </TableSortLabel>
              </StyledTableCell>
              {/* agregacion jsj */}
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'requester_contact'}
                  direction={orderBy === 'requester_contact' ? order : 'asc'}
                  onClick={() => handleRequestSort('requester_contact')}
                >
                  Contacto
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleRequestSort('title')}
                >
                  Asunto
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Estado
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'zone_name'}
                  direction={orderBy === 'zone_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('zone_name')}
                >
                  Sucursal
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'assigned_to_username'}
                  direction={orderBy === 'assigned_to_username' ? order : 'asc'}
                  onClick={() => handleRequestSort('assigned_to_username')}
                >
                  Asignado a
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell style={{ width: '80px' }}>
                <TableSortLabel
                  active={orderBy === 'contract_id'}
                  direction={orderBy === 'contract_id' ? order : 'asc'}
                  onClick={() => handleRequestSort('contract_id')}
                >
                  Contrato
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'created_at'}
                  direction={orderBy === 'created_at' ? order : 'desc'}
                  onClick={() => handleRequestSort('created_at')}
                >
                  Creado el
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTickets.map((ticket) => (
              <TableRow 
                key={ticket.id}
                style={showColoredRows ? { backgroundColor: getRowColor(ticket.status) } : {}}
              >
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.requester_name}</TableCell>
                <TableCell>{ticket.requester_contact}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(ticket.status)}
                    color={getStatusColor(ticket.status)}
                  />
                </TableCell>
                <TableCell>{ticket.agency_name}</TableCell>
                <TableCell>{ticket.department_name || 'No asignado'}</TableCell>
                <TableCell style={{ width: '80px' }}>{ticket.contract_id || 'N/A'}</TableCell>
                <TableCell>
                  {formatDate(ticket.created_at)}
                  <Chip
                    icon={<AccessTime />}
                    label={formatTime(ticket.created_at)}
                    variant="outlined"
                    size="small"
                    style={{ marginLeft: '5px' }}
                  />
                </TableCell>
                <TableCell>
                  {/* <IconButton onClick={() => handleEditClick(ticket)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(ticket.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleViewDetails(ticket.id)}>
                    <Visibility />
                  </IconButton> */}

                  {isAdmin && (
                    <>
                      <IconButton onClick={() => handleEditClick(ticket)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(ticket.id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                  <IconButton onClick={() => handleViewDetails(ticket.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar este ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Acción realizada con éxito
        </Alert>
      </Snackbar>

      {editModalOpen && Object.keys(ticketToEdit).length > 0 && (
        <EditTicketForm
          open={editModalOpen}
          handleClose={handleEditClose}
          onTicketUpdated={handleTicketUpdated}
          ticket={ticketToEdit}
        />
      )}
    </>
  );
};

export default TicketTable;


