import type { Patient } from "../types/Patient";
import type { Psychologist } from "../types/psychologist";

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
