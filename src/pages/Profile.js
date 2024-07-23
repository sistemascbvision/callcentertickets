import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Email,
  Business,
  Work,
  NoteAdd,
  Delete,
  ContentCopy,
  Add,
} from '@mui/icons-material';
import { getUserInfo } from '../services/UserService';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [clipboard, setClipboard] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const theme = useTheme();
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info);
        const savedNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
        const savedTodos = JSON.parse(localStorage.getItem('userTodos')) || [];
        const savedClipboard = localStorage.getItem('userClipboard') || '';
        setNotes(savedNotes);
        setTodos(savedTodos);
        setClipboard(savedClipboard);
        console.log(info)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData(); 
  }, []);

  useEffect(() => {
    localStorage.setItem('userNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('userTodos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('userClipboard', clipboard);
  }, [clipboard]);

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  if (!userInfo) {
    return <Typography>Cargando información del usuario...</Typography>;
  }

  const renderUserInfo = (label, value) => {
    if (typeof value === 'object' && value !== null) {
      return value.name || 'No especificado';
    }
    return value || 'No especificado';
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                fontSize: 60,
                margin: 'auto',
                bgcolor: theme.palette.primary.main,
              }}
            >
              {getInitials(userInfo.first_name, userInfo.last_name)}
            </Avatar>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {`${userInfo.first_name} ${userInfo.last_name}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {renderUserInfo('Roles', userInfo.roles)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={userInfo.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Agencia" secondary={renderUserInfo('Agencia', userInfo.agencia)} />
              </ListItem>
              <ListItem> 
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Departamento" secondary={renderUserInfo('Departamento', userInfo.departments)} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>Notas</Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Nueva nota"
              />
              <Button startIcon={<NoteAdd />} onClick={addNote} sx={{ ml: 1 }}>
                Añadir
              </Button>
            </Box>
            <List>
              {notes.map((note, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(index)}>
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText primary={note} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>Lista de Tareas</Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Nueva tarea"
              />
              <Button startIcon={<Add />} onClick={addTodo} sx={{ ml: 1 }}>
                Añadir
              </Button>
            </Box>
            <List>
              {todos.map((todo, index) => (
                <ListItem key={index} 
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(index)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={todo.text} 
                    sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    onClick={() => toggleTodo(index)}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 3, p: 3, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h6" gutterBottom>Portapapeles</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={clipboard}
          onChange={(e) => setClipboard(e.target.value)}
          placeholder="Escribe o pega aquí tu texto..."
        />
        <Button 
          startIcon={<ContentCopy />} 
          onClick={() => navigator.clipboard.writeText(clipboard)}
          sx={{ mt: 1 }}
        >
          Copiar al portapapeles
        </Button>
      </Paper>

    </Box>
  );
};

export default Profile;





