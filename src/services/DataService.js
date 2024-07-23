// services/DataService.js
import { getUserInfo } from "./UserService";

const API_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const getConnectedUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/connected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching connected users:', error);
    throw error;
  }
};

export const sendNotification = async (notification, token) => {
  try {
    const response = await fetch(`${API_URL}/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notification),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const getNotifications = async (token) => {
  try {
    const response = await fetch(`${API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId, token) => {
  try {
    const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};