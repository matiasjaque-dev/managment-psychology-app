import axios from "axios";
import type { Session } from "../types/Session";

const API = "http://localhost:4000/api/sessions";

const getAuthHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 📌 Obtener todas las sesiones (requiere token - solo para psicólogos/admin)
export const getAllSessions = async (token: string) => {
  try {
    const res = await axios.get(API, getAuthHeader(token));
    return res.data;
  } catch (error: any) {
    console.error("Error al obtener sesiones:", error.response?.data || error);
    throw error;
  }
};

// 📌 Crear sesión
export const createSession = async (data: Session, token?: string) => {
  try {
    const headers = token ? getAuthHeader(token) : {};
    const res = await axios.post(API, data, headers);
    return res.data;
  } catch (error: any) {
    console.error("Error al crear sesión:", error.response?.data || error);
    throw error;
  }
};

// 📌 Actualizar sesión
export const updateSession = async (
  id: string,
  data: Partial<Session>,
  token: string
) => {
  try {
    await axios.put(`${API}/${id}`, data, getAuthHeader(token));
  } catch (error: any) {
    console.error("Error al actualizar sesión:", error.response?.data || error);
    throw error;
  }
};

// 📌 Eliminar (soft delete)
export const deleteSession = async (id: string, token: string) => {
  try {
    await axios.delete(`${API}/${id}`, getAuthHeader(token));
  } catch (error: any) {
    console.error("Error al eliminar sesión:", error.response?.data || error);
    throw error;
  }
};
