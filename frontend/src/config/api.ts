// Configuración de la API
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || 'https://psychology-app-backend.onrender.com/api' // URL de Render (cambiar cuando tengas la real)
  : 'http://localhost:4000/api'; // En desarrollo, usar localhost

export { API_BASE_URL };
