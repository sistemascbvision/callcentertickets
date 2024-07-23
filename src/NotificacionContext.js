



///aaaaa
//este codigo de aqui esta perrrfecto jsj

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import io from 'socket.io-client';

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000');
//     setSocket(newSocket);

//     // Obtener información del usuario
//     const fetchUserInfo = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await fetch('/api/user', {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//           const data = await response.json();
//           setUserInfo(data);
//           // Unirse a las salas correspondientes
//           if (data.agencyId) newSocket.emit('join_room', `agency_${data.agencyId}`);
//           if (data.departmentId) newSocket.emit('join_room', `department_${data.departmentId}`);
//         } catch (error) {
//           console.error('Error fetching user info:', error);
//         }
//       }
//     };
//     fetchUserInfo();

//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       const eventHandlers = {
//         'user_connected': (data) => addNotification(data.message, 'success'),
//         'user_disconnected': (data) => addNotification(`${data.username} ha cerrado sesión`, 'error'),
//         'ticket_created': (data) => addNotification(data.message, 'info'),
//         'ticket_updated': (data) => addNotification(data.message, 'info'),
//         'ticket_commented': (data) => addNotification(data.message, 'info')
//       };

//       Object.entries(eventHandlers).forEach(([event, handler]) => {
//         socket.on(event, handler);
//       });

//       return () => {
//         Object.keys(eventHandlers).forEach(event => {
//           socket.off(event);
//         });
//       };
//     }
//   }, [socket]);

//   const addNotification = (message, type) => {
//     console.log('Adding notification:', message, type);
//     setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
//   };

//   const removeNotification = (id) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id));
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, socket, userInfo }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
const API_URL = process.env.REACT_APP_API_URL;
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000');
    setSocket(newSocket);

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setUserInfo(data);
          
          // Unirse a las salas correspondientes
          if (data.agencyId) newSocket.emit('join_room', `agency_${data.agencyId}`);
          if (data.departmentId) newSocket.emit('join_room', `department_${data.departmentId}`);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
    fetchUserInfo();



  

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      const eventHandlers = {
        'user_connected': (data) => addNotification(data.message, 'success'),
        'user_disconnected': (data) => addNotification(`${data.username} ha cerrado sesión`, 'error'),
        'ticket_created': (data) => addNotification(data.message, 'info'),
        'ticket_updated': (data) => addNotification(data.message, 'info'),
        'ticket_commented': (data) => addNotification(data.message, 'info')
      };

      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });

      return () => {
        Object.keys(eventHandlers).forEach(event => {
          socket.off(event);
        });
      };
    }
  }, [socket]);

  const addNotification = (message, type) => {
    console.log('Adding notification:', message, type);
    setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, socket, userInfo }}>
      {children}
    </NotificationContext.Provider>
  );
};
