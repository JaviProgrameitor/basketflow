import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API, // URL base
  timeout: 5000, // Tiempo máximo de espera
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para adjuntar tokens automáticamente en cada request
api.interceptors.request.use(
  (config) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const deviceToken = localStorage.getItem('deviceToken');
      if (authToken && !config.headers['x-auth-token']) {
        config.headers['x-auth-token'] = authToken;
      }
      if (deviceToken && !config.headers['x-device-token']) {
        config.headers['x-device-token'] = deviceToken;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas globales
api.interceptors.response.use(
  (response) => response.data, // Extrae solo los datos
  (error) => {
    console.error('Error en la petición:', error.message);
    return Promise.reject(error);
  }
);

export default api;