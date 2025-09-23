import { Psychologist } from "../models/psychologist.model.js";
import bcrypt from "bcrypt";

// CREATE
export const createPsychologist = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPsych = new Psychologist({
      ...rest,
      password: hashedPassword,
    });

    await newPsych.save();
    res.status(201).json({ message: "Psychologist created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllPsychologists = async (req, res) => {
  try {
    const psychs = await Psychologist.find();

    res.status(200).json(psychs);
  } catch (err) {
    console.error("❌ Error en GET /api/psychologists:", err);
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getPsychologistById = async (req, res) => {
  try {
    const psych = await Psychologist.findById(req.params.id);
    if (!psych) return res.status(404).json({ error: "Not found" });
    res.json(psych);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updatePsychologist = async (req, res) => {
  try {
    const id = req.params.id;
    const psychologist = await Psychologist.findById(id);
    const { password, ...rest } = req.body;
    if (psychologist.password !== password && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      rest.password = hashedPassword;
    }

    const updated = await Psychologist.findByIdAndUpdate(id, rest, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (real, o puedes adaptarlo a soft delete)
export const deletePsychologist = async (req, res) => {
  try {
    const updated = await Psychologist.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
