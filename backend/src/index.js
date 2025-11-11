import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB", err));
