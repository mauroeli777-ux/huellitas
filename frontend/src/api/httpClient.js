import axios from 'axios';

// Dirección base del backend, tomada del archivo .env
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Antes de cada petición, adjunta el token del usuario si existe
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default httpClient;
