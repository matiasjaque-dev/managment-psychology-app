import axios from "axios";
import type { Patient } from "../types/Patient";

const API = "http://localhost:4000/api/patients";

// Crea una función para obtener headers con el token
const getAuthHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Función usando token y try/catch
export const getAllPatients = async (token: string) => {
  try {
    const res = await axios.get(API, getAuthHeader(token));
    return res.data;
  } catch (error: any) {
    console.error("Error al obtener pacientes:", error.response?.data || error);
    throw error;
  }
};

export const getPatientById = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API}/${id}`, getAuthHeader(token));
    return res.data;
  } catch (error: any) {
    console.error("Error al obtener paciente:", error.response?.data || error);
    throw error;
  }
};

// Las otras también deberían recibir `token` y usar `getAuthHeader(token)`

export const createPatient = async (data: Patient, token: string) => {
  try {
    await axios.post(API, data, getAuthHeader(token));
  } catch (error: any) {
    console.error("Error al crear paciente:", error.response?.data || error);
    throw error;
  }
};

export const updatePatient = async (
  id: string,
  data: Patient,
  token: string
) => {
  try {
    await axios.put(`${API}/${id}`, data, getAuthHeader(token));
  } catch (error: any) {
    console.error(
      "Error al actualizar el paciente",
      error.response?.data || error
    );
    throw error;
  }
};

export const deletePatient = async (id: string, token: string) => {
  try {
    await axios.delete(`${API}/${id}`, getAuthHeader(token));
  } catch (error: any) {
    console.error(
      "Error al eliminar el paciente:",
      error.response?.data || error
    );
    throw error;
  }
};
