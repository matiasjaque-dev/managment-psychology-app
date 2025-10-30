import axios from "axios";
import type { Psychologist } from "../types/psychologist";
import { API_BASE_URL } from "../config/api";
//import { useAuth } from "../context/AuthContext";

const API = `${API_BASE_URL}/psychologists`;

// Crea una función para obtener headers con el token
const getAuthHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Función usando token y try/catch
export const getAllPsychologists = async (token: string) => {
  try {
    const res = await axios.get(API, getAuthHeader(token));
    return res.data;
  } catch (error: any) {
    console.error(
      "Error al obtener psicólogos:",
      error.response?.data || error
    );
    throw error;
  }
};

// Función pública para pacientes (no requiere token)
export const getPublicPsychologists = async () => {
  try {
    const res = await axios.get(`${API}/public`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error al obtener psicólogos públicos:",
      error.response?.data || error
    );
    throw error;
  }
};

export const getPsychologistById = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API}/${id}`, getAuthHeader(token));
    return res.data;
  } catch (error: any) {
    console.error("Error al obtener psicólogo:", error.response?.data || error);
    throw error;
  }
};

// Las otras también deberían recibir `token` y usar `getAuthHeader(token)`

export const createPsychologist = async (data: Psychologist, token: string) => {
  try {
    await axios.post(API, data, getAuthHeader(token));
  } catch (error: any) {
    console.error("Error al crear psicólogo:", error.response?.data || error);
    throw error;
  }
};

export const updatePsychologist = async (
  id: string,
  data: Psychologist,
  token: string
) => {
  try {
    await axios.put(`${API}/${id}`, data, getAuthHeader(token));
  } catch (error: any) {
    console.error(
      "Error al actualizar psicólogo:",
      error.response?.data || error
    );
    throw error;
  }
};

export const deletePsychologist = async (id: string, token: string) => {
  try {
    await axios.delete(`${API}/${id}`, getAuthHeader(token));
  } catch (error: any) {
    console.error(
      "Error al eliminar psicólogo:",
      error.response?.data || error
    );
    throw error;
  }
};
