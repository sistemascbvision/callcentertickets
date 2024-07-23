

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { PlayArrow, Check, Lock, AccessTime } from '@mui/icons-material';
import moment from 'moment-timezone';
import { isQualityControl, getUserRoleName } from '../services/UserService';
import { updateTicket } from '../services/TicketService';
import { useNotification } from '../NotificacionContext';

const TicketActions = ({ ticket, onAction, onUpdate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const userRole = getUserRoleName();
  const [token] = useState(localStorage.getItem('token'));
  const { socket } = useNotification();


  useEffect(() => {
    if (socket) {
      socket.emit('join_ticket_room', ticket.id);

      socket.on('ticket_updated', (updatedTicketData) => {
        if (onUpdate) {
          // Actualizar el ticket con los nuevos datos
          const updatedTicket = {...ticket, ...updatedTicketData.changes};
          onUpdate(updatedTicket);
        }
      });

      return () => {
        socket.emit('leave_ticket_room', ticket.id);
        socket.off('ticket_updated');
      };
    }
  }, [socket, ticket.id, onUpdate]);

  useEffect(() => {
    let interval;
    if (ticket.status === 'in_progress' && ticket.started_at) {
      interval = setInterval(() => {
        const startedAt = moment(ticket.started_at);
        setElapsedTime(moment().diff(startedAt, 'seconds'));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [ticket.status, ticket.started_at]);

  const handleActionClick = (actionType) => {
    setAction(actionType);
    setOpenDialog(true);
  };

  // const handleConfirm = async () => {
  //   setOpenDialog(false);
  //   try {
  //     const result = await updateTicket(ticket.id, { action }, token);
  //     if (onAction) {
  //       onAction(action, result.ticket);
  //     }
  //     // Emitir el cambio del ticket a través del socket
  //     socket.emit('update_ticket', result.ticket);
  //   } catch (error) {
  //     console.error('Error updating ticket:', error);
  //     // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
  //   }
  // };


  const handleConfirm = async () => {
    setOpenDialog(false);
    try {
      const result = await updateTicket(ticket.id, { action }, token);
      if (result && result.ticket) {
        if (onAction) {
          onAction(action, result.ticket);
        }
        // Emitir el cambio del ticket a través del socket
        if (socket) {
          socket.emit('update_ticket', {
            ticketId: result.ticket.id,
            updatedBy: result.ticket.updated_by,
            agencyId: result.ticket.agency_id,
            departmentId: result.ticket.department_id,
            changes: { 
              action: action,
              status: result.ticket.status,
              started_at: result.ticket.started_at,
              resolved_at: result.ticket.resolved_at
            }
          });
        }
      } else {
        throw new Error('La respuesta del servidor no contiene los datos esperados del ticket');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const renderActionButton = () => {
    if (isQualityControl()) {
      if (ticket.status === 'resolved') {
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Lock />}
            onClick={() => handleActionClick('close')}
            fullWidth
          >
            Cerrar Ticket
          </Button>
        );
      }
    } else {
      switch (ticket.status) {
        case 'open':
          return (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              onClick={() => handleActionClick('start')}
              fullWidth
            >
              Empezar Ticket
            </Button>
          );
        case 'in_progress':
          return (
            <Button
              variant="contained"
              color="success"
              startIcon={<Check />}
              onClick={() => handleActionClick('resolve')}
              fullWidth
            >
              Resolver Ticket
            </Button>
          );
      }
    }
    return (
      <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Typography variant="body2" align="center">
          {ticket.status === 'resolved' ? 'Este ticket ya fue resuelto' : 'No hay acciones disponibles para este ticket'}
        </Typography>
      </Paper>
    );
  };

  const renderTicketTimes = () => {
    const createdAt = moment(ticket.created_at);
    const startedAt = ticket.started_at ? moment(ticket.started_at) : null;
    const resolvedAt = ticket.resolved_at ? moment(ticket.resolved_at) : null;

    return (
      <Box mt={2}>
        <Typography variant="body2">
          Creado hace: {moment.duration(moment().diff(createdAt)).humanize()}
        </Typography>
        {startedAt && (
          <Typography variant="body2">
            En progreso hace: {moment.duration(moment().diff(startedAt)).humanize()}
          </Typography>
        )}
        {resolvedAt && startedAt && (
          <Typography variant="body2">
            Tiempo de resolución: {moment.duration(resolvedAt.diff(startedAt)).humanize()}
          </Typography>
        )}
      </Box>
    );
  };

  const renderElapsedTime = () => {
    if (ticket.status === 'in_progress') {
      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      const seconds = elapsedTime % 60;
      return (
        <Box mt={2} display="flex" alignItems="center" justifyContent="center">
          <AccessTime sx={{ mr: 1 }} />
          <Typography variant="h4">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Acciones del Ticket
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {renderActionButton()}
        </Grid>
        <Grid item xs={12}>
          {renderElapsedTime()}
        </Grid>
        <Grid item xs={12}>
          {renderTicketTimes()}
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action === 'start' && '¿Seguro que quieres empezar este ticket ahora?'}
            {action === 'resolve' && '¿Seguro que quieres resolver este ticket?'}
            {action === 'close' && '¿Seguro que quieres cerrar este ticket?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TicketActions;