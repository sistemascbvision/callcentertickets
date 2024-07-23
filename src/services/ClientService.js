


// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// export const getSucursales = async (token) => {
//   try {
//     const response = await axios.get(`${API_URL}/sucursales`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching sucursales:', error);
//     throw error;
//   }
// };

// export const getClientes = async (token) => {
//   try {
//     const response = await axios.get(`${API_URL}/clientes_db`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching clientes:', error);
//     throw error;
//   }
// };

// export const buscarCliente = async (token, termino) => {
//   try {
//     const response = await axios.get(`${API_URL}/clientes_db/buscar/${termino}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error searching cliente:', error);
//     throw error;
//   }
// };

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getSucursales = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/sucursales`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sucursales:', error);
    throw error;
  }
};

export const getClientes = async (token, sucursalId) => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${sucursalId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }
};

export const buscarCliente = async (token, sucursalId, termino) => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${sucursalId}/buscar`, {
      params: { termino },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching cliente:', error);
    throw error;
  }
};

export const getClienteById = async (token, sucursalId, clienteId) => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${sucursalId}/cliente/${clienteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cliente by ID:', error);
    throw error;
  }
};

export const getUserList = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user list');
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  }
};











