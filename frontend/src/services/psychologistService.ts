import axios from "axios";
import type { Psychologist } from "../types/psychologist";

const API = "http://localhost:4000/api/psychologists";

export const getAllPsychologists = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createPsychologist = async (data: Psychologist) => {
  await axios.post(API, data);
};

export const updatePsychologist = async (id: string, data: Psychologist) => {
  await axios.put(`${API}/${id}`, data);
};

export const deletePsychologist = async (id: string) => {
  await axios.delete(`${API}/${id}`);
};
