import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import UserDialog from './UserDialog';

const UsersTable = ({ users, roles, agencies, departments, onDeleteUser, onUpdateUser }) => {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenUserDialog = (user) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData) => {
    onUpdateUser(selectedUser.id, userData);
    handleCloseUserDialog();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Agencias</TableCell>
              <TableCell>Departamentos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.is_active ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  {user.roles ? (
                    user.roles.map((role) => (
                      <Chip key={role} label={role} size="small" style={{ margin: '2px' }} />
                    ))
                  ) : (
                    <Chip label="No asignado" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {user.agencies ? (
                    user.agencies.map((agency) => (
                      <Chip key={agency} label={agency} size="small" style={{ margin: '2px' }} />
                    ))
                  ) : (
                    <Chip label="No asignado" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {user.departments ? (
                    user.departments.map((department) => (
                      <Chip key={department} label={department} size="small" style={{ margin: '2px' }} />
                    ))
                  ) : (
                    <Chip label="No asignado" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenUserDialog(user)}>Editar</Button>
                  <Button onClick={() => onDeleteUser(user.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDialog
        open={openUserDialog}
        handleClose={handleCloseUserDialog}
        handleSave={handleSaveUser}
        user={selectedUser}
        roles={roles}
        agencies={agencies}
        departments={departments}
      />
    </>
  );
};

export default UsersTable;