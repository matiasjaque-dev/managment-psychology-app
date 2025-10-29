import bcrypt from "bcrypt";
import { Patient } from "../models/Patient.model.js";

// CREATE
export const createPatient = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      ...rest,
      password: hashedPassword,
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Not found" });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    const { password, ...rest } = req.body;

    if (password && patient.password !== password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      rest.password = hashedPassword;
    }

    const updated = await Patient.findByIdAndUpdate(id, rest, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (soft delete)
export const deletePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
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
