// Configuración de la API
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || 'https://tu-backend-railway-url.railway.app/api' // URL de Railway
  : 'http://localhost:4000/api'; // En desarrollo, usar localhost

export { API_BASE_URL };
