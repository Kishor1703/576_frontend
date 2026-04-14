import axios from 'axios';

const API = axios.create({ baseURL: 'https://576-backend.vercel.app/api' });

const clearAdminSession = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAdminSession();

      if (window.location.pathname !== '/admin/login') {
        window.location.replace('/admin/login');
      }
    }

    return Promise.reject(error);
  }
);

export default API;
