// Configuración de la API
const API_BASE_URL = import.meta.env.PROD
  ? "/api" // En producción, usar rutas relativas
  : "http://localhost:4000/api"; // En desarrollo, usar localhost

export { API_BASE_URL };
