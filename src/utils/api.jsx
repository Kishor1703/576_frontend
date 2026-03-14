import axios from 'axios';

const API = axios.create({ baseURL: 'https://576-backend.vercel.app/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
