// services/userService.js

const API_URL = process.env.REACT_APP_API_URL;

// Utility functions
const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// User management
export const getUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: authHeader(token),
    });
    const user = await handleResponse(response);
    
    // user.department_id = user.department_id ? user.department_id.split(', ').map(Number) : [];
    // user.departments = user.departments ? user.departments.split(', ') : [];
    
    user.department_id = user.department_id || [];
    if (!Array.isArray(user.department_id)) {
      user.department_id = [user.department_id];
    }


    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: authHeader(token),
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: authHeader(token),
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// User roles
export const getUserRoles = async (token) => {
  try {
    const response = await fetch(`${API_URL}/userroles`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    throw error;
  }
};

export const getRoles = async (token) => {
  try {
    const response = await fetch(`${API_URL}/roles`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const assignRoleToUser = async (userId, roleId, token) => {
  try {
    const response = await fetch(`${API_URL}/userroles`, {
      method: 'POST',
      headers: authHeader(token),
      body: JSON.stringify({ userId, roleId }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw error;
  }
};

export const removeRoleFromUser = async (userId, roleId, token) => {
  try {
    const response = await fetch(`${API_URL}/userroles/${userId}/${roleId}`, {
      method: 'DELETE',
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error removing role from user:', error);
    throw error;
  }
};

// User agencies
export const getUserAgencies = async (token) => {
  try {
    const response = await fetch(`${API_URL}/useragencies`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user agencies:', error);
    throw error;
  }
};

export const getAgencies = async (token) => {
  try {
    const response = await fetch(`${API_URL}/agencies`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    throw error;
  }
};


export const getDepartments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/departments`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};



export const assignAgencyToUser = async (userId, agencyId, token) => {
  try {
    const response = await fetch(`${API_URL}/userAgencies/user/${userId}`, {
      method: 'POST',
      headers: authHeader(token),
      body: JSON.stringify({ agency_id: agencyId }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error assigning agency to user:', error);
    throw error;
  }
};



export const removeAgencyFromUser = async (userId, agencyId, token) => {
  try {
    const response = await fetch(`${API_URL}/userAgencies/user/${userId}/${agencyId}`, {
      method: 'DELETE',
      headers: authHeader(token),
      body: JSON.stringify({ agency_id: agencyId }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error removing agency from user:', error);
    throw error;
  }
};


// User departments
export const getUserDepartments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/userdepartments`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user departments:', error);
    throw error;
  }
};

export const getDepartmentsForUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/userDepartments/user/${userId}`, {
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching departments for user:', error);
    throw error;
  }
};

export const assignDepartmentToUser = async (userId, departmentId, token) => {
  try {
    const response = await fetch(`${API_URL}/userDepartments`, {
      method: 'POST',
      headers: authHeader(token),
      body: JSON.stringify({ userId, departmentId }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error assigning department to user:', error);
    throw error;
  }
};

export const removeDepartmentFromUser = async (userId, departmentId, token) => {
  try {
    const response = await fetch(`${API_URL}/userDepartments/${userId}/${departmentId}`, {
      method: 'DELETE',
      headers: authHeader(token),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error removing department from user:', error);
    throw error;
  }
};



// User info and role checks
export const getUserInfo = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getUserRole = async () => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.roles && userInfo.roles.length > 0 ? userInfo.roles[0].name : null;
};

export const hasRole = (roleName) => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.roles && userInfo.roles.some(role => role.name === roleName);
};

export const isAdmin = () => hasRole('Administrador');
export const isQualityControl = () => hasRole('Control de Calidad');
export const isCallCenter = () => hasRole('Call Center');
export const isTechnician = () => hasRole('Técnico');
export const isServiceTechnician = () => hasRole('Servicio Tecnico');

export const getUserAgency = () => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.agency_id ? userInfo.agency_id : null;
};

export const getUserRoleId = () => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.roles && userInfo.roles.length > 0 ? userInfo.roles[0].id : null;
};

export const getUserRoleName = () => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.roles && userInfo.roles.length > 0 ? userInfo.roles[0].name : null;
};


