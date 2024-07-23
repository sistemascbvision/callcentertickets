import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  TextField, 
  Button, 
  Grid,
  Modal,
  Snackbar,
  Alert,
  Chip,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import { AccessTime, Person, Assignment, LocationOn, Send, PhoneAndroid, Business, Description } from '@mui/icons-material';
import { getTickets, getTicketComments, addComment, updateTicket } from '../services/TicketService';
import { getUserInfo } from '../services/UserService';
import moment from 'moment-timezone';
import 'moment/locale/es';
import TicketActions from '../components/TicketActions';
import { useNotification } from '../NotificacionContext';


const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState(null);
  const theme = useTheme();
  const { socket } = useNotification();


  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const ticketData = await getTickets(token);
        const ticketDetails = ticketData.find(t => t.id === parseInt(ticketId));
        setTicket(ticketDetails);
        
        const commentsData = await getTicketComments(ticketId, token);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        setSnackbarMessage('Error al cargar los detalles del ticket');
        setSnackbarOpen(true);
      }
    };

    fetchTicketDetails();

    // Configurar el intervalo de actualización
    const pollInterval = setInterval(fetchTicketDetails, 1000); // Actualiza cada 5 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(pollInterval);
  }, [ticketId, token]);

  // const handleAddComment = async () => {
  //   if (newComment.trim() === '') {
  //     setSnackbarMessage('Por favor, escribe un comentario antes de confirmar.');
  //     setSnackbarOpen(true);
  //     return;
  //   }
  //   try {
  //     await addComment(ticketId, newComment, token);
  //     setNewComment('');
  //     setSnackbarMessage('Comentario agregado exitosamente');
  //     setSnackbarOpen(true);
  //     setShowConfirmationModal(false);
      
  //     // Actualizar inmediatamente los comentarios
  //     const commentsData = await getTicketComments(ticketId, token);
  //     setComments(commentsData);
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //     setSnackbarMessage('Error al agregar el comentario');
  //     setSnackbarOpen(true);
  //   }
  // };


  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      setSnackbarMessage('Por favor, escribe un comentario antes de confirmar.');
      setSnackbarOpen(true);
      return;
    }
    try {
      const userInfo = getUserInfo(); // Assuming you have this function
      const commentResponse = await addComment(ticketId, newComment, token);
      setNewComment('');
      setSnackbarMessage('Comentario agregado exitosamente');
      setSnackbarOpen(true);
      setShowConfirmationModal(false);
       
      // Actualizar inmediatamente los comentarios
      const commentsData = await getTicketComments(ticketId, token);
      setComments(commentsData);
  
      // Emitir evento de comentario creado
      if (socket && !commentResponse.id) {
        socket.emit('comment_created', {
          ticketId: ticketId,
          commentId: commentResponse.id,
          createdBy: userInfo.username,
          agencyName: userInfo.agencyName // Assuming this exists in user info
        });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setSnackbarMessage('Error al agregar el comentario');
      setSnackbarOpen(true);
    }
  };


  // const handleTicketAction = async (action) => {
  //   try {
  //     const result = await updateTicket(ticketId, { action }, token);
  //     setTicket(result.ticket);
  //     setSnackbarMessage(`Ticket ${action === 'start' ? 'iniciado' : action === 'resolve' ? 'resuelto' : 'cerrado'} exitosamente`);
  //     setSnackbarOpen(true);
      
  //     // Actualizar inmediatamente los comentarios después de una acción
  //     const commentsData = await getTicketComments(ticketId, token);
  //     setComments(commentsData);

  //   } catch (error) {
  //     console.error('Error updating ticket:', error);
  //     setSnackbarMessage(error.message || 'Error al actualizar el ticket');
  //     setSnackbarOpen(true);
  //   }
  // };

//revisado


const handleTicketAction = async (action) => {
  try {
    const result = await updateTicket(ticketId, { action }, token);
    setTicket(result.ticket);
    setSnackbarMessage(`Ticket ${action === 'start' ? 'iniciado' : action === 'resolve' ? 'resuelto' : 'cerrado'} exitosamente`);
    setSnackbarOpen(true);
    
    // Actualizar inmediatamente los comentarios después de una acción
    const commentsData = await getTicketComments(ticketId, token);
    setComments(commentsData);
    
  } catch (error) {
    console.error('Error updating ticket:', error);
    setSnackbarMessage(error.message || 'Error al actualizar el ticket');
    setSnackbarOpen(true);
  }
};


  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const formatDate = (dateString) => {
    return moment(dateString).tz('America/Guayaquil').format('DD [de] MMMM [de] YYYY, HH:mm');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '??';
  };

  const getTimeAgo = (dateString) => {
    moment.locale('es');
    return moment(dateString).tz('America/Guayaquil').fromNow();
  };

  const getAvatarColor = (userId) => {
    const colors = [
      '#9C27B0', '#673AB7', '#FF5722', '#FF9800', 
      '#795548', '#9E9E9E', '#607D8B', '#E91E63'
    ];
    return colors[userId % colors.length];
  };

  const getStatusInSpanish = (status) => {
    const statusMap = {
      'open': 'Abierto',
      'in_progress': 'En proceso',
      'resolved': 'Resuelto',
      'closed': 'Cerrado'
    };
    return statusMap[status] || status;
  };

  if (!ticket) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 2 }}>
      <Typography variant="h4" gutterBottom>{`Ticket #${ticketId}: ${ticket.title}`}</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff' }}>
            <Typography variant="h6" gutterBottom>Detalles del Ticket</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {formatDate(ticket.created_at)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Creado por: {ticket.created_by_username}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Assignment sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Estado: <Chip label={getStatusInSpanish(ticket.status)} color={ticket.status === 'open' ? 'error' : ticket.status === 'in_progress' ? 'warning' : 'success'} size="small" />
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Sucursal: {ticket.agency_name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff' }}>
            <Typography variant="h6" gutterBottom>Descripción</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {ticket.description}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff' }}>
            <Typography variant="h6" gutterBottom>Comentarios</Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
              <Avatar 
                sx={{ mr: 2, bgcolor: getAvatarColor(userInfo?.id || 0) }}
              >
                {userInfo ? getInitials(userInfo.username) : '??'}
              </Avatar>
              <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                label="Agregar un comentario"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleOpenConfirmationModal} 
                disabled={newComment.trim() === ''}
                endIcon={<Send />}
              >
                Enviar
              </Button>
            </Box>
            <List>
              {comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <Avatar 
                      sx={{ mr: 2, bgcolor: getAvatarColor(comment.user_id) }}
                    >
                      {getInitials(comment.username)}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                          sx={{ fontWeight: 'bold', display: 'inline' }}
                        >
                          {comment.username}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {formatDate(comment.created_at)}
                          </Typography>
                          <Typography
                            component="div"
                            variant="body1"
                            color="text.primary"
                            sx={{ mt: 1 }}
                          >
                            {comment.comment}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                      {getTimeAgo(comment.created_at)}
                    </Typography>
                  </ListItem>
                  {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <TicketActions ticket={ticket} onAction={handleTicketAction} />

          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#FFF3E0' }}>
            <Typography variant="h6" gutterBottom>Información del Cliente</Typography>
            <Typography><strong>Nombre:</strong> {ticket.requester_name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PhoneAndroid sx={{ mr: 1 }} />
              <Typography><strong>Contacto:</strong> {ticket.requester_contact}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Business sx={{ mr: 1 }} />
              <Typography><strong>ID Cliente:</strong> {ticket.client_id || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Description sx={{ mr: 1 }} />
              <Typography><strong>Contrato ID:</strong> {ticket.contract_id || 'N/A'}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#E8EAF6' }}>
            <Typography variant="h6" gutterBottom>Tiempo Transcurrido</Typography>
            <Typography>{getTimeAgo(ticket.created_at)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}>
          <Typography variant="h6" gutterBottom id="modal-title">Confirmación</Typography>
          <Typography variant="body1" id="modal-description">
            ¿Estás seguro de que deseas agregar este comentario?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseConfirmationModal} color="secondary" variant="outlined" sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button onClick={handleAddComment} color="primary" variant="contained">
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TicketDetails;