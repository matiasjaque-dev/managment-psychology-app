import { API_BASE_URL } from "../config/api";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    return await response.json();
  } catch (error: any) {
    return { error: error?.message || "Error desconocido" };
  }
};
