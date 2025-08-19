// src/services/userService.js
const API_BASE_URL = 'http://localhost:3000/users';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  return response.json();
};

export const fetchUserStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
};
