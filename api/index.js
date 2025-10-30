import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../backend/src/app.js";

dotenv.config();

// Conectar a MongoDB solo si no está conectado
if (mongoose.connection.readyState === 0) {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (mongoUri) {
    mongoose.connect(mongoUri);
  }
}

// Exportar la app del backend para Vercel
export default app;
