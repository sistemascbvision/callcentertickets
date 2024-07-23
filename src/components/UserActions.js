import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
  Autocomplete,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  getAgencies,
  getDepartments,
  assignAgencyToUser,
  removeAgencyFromUser,
  assignRoleToUser,
  removeRoleFromUser,
  assignDepartmentToUser,
  removeDepartmentFromUser,
} from "../services/UserService";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  "& .MuiTableCell-head": {
    color: theme.palette.common.white,
  },
}));

const UserActions = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [assignType, setAssignType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openConfirmAssignDialog, setOpenConfirmAssignDialog] = useState(false);
  const [openConfirmRemoveDialog, setOpenConfirmRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const fetchedUsers = await getUsers(token);
      setUsers(fetchedUsers);
      const fetchedRoles = await getRoles(token);
      setRoles(fetchedRoles);
      const fetchedAgencies = await getAgencies(token);
      setAgencies(fetchedAgencies);
      const fetchedDepartments = await getDepartments(token);
      setDepartments(fetchedDepartments);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleOpenUserDialog = async (userId = null) => {
    if (userId) {
      const token = localStorage.getItem("token");
      const user = await getUserById(userId, token);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      if (currentUser) {
        await updateUser(currentUser.id, userData, token);
      } else {
        await createUser(userData, token);
      }
      fetchData();
      handleCloseUserDialog();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteUser(userToDelete, token);
      fetchData();
      setOpenConfirmDialog(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenAssignDialog = (type) => {
    setAssignType(type);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedUser(null);
    setSelectedItem(null);
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedItem) return;
    setOpenConfirmAssignDialog(true);
  };

  const confirmAssign = async () => {
    const token = localStorage.getItem("token");
    try {
      switch (assignType) {
        case "agency":
          await assignAgencyToUser(selectedUser.id, selectedItem.id, token);
          break;
        case "role":
          await assignRoleToUser(selectedUser.id, selectedItem.id, token);
          break;
        case "department":
          await assignDepartmentToUser(selectedUser.id, selectedItem.id, token);
          break;
      }
      fetchData();
      handleCloseAssignDialog();
      setOpenConfirmAssignDialog(false);
    } catch (error) {
      console.error(`Error al asignar ${assignType}:`, error);
    }
  };

  const handleRemove = (type, userId, itemId) => {
    setAssignType(type);
    setSelectedUser({ id: userId });
    setItemToRemove(itemId);
    setOpenConfirmRemoveDialog(true);
  };

  const confirmRemove = async () => {
    const token = localStorage.getItem("token");
    try {
      switch (assignType) {
        case "agency":
          await removeAgencyFromUser(selectedUser.id, itemToRemove, token);
          break;
        case "role":
          await removeRoleFromUser(selectedUser.id, itemToRemove, token);
          break;
        case "department":
          await removeDepartmentFromUser(selectedUser.id, itemToRemove, token);
          break;
      }
      fetchData();
      setOpenConfirmRemoveDialog(false);
    } catch (error) {
      console.error(`Error al remover ${assignType}:`, error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenUserDialog()}
        >
          Agregar Usuario
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Usuarios" />
        <Tab label="Agencias" />
        <Tab label="Roles" />
        <Tab label="Departamentos" />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Agencia</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.is_active ? "Sí" : "No"}</TableCell>
                  <TableCell>{user.roles || "-"}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.agencia || "-"}</TableCell>
                  <TableCell>{user.departments || "-"}</TableCell>
                  <TableCell>
                  <Button onClick={() => handleOpenUserDialog(user.id)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <>
          <Button onClick={() => handleOpenAssignDialog("agency")}>
            Asignar Agencia
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>ID de Usuario</TableCell>
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Agencia</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.agencia || "No asignado"}</TableCell>
                    <TableCell>
                      {user.agency_id && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            handleRemove("agency", user.id, user.agency_id)
                          }
                        >
                          Remover Agencia
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tabValue === 2 && (
        <>
          <Button onClick={() => handleOpenAssignDialog("role")}>
            Asignar Rol
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>ID de Usuario</TableCell>
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.roles || "No asignado"}</TableCell>
                    <TableCell>
                      {user.roles && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            handleRemove("role", user.id, user.role_id)
                          }
                        >
                          Remover Rol
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tabValue === 3 && (
        <>
          <Button onClick={() => handleOpenAssignDialog("department")}>
            Asignar Departamento
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>ID de Usuario</TableCell>
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.departments || "No asignado"}</TableCell>
                    <TableCell>
                      {user.departments && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            handleRemove(
                              "department",
                              user.id,
                              user.department_id
                            )
                          }
                        >
                          Remover Departamento
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <UserDialog
        open={openUserDialog}
        handleClose={handleCloseUserDialog}
        handleSave={handleSaveUser}
        user={currentUser}
        roles={roles}
        agencies={agencies}
      />

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Está seguro que desea eliminar este usuario?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button
            onClick={confirmDeleteUser}
            color="secondary"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAssignDialog}
        onClose={handleCloseAssignDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {`Asignar ${assignType === "agency"
              ? "Agencia"
              : assignType === "role"
                ? "Rol"
                : "Departamento"
            }`}
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.username} (${option.email})`}
            renderInput={(params) => (
              <TextField {...params} label="Seleccionar Usuario" fullWidth />
            )}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            fullWidth
            margin="normal"
          />
          <Autocomplete
            options={
              assignType === "agency"
                ? agencies
                : assignType === "role"
                  ? roles
                  : departments
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Seleccionar ${assignType === "agency"
                    ? "Agencia"
                    : assignType === "role"
                      ? "Rol"
                      : "Departamento"
                  }`}
                fullWidth
              />
            )}
            onChange={(event, newValue) => {
              setSelectedItem(newValue);
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancelar</Button>
          <Button onClick={handleAssign} color="primary" variant="contained">
            Asignar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmAssignDialog}
        onClose={() => setOpenConfirmAssignDialog(false)}
      >
        <DialogTitle>Confirmar Asignación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro que desea asignar este{" "}
            {assignType === "agency"
              ? "Agencia"
              : assignType === "role"
                ? "Rol"
                : "Departamento"}{" "}
            al usuario?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmAssignDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={confirmAssign} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmRemoveDialog}
        onClose={() => setOpenConfirmRemoveDialog(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro que desea remover este{" "}
            {assignType === "agency"
              ? "Agencia"
              : assignType === "role"
                ? "Rol"
                : "Departamento"}{" "}
            del usuario?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmRemoveDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={confirmRemove} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const UserDialog = ({
  open,
  handleClose,
  handleSave,
  user,
  roles,
  agencies,
}) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        is_active: user.is_active || true,
      });
    } else {
      setUserData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        is_active: true,
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
      <DialogTitle>{user ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
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
          name="password"
          label="Contraseña"
          type="password"
          value={userData.password}
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

export default UserActions;
