import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

// Conectar a MongoDB solo si no está conectado
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
}

// Exportar la app para Vercel
export default app;
