// Configuración de la API
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || 'https://managment-psychology-app-backend.onrender.com/api' // URL real de Render
  : 'http://localhost:4000/api'; // En desarrollo, usar localhost

// Debug logging
console.log('🔧 API Config Debug:');
console.log('   - import.meta.env.PROD:', import.meta.env.PROD);
console.log('   - import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('   - API_BASE_URL final:', API_BASE_URL);

export { API_BASE_URL };
