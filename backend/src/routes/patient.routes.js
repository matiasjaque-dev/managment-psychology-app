import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas de pacientes requieren autenticación y rol psychologist
router.post("/", authMiddleware, checkRole(["psychologist"]), createPatient);
router.get("/", authMiddleware, checkRole(["psychologist"]), getAllPatients);
router.get("/:id", authMiddleware, checkRole(["psychologist"]), getPatientById);
router.put("/:id", authMiddleware, checkRole(["psychologist"]), updatePatient);
router.delete("/:id", authMiddleware, checkRole(["psychologist"]), deletePatient);

export default router;
