import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

// Simulando la función de obtener la lista de usuarios
const getUsers = () => [
  { id: 1, name: 'Usuario 1', status: 'Activo' },
  { id: 2, name: 'Usuario 2', status: 'Inactivo' },
  { id: 3, name: 'Usuario 3', status: 'Activo' },
];

const ChatWindow = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflow: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const MessageBubble = styled(Paper)(({ theme, isOwnMessage }) => ({
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  maxWidth: '70%',
  alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
  backgroundColor: isOwnMessage ? theme.palette.primary.light : theme.palette.grey[200],
  color: isOwnMessage ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: isOwnMessage
    ? theme.shape.borderRadius + 'px ' + theme.shape.borderRadius + 'px 0 ' + theme.shape.borderRadius + 'px'
    : '0 ' + theme.shape.borderRadius + 'px ' + theme.shape.borderRadius + 'px ' + theme.shape.borderRadius + 'px',
}));

const UserList = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  padding: theme.spacing(2),
}));

const WSockets = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulación de obtención de usuarios
    const userList = getUsers();
    setUsers(userList);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]); // Limpiar los mensajes al seleccionar un nuevo usuario
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
      // Aquí implementarías la lógica para enviar el mensaje al servidor
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chat en tiempo real
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserList>
            <Typography variant="h6" gutterBottom>
              Usuarios en línea
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem
                  button
                  key={user.id}
                  selected={selectedUser && selectedUser.id === user.id}
                  onClick={() => handleUserSelect(user)}
                >
                  <ListItemAvatar>
                    <Avatar>{user.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.status} />
                </ListItem>
              ))}
            </List>
          </UserList>
        </Grid>
        <Grid item xs={12} md={8}>
          <ChatWindow>
            {selectedUser ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Chat con {selectedUser.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} isOwnMessage={message.sender === 'me'}>
                      <Typography variant="body2">{message.text}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </MessageBubble>
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="body1">Selecciona un usuario para comenzar a chatear</Typography>
            )}
          </ChatWindow>
          <Box sx={{ display: 'flex' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!selectedUser}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={!selectedUser}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WSockets;
