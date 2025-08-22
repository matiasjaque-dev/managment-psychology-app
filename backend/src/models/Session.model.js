import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    psychologistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "psychologist",
      required: true,
    },

    scheduledStart: { type: Date, required: true },
    durationMin: { type: Number, default: 50 },

    status: {
      type: String,
      enum: ["pendiente", "cancelada", "reagendada", "realizada"],
      default: "pendiente",
    },

    price: { type: Number, required: true },
    notes: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Session = mongoose.model("session", sessionSchema);
