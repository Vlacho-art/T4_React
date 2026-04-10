import axios from 'axios';

const rawBackendUrl = import.meta.env.VITE_API_URL?.trim();

const backendUrl =
  rawBackendUrl && rawBackendUrl !== '.'
    ? rawBackendUrl.replace(/\/+$|\/api$/g, '').trim()
    : 'http://localhost:3000';

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = 'Error de red: no se pudo conectar al backend';
    }

    return Promise.reject(error);
  }
);

export default api;
