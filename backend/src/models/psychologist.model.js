import mongoose from "mongoose";

const psychologistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rut: { type: String },
    phone: { type: String },
    specialty: { type: String },
    gender: { type: String },
    birthdate: { type: Date },
    address: { type: String },
    role: { type: String, default: "psychologist" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Psychologist = mongoose.model("psychologist", psychologistSchema);
