import express from "express";
import cors from "cors";
import psychologistRoutes from "./routes/psychologist.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import SessionRoutes from "./routes/Session.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/psychologists", psychologistRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/sessions", SessionRoutes);
app.use("/api/auth", authRoutes);

export default app;
