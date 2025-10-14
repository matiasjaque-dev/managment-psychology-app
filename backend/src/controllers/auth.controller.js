import { Psychologist } from "../models/psychologist.model.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Patient } from "../models/Patient.model.js";
import { Admin } from "../models/Admin.model.js";

export const login = async (req, res) => {
  try {
    console.log("Login attempt with body:", req.body);
    const { email, password } = req.body;

    if (email === "admin@admin.com") {
      const account = await Admin.findOne({ email });
      if (!account) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const token = jwt.sign(
        { id: account._id, role: account.role, name: account.name },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        token,
        user: {
          id: account._id,
          role: account.role,
          name: account.name,
          email: account.email,
        },
      });
    }

    const user = await Psychologist.findOne({ email });

    const patient = await Patient.findOne({ email });

    console.log("Found user:", user);
    console.log("Found patient:", patient);
    if (!user && !patient) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (user && !user.isActive) {
      return res.status(403).json({ message: "Cuenta de psicólogo inactiva" });
    }
    if (patient && !patient.isActive) {
      return res.status(403).json({ message: "Cuenta de paciente inactiva" });
    }

    const account = user || patient;

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: account._id, role: account.role, name: account.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: account._id,
        role: account.role,
        name: account.name,
        email: account.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};
