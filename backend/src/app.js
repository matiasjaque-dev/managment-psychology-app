import express from "express";
import cors from "cors";
import psychologistRoutes from "./routes/psychologist.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import SessionRoutes from "./routes/Session.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Configuración de CORS para producción
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://managment-psychology-app.vercel.app',
  // Railway genera URLs aleatorias, por eso usamos una función
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como apps móviles)
    if (!origin) return callback(null, true);
    
    // Verificar si el origin está en la lista permitida
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Permitir dominios de Vercel
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // Permitir dominios de Railway
    if (origin.endsWith('.railway.app')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use("/api/psychologists", psychologistRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/sessions", SessionRoutes);
app.use("/api/auth", authRoutes);

export default app;
