// src/api/axios.js
import axios from 'axios';
/**
* Cliente HTTP centralizado:
* - baseURL apunta al backend
* - headers comunes
*/
const rawBackendUrl = import.meta.env.VITE_API_URL?.trim();
const backendUrl = rawBackendUrl && rawBackendUrl !== '.'
  ? rawBackendUrl.replace(/\/+$|\/api$/g, '').trim()
  : 'https://t4-backend-nr8c.onrender.com';

const api = axios.create({
    baseURL: `${backendUrl}/api`,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor para adjuntar el token si existe:
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Mejor mensaje para errores de red:
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