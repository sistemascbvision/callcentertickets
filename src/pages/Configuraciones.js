

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   TextField,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import PersonIcon from '@mui/icons-material/Person';
// import BusinessIcon from '@mui/icons-material/Business';
// import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// import {
//   isAdmin,
//   isQualityControl,
//   isTechnician,
//   isCallCenter,
//   getUsers,
//   getUserRoles,
//   getUserAgencies,
//   getUserInfo
// } from '../services/UserService';
// import {
//   getTickets,
//   fetchZones,
// } from '../services/TicketService';
// import UserActions from '../components/UserActions';

// const StyledCard = styled(Card)(({ theme, gradient }) => ({
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: theme.shadows[8],
//   },
//   background: gradient || theme.palette.background.paper,
// }));

// const StatCard = ({ icon, title, value, gradient }) => (
//   <StyledCard gradient={gradient}>
//     <CardContent>
//       <Box display="flex" alignItems="center" mb={2}>
//         {icon}
//         <Typography variant="h6" component="div" ml={1}>
//           {title}
//         </Typography>
//       </Box>
//       <Typography variant="h4">{value}</Typography>
//     </CardContent>
//   </StyledCard>
// );

// function Configuraciones({ setGlobalNotification }) {
//   const [users, setUsers] = useState([]);
//   const [userRoles, setUserRoles] = useState([]);
//   const [userAgencies, setUserAgencies] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const userInfo = getUserInfo();

//         if (isAdmin()) {
//           const fetchedUsers = await getUsers(token);
//           setUsers(fetchedUsers);
//           const fetchedUserRoles = await getUserRoles(token);
//           setUserRoles(fetchedUserRoles);
//           const fetchedUserAgencies = await getUserAgencies(token);
//           setUserAgencies(fetchedUserAgencies);
//         }

//         const fetchedTickets = await getTickets(token);
//         setTickets(fetchedTickets);

//         const fetchedZones = await fetchZones(token);
//         setZones(fetchedZones);

//         // const getAgencies = await getAgencies(token);
//         // setAgencies(getAgencies);

//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {isAdmin() ? 'Panel de Administrador' : isQualityControl() ? 'Panel de Calidad' : isTechnician() ? 'Panel de Técnico' : 'Panel de Call Center'}
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             icon={<PersonIcon fontSize="large" color="primary" />}
//             title="Usuarios"
//             value={users.length}
//             gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             icon={<BusinessIcon fontSize="large" color="secondary" />}
//             title="Agencias"
//             value={zones.length}
//             gradient="linear-gradient(45deg, #FF9800 30%, #FFC107 90%)"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             icon={<ConfirmationNumberIcon fontSize="large" color="error" />}
//             title="Total Tickets"
//             value={tickets.length}
//             gradient="linear-gradient(45deg, #F44336 30%, #FF5722 90%)"
//           />
//         </Grid>
//       </Grid>

//       <Box mb={3}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Search"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </Box>

//       {isAdmin() && (
//         <UserActions 
//           setGlobalNotification={setGlobalNotification}
//         />
//       )}

//       {!isAdmin() && (
//         <NonAdminPanel 
//           tickets={tickets} 
//           zones={zones} 
//           searchTerm={searchTerm}
//         />
//       )}
//     </Box>
//   );
// }

// const NonAdminPanel = ({ tickets, zones, searchTerm }) => {
//   const filteredTickets = tickets.filter(ticket =>
//     ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Grid container spacing={4}>
//       <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//           Ticket Information
//         </Typography>
//         {filteredTickets.map(ticket => (
//           <Card key={ticket.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">{ticket.title}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Status: {ticket.status}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Zone: {zones.find(zone => zone.id === ticket.agency_name)?.name || 'Unknown'}
//               </Typography>
//               <Typography variant="body1">{ticket.description}</Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//           Zone Information
//         </Typography>
//         {zones.map(zone => (
//           <Card key={zone.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">{zone.name}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Description: {zone.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Grid>
//     </Grid>
//   );
// };
 
// export default Configuraciones;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {
  isAdmin,
  isQualityControl,
  isTechnician,
  isCallCenter,
  getUsers,
  getUserRoles,
  getUserAgencies,
  getUserInfo
} from '../services/UserService';
import {
  getTickets,
  fetchZones,
} from '../services/TicketService';
import UserActions from '../components/UserActions';

const StyledCard = styled(Card)(({ theme, gradient }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  background: gradient || theme.palette.background.paper,
}));

const StatCard = ({ icon, title, value, gradient }) => (
  <StyledCard gradient={gradient}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6" component="div" ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </StyledCard>
);

function Configuraciones({ setGlobalNotification }) {
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [userAgencies, setUserAgencies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [zones, setZones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const userInfo = getUserInfo();

        if (isAdmin()) {
          const fetchedUsers = await getUsers(token);
          setUsers(fetchedUsers);
          const fetchedUserRoles = await getUserRoles(token);
          setUserRoles(fetchedUserRoles);
          const fetchedUserAgencies = await getUserAgencies(token);
          setUserAgencies(fetchedUserAgencies);
        }

        const fetchedTickets = await getTickets(token);
        setTickets(fetchedTickets);

        const fetchedZones = await fetchZones(token);
        setZones(fetchedZones);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const openTickets = tickets.filter(ticket => ticket.status === 'Abierto').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resuelto').length;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isAdmin() ? 'Panel de Administrador' : isQualityControl() ? 'Panel de Calidad' : isTechnician() ? 'Panel de Técnico' : 'Panel de Call Center'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {isAdmin() ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<PersonIcon fontSize="large" color="primary" />}
                title="Usuarios"
                value={users.length}
                gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<BusinessIcon fontSize="large" color="secondary" />}
                title="Agencias"
                value={zones.length}
                gradient="linear-gradient(45deg, #FF9800 30%, #FFC107 90%)"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<ConfirmationNumberIcon fontSize="large" color="error" />}
                title="Total Tickets"
                value={tickets.length}
                gradient="linear-gradient(45deg, #F44336 30%, #FF5722 90%)"
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<ConfirmationNumberIcon fontSize="large" color="primary" />}
                title="Total Tickets"
                value={tickets.length}
                gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<CheckCircleIcon fontSize="large" color="success" />}
                title="Tickets Resueltos"
                value={resolvedTickets}
                gradient="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<ErrorIcon fontSize="large" color="error" />}
                title="Tickets Abiertos"
                value={openTickets}
                gradient="linear-gradient(45deg, #F44336 30%, #FF5722 90%)"
              />
            </Grid>
          </>
        )}
      </Grid>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      {isAdmin() && (
        <UserActions 
          setGlobalNotification={setGlobalNotification}
        />
      )}

      {!isAdmin() && (
        <NonAdminPanel 
          tickets={tickets} 
          zones={zones} 
          searchTerm={searchTerm}
        />
      )}
    </Box>
  );
}

const NonAdminPanel = ({ tickets, zones, searchTerm }) => {
  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={4}>
      {filteredTickets.map(ticket => (
        <Grid item xs={12} sm={6} md={4} key={ticket.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{ticket.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Estado: {ticket.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Zona: {zones.find(zone => zone.id === ticket.agency_name)?.name || 'Desconocida'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {ticket.description.length > 100
                  ? `${ticket.description.substring(0, 100)}...`
                  : ticket.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
 
export default Configuraciones;