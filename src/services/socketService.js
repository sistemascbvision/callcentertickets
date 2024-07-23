// // src/services/socketService.js
// import io from 'socket.io-client';

// const socket = io(process.env.REACT_APP_API_URL);

// export const joinTicketRoom = (ticketId) => {
//   socket.emit('joinTicketRoom', ticketId);
// };

// export const leaveTicketRoom = (ticketId) => {
//   socket.emit('leaveTicketRoom', ticketId);
// };



// export const subscribeToTicketUpdates = (ticketId, callback) => {
//   socket.on(`ticketUpdate_${ticketId}`, callback);
// };

// export const unsubscribeFromTicketUpdates = (ticketId, callback) => {
//   socket.off(`ticketUpdate_${ticketId}`, callback);
// };

