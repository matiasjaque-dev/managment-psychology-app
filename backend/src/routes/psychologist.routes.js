// src/routes/psychologist.routes.js
import express from "express";
import {
  createPsychologist,
  getAllPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
} from "../controllers/psychologist.controller.js";

const router = express.Router();

router.post("/", createPsychologist);
router.get("/", getAllPsychologists);
router.get("/:id", getPsychologistById);
router.put("/:id", updatePsychologist);
router.delete("/:id", deletePsychologist);

export default router;
