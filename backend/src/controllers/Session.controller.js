import { Session } from "../models/Session.model.js";

// CREATE
export const createSession = async (req, res) => {
  try {
    const newSession = new Session(req.body);
    await newSession.save();
    res
      .status(201)
      .json({ message: "Session created successfully", session: newSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate(
      "psychologistId",
      "name email"
    );
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("psychologistId", "name email");
    if (!session) return res.status(404).json({ error: "Not found" });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateSession = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Session.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (soft delete)
export const deleteSession = async (req, res) => {
  try {
    const updated = await Session.findByIdAndUpdate(
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
