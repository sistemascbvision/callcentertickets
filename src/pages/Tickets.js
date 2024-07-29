// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
//   Switch,
//   Chip
// } from '@mui/material';

// import { Search, Add, AccountBox } from '@mui/icons-material';
// import AddTicketForm from '../components/AddTicketForm';
// import TicketTable from '../components/TicketTable';
// import ReportGenerator from '../components/ReportGenerator';
// import { isAdmin, isQualityControl, isCallCenter, getUserInfo, getUserRole } from '../services/UserService';
// import { getTickets, addTicket, deleteTicket } from '../services/TicketService';
// import { getSucursales } from '../services/ClientService';

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState({
//     open: true,
//     in_progress: true,
//     resolved: true,
//     closed: true
//   });
//   const [filterPeriod, setFilterPeriod] = useState('all');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterSucursal, setFilterSucursal] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [userSucursal, setUserSucursal] = useState(null);
//   const [isAdminUser, setIsAdminUser] = useState(false);
//   const [isCallCenterUser, setIsCallCenterUser] = useState(false);
//   const [isQualityControlUser, setIsQualityControlUser] = useState(false);
//   const [sucursales, setSucursales] = useState([]);
//   const [showColoredRows, setShowColoredRows] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userInfo = await getUserInfo();
//       setUserSucursal(userInfo.sucursal);
//       const adminStatus = isAdmin();
//       const callCenterStatus = isCallCenter();
//       const qualityControlStatus = isQualityControl();
//       setIsAdminUser(adminStatus);
//       setIsCallCenterUser(callCenterStatus);
//       setIsQualityControlUser(qualityControlStatus);
//       setUserRole(await getUserRole());

//       if (qualityControlStatus) {
//         setFilterStatus({
//           open: false,
//           in_progress: false,
//           resolved: true,
//           closed: true
//         });
//       }

//       try {
//         const token = localStorage.getItem('token');
//         const data = await getTickets(token);
//         setTickets(data);

//         if (adminStatus) {
//           const sucursalesData = await getSucursales(token);
//           setSucursales(sucursalesData);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUserData();

//     const pollInterval = setInterval(async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const data = await getTickets(token);
//         setTickets(data);
//       } catch (error) {
//         console.error('Error polling tickets:', error);
//       }
//     }, 1000);

//     return () => clearInterval(pollInterval);
//   }, []);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleAddTicket = async (newTicket) => {
//     try {
//       const token = localStorage.getItem('token');
//       const data = await addTicket(newTicket, token);
//       setTickets([...tickets, data]);
//     } catch (error) {
//       console.error('Error adding ticket:', error);
//     }
//   };

//   const handleEditTicket = (id) => {
//     console.log(`Edit ticket with id: ${id}`);
//   };

//   const handleDeleteTicket = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await deleteTicket(id, token);
//       setTickets(tickets.filter(ticket => ticket.id !== id));
//     } catch (error) {
//       console.error('Error deleting ticket:', error);
//     }
//   };

//   const handleStatusChange = (event) => {
//     if (!isQualityControlUser) {
//       setFilterStatus({ ...filterStatus, [event.target.name]: event.target.checked });
//     }
//   };

//   const isInPeriod = (date, period) => {
//     const ticketDate = new Date(date);
//     ticketDate.setHours(0, 0, 0, 0);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     switch (period) {
//       case 'today':
//         return ticketDate.getTime() === today.getTime();
//       case 'week':
//         const weekAgo = new Date(today);
//         weekAgo.setDate(weekAgo.getDate() - 7);
//         return ticketDate >= weekAgo;
//       default:
//         return true;
//     }
//   };

//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       filterStatus[ticket.status] &&
//       isInPeriod(ticket.created_at, filterPeriod) &&
//       (filterDate === '' || new Date(ticket.created_at).toDateString() === new Date(filterDate + 'T00:00:00').toDateString()) &&
//       (filterSucursal === '' || ticket.agency_id === filterSucursal)
//   );

//   const countOpenTickets = tickets.filter((ticket) => ticket.status === 'open').length;
//   const countToReviewTickets = tickets.filter((ticket) => ticket.status === 'resolved').length;

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5">
//           {isQualityControlUser
//             ? `Tickets: (${countToReviewTickets} por revisar)`
//             : `Tickets: (${countOpenTickets} Abiertos)`}
//           <Chip icon={<AccountBox />} label={userRole} color="secondary" style={{ marginLeft: '10px', marginTop: '-6px' }} variant="outlined" />


//         </Typography>
//         {(isAdminUser || isCallCenterUser) && (
//           <IconButton onClick={handleOpenModal}>
//             <Add />
//           </IconButton>
//         )}
//       </Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <TextField
//           label="Buscar"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//         />
//         {!isQualityControlUser && (
//           <FormGroup row>
//             <FormControlLabel
//               control={<Checkbox checked={filterStatus.open} onChange={handleStatusChange} name="open" />}
//               label="Abierto"
//             />
//             <FormControlLabel
//               control={<Checkbox checked={filterStatus.in_progress} onChange={handleStatusChange} name="in_progress" />}
//               label="En proceso"
//             />
//             <FormControlLabel
//               control={<Checkbox checked={filterStatus.resolved} onChange={handleStatusChange} name="resolved" />}
//               label="Resuelto"
//             />
//             <FormControlLabel
//               control={<Checkbox checked={filterStatus.closed} onChange={handleStatusChange} name="closed" />}
//               label="Cerrado"
//             />
//           </FormGroup>
//         )}
//         <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
//           <InputLabel id="filter-period-label">Periodo</InputLabel>
//           <Select
//             labelId="filter-period-label"
//             id="filter-period"
//             value={filterPeriod}
//             onChange={(e) => setFilterPeriod(e.target.value)}
//             label="Periodo"
//           >
//             <MenuItem value="all">Todos</MenuItem>
//             <MenuItem value="today">Hoy</MenuItem>
//             <MenuItem value="week">Esta semana</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           label="Fecha específica"
//           type="date"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           size="small"
//         />
//         {isAdminUser && (
//           <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
//             <InputLabel id="filter-sucursal-label">Sucursal</InputLabel>
//             <Select
//               labelId="filter-sucursal-label"
//               id="filter-sucursal"
//               value={filterSucursal}
//               onChange={(e) => setFilterSucursal(e.target.value)}
//               label="Sucursal"
//             >
//               <MenuItem value=""><em>Todas</em></MenuItem>
//               {sucursales.map((sucursal) => (
//                 <MenuItem key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//         <FormControlLabel
//           control={
//             <Switch
//               checked={showColoredRows}
//               onChange={(e) => setShowColoredRows(e.target.checked)}
//               name="showColoredRows"
//             />
//           }
//           label="Mostrar filas coloreadas"
//         />
//       </Box>
//       <TicketTable
//         tickets={filteredTickets}
//         handleEditTicket={handleEditTicket}
//         handleDeleteTicket={handleDeleteTicket}
//         isAdmin={isAdminUser}
//         showColoredRows={showColoredRows}
//       />
//       {(isAdminUser || isCallCenterUser) && (
//         <AddTicketForm
//           open={openModal}
//           handleClose={handleCloseModal}
//           handleAddTicket={handleAddTicket}
//           userSucursal={userSucursal}
//         />
//       )}
//     </Box>
//   );
// };

// export default Tickets;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';

import { Search, Add, AccountBox } from '@mui/icons-material';
import AddTicketForm from '../components/AddTicketForm';
import TicketTable from '../components/TicketTable';
import ReportGenerator from '../components/ReportGenerator';
import { isAdmin, isQualityControl, isCallCenter, getUserInfo, getUserRole } from '../services/UserService';
import { getTickets, addTicket, deleteTicket } from '../services/TicketService';
import { getSucursales } from '../services/ClientService';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState({
    open: true,
    in_progress: true,
    resolved: true,
    closed: true
  });
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterSucursal, setFilterSucursal] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userSucursal, setUserSucursal] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isCallCenterUser, setIsCallCenterUser] = useState(false);
  const [isQualityControlUser, setIsQualityControlUser] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [showColoredRows, setShowColoredRows] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await getUserInfo();
      setUserSucursal(userInfo.sucursal);
      const adminStatus = isAdmin();
      const callCenterStatus = isCallCenter();
      const qualityControlStatus = isQualityControl();
      setIsAdminUser(adminStatus);
      setIsCallCenterUser(callCenterStatus);
      setIsQualityControlUser(qualityControlStatus);
      setUserRole(await getUserRole());

      if (qualityControlStatus) {
        setFilterStatus({
          open: false,
          in_progress: false,
          resolved: true,
          closed: true
        });
      }

      try {
        const token = localStorage.getItem('token');
        const data = await getTickets(token);
        setTickets(data);

        if (adminStatus) {
          const sucursalesData = await getSucursales(token);
          setSucursales(sucursalesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();

    const pollInterval = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getTickets(token);
        setTickets(data);
      } catch (error) {
        console.error('Error polling tickets:', error);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTicket = async (newTicket) => {
    try {
      const token = localStorage.getItem('token');
      const data = await addTicket(newTicket, token);
      setTickets([...tickets, data]);
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const handleEditTicket = (id) => {
    console.log(`Edit ticket with id: ${id}`);
  };

  const handleDeleteTicket = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteTicket(id, token);
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleStatusChange = (event) => {
    if (!isQualityControlUser) {
      setFilterStatus({ ...filterStatus, [event.target.name]: event.target.checked });
    }
  };

  const isInPeriod = (date, period) => {
    const ticketDate = new Date(date);
    ticketDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (period) {
      case 'today':
        return ticketDate.getTime() === today.getTime();
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return ticketDate >= weekAgo;
      default:
        return true;
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterStatus[ticket.status] &&
      isInPeriod(ticket.created_at, filterPeriod) &&
      (filterDate === '' || new Date(ticket.created_at).toDateString() === new Date(filterDate + 'T00:00:00').toDateString()) &&
      (filterSucursal === '' || ticket.agency_id === filterSucursal)
  );

  const countOpenTickets = tickets.filter((ticket) => ticket.status === 'open').length;
  const countToReviewTickets = tickets.filter((ticket) => ticket.status === 'resolved').length;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          {isQualityControlUser
            ? `Tickets: (${countToReviewTickets} por revisar)`
            : `Tickets: (${countOpenTickets} Abiertos)`}
          <Chip icon={<AccountBox />} label={userRole} color="secondary" style={{ marginLeft: '10px', marginTop: '-6px' }} variant="outlined" />
        </Typography>
        {(isAdminUser || isCallCenterUser) && (
          <IconButton onClick={handleOpenModal}>
            <Add />
          </IconButton>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {!isQualityControlUser && (
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={filterStatus.open} onChange={handleStatusChange} name="open" />}
              label="Abierto"
            />
            <FormControlLabel
              control={<Checkbox checked={filterStatus.in_progress} onChange={handleStatusChange} name="in_progress" />}
              label="En proceso"
            />
            <FormControlLabel
              control={<Checkbox checked={filterStatus.resolved} onChange={handleStatusChange} name="resolved" />}
              label="Resuelto"
            />
            <FormControlLabel
              control={<Checkbox checked={filterStatus.closed} onChange={handleStatusChange} name="closed" />}
              label="Cerrado"
            />
          </FormGroup>
        )}
        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
          <InputLabel id="filter-period-label">Periodo</InputLabel>
          <Select
            labelId="filter-period-label"
            id="filter-period"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            label="Periodo"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="today">Hoy</MenuItem>
            <MenuItem value="week">Esta semana</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Fecha específica"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        {isAdminUser && (
          <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
            <InputLabel id="filter-sucursal-label">Sucursal</InputLabel>
            <Select
              labelId="filter-sucursal-label"
              id="filter-sucursal"
              value={filterSucursal}
              onChange={(e) => setFilterSucursal(e.target.value)}
              label="Sucursal"
            >
              <MenuItem value=""><em>Todas</em></MenuItem>
              {sucursales.map((sucursal) => (
                <MenuItem key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={showColoredRows}
                onChange={(e) => setShowColoredRows(e.target.checked)}
                name="showColoredRows"
              />
            }
            label="Mostrar filas coloreadas"
          />
          {/* <ReportGenerator tickets={filteredTickets} /> */}
        </Box>
      </Box>
      <TicketTable
        tickets={filteredTickets}
        handleEditTicket={handleEditTicket}
        handleDeleteTicket={handleDeleteTicket}
        isAdmin={isAdminUser}
        showColoredRows={showColoredRows}
      />
      {(isAdminUser || isCallCenterUser) && (
        <AddTicketForm
          open={openModal}
          handleClose={handleCloseModal}
          handleAddTicket={handleAddTicket}
          userSucursal={userSucursal}
        />
      )}
    </Box>
  );
};

export default Tickets;