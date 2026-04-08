// src/api/axios.js
import axios from 'axios';
/**
* Cliente HTTP centralizado:
* - baseURL apunta al backend
* - headers comunes
*/
const backendUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : 'https://t4-backend-arit.onrender.com';

const api = axios.create({
    baseURL: backendUrl,
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