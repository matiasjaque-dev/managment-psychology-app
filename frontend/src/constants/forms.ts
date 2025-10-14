import type { Patient } from "../types/Patient";
import type { Psychologist } from "../types/psychologist";
import type { SessionFormData } from "../types/Session";

export const initPsychologistForm: Psychologist = {
  name: "",
  email: "",
  specialty: "",
  password: "",
  rut: "",
  phone: "",
  gender: "",
  address: "",
};

export const initPatientForm: Patient = {
  name: "",
  email: "",
  password: "",
  rut: "",
  phone: "",
  gender: "",
  address: "",
};

export const initSessionForm: SessionFormData = {
  patientName: "",
  patientEmail: "",
  psychologistId: "",
  scheduledStart: "",
  durationMin: 50,
  price: 40000,
  status: "pendiente",
  notes: "",
};
