import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rut: { type: String },
    phone: { type: String },
    gender: { type: String },
    birthdate: { type: Date },
    address: { type: String },
    role: { type: String, default: "patient" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("patient", patientSchema);
