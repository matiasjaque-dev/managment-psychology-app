// src/routes/psychologist.routes.js
import express from "express";
import {
  createPsychologist,
  getAllPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
} from "../controllers/psychologist.controller.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta pública para pacientes - solo información básica
router.get("/public", async (req, res) => {
  try {
    const { Psychologist } = await import("../models/psychologist.model.js");
    const psychologists = await Psychologist.find(
      { isActive: true }, 
      'name specialty email' // Solo campos públicos
    );
    res.status(200).json(psychologists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Todas las rutas de psicólogos requieren autenticación y rol admin
router.post("/", authMiddleware, checkRole(["admin"]), createPsychologist);
router.get("/", authMiddleware, checkRole(["admin"]), getAllPsychologists);
router.get("/:id", authMiddleware, checkRole(["admin"]), getPsychologistById);
router.put("/:id", authMiddleware, checkRole(["admin"]), updatePsychologist);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deletePsychologist);

export default router;
