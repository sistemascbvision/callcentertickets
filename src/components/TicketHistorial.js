
//el codigo del presente
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText, Chip, Collapse, IconButton
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { getTicketsByClient } from '../services/TicketService';

function TicketHistorial({ clientId }) {
  const [tickets, setTickets] = useState([]);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!clientId) {
        setLoading(false);
        return;
      }
     
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const fetchedTickets = await getTicketsByClient(clientId, token);
        setTickets(fetchedTickets);
        setLoading(false);
      } catch (err) {
        setError('Error fetching ticket history');
        setLoading(false);
      }
    };
    fetchTickets();
  }, [clientId]);

  const handleExpandTicket = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  if (loading) return <Typography>Cargando historial de tickets...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!clientId) return <Typography>Seleccione un cliente para ver el historial de tickets.</Typography>;
  if (tickets.length === 0) return <Typography>No se encontró historial de tickets para este cliente.</Typography>;

  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Historial de Tickets</Typography>
      <Typography variant="body2" gutterBottom>
        Tickets totales: {tickets.length} | Tickets abiertos: {openTickets}
      </Typography>
      <List>
        {tickets.map((ticket) => (
          <React.Fragment key={ticket.id}>
            <ListItem
              button
              onClick={() => handleExpandTicket(ticket.id)}
              secondaryAction={
                <IconButton edge="end">
                  {expandedTicket === ticket.id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              }
            >
              <ListItemText
                primary={ticket.title}
                secondary={`Creado el: ${new Date(ticket.created_at).toLocaleDateString()}`}
              />
              <Chip label={ticket.status} color={getStatusColor(ticket.status)} size="small" />
            </ListItem>
            <Collapse in={expandedTicket === ticket.id} timeout="auto" unmountOnExit>
              <Box sx={{ ml: 4, mt: 1, mb: 2 }}>
                <Typography variant="body2">{ticket.description}</Typography>
                <ListItemText secondary={`Contrato: ${ticket.contract_id}` || 'Sin contrato'} />
                <Typography variant="caption">Contrato: {ticket.contract_id || 'No asignado'}</Typography>
                <Typography variant="caption">😃  Asignado a: {ticket.assigned_to || 'No asignado'}</Typography>
                

              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'open': return 'error';
    case 'in_progress': return 'warning';
    case 'resolved': return 'success';
    default: return 'default';
  }
};

export default TicketHistorial;