

  import { getUserInfo } from "./UserService";

const API_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const getTickets = async (token) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await handleResponse(response);
    return data.tickets; // Ahora devolvemos solo el array de tickets
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const deleteTicket = async (ticketId, token) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
};

export const fetchZones = async (token) => {
  // Mantenemos esta función si aún es necesaria
  try {
    const response = await fetch(`${API_URL}/sucursales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
};

export const fetchDepartments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};


export const addTicket = async (newTicket, token) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTicket),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error adding ticket:', error);
    throw error;
  }
};

// export const updateTicket = async (ticketId, updatedTicket, token) => {
//   try {
//     const userInfo = getUserInfo();
//     if (!userInfo || (!userInfo.role_name && !updatedTicket.action)) {
//       throw new Error('Role information is missing in user info and action is not provided');
//     }

//     let requestBody = { ...updatedTicket };

//     // Usar la acción proporcionada para determinar el estado del ticket
//     switch (updatedTicket.action) {
//       case 'start':
//         requestBody.status = 'in_progress';
//         requestBody.assignedTo = userInfo.id;
//         break;
//       case 'resolve':
//         requestBody.status = 'resolved';
//         break;
//       case 'close':
//         requestBody.status = 'closed';
//         break;
//       default:
//         // Si no se proporciona una acción, usar la lógica basada en roles si está disponible
//         if (userInfo.role_name === 'Control de Calidad') {
//           requestBody.status = 'closed';
//         } else if (userInfo.role_name === 'Call Center' || userInfo.role_name === 'Técnico') {
//           requestBody.status = 'in_progress';
//           requestBody.assignedTo = userInfo.id;
//         }
//     }

//     const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(requestBody),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Error updating ticket:', error);
//     throw error;
//   }
// };


export const updateTicket = async (ticketId, updatedTicket, token) => {
  try {
    const userInfo = getUserInfo();
    if (!userInfo) {
      throw new Error('User information is missing');
    }

    let requestBody = { ...updatedTicket };

    if (updatedTicket.action) {
      requestBody = { action: updatedTicket.action };
    } else if (updatedTicket.department_id !== undefined) {
      requestBody = { department_id: updatedTicket.department_id };
    }

    const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await handleResponse(response);
    
    if (data.message === 'Ticket updated successfully') {
      return data.ticket;
    } else {
      throw new Error(data.message || 'Failed to update ticket');
    }
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
};


export const getTicketsByClient = async (clientId, token) => {
  try {
    const response = await fetch(`${API_URL}/tickets/client/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.tickets;
  } catch (error) {
    console.error('Error fetching client tickets:', error);
    throw error;
  }
};




//comments

export const getTicketComments = async (ticketId, token) => { 
  try {
    const response = await fetch(`${API_URL}/comments/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.comments;
  } catch (error) {
    console.error('Error fetching ticket comments:', error);
    throw error;
  }
};

export const addComment = async (ticketId, comment, token) => {
  try {
    const response = await fetch(`${API_URL}/comments/${ticketId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const updateComment = async (ticketId, commentId, updatedComment, token) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: updatedComment }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (ticketId, commentId, token) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};