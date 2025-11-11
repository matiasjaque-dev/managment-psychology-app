// Configuración de la API
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || 'https://managment-psychology-app-backend.onrender.com/api' // URL real de Render
  : 'http://localhost:4000/api'; // En desarrollo, usar localhost

export { API_BASE_URL };
