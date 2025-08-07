import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: "admin" | "psychologist";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const decoded: DecodedToken = jwtDecode(parsed.token);

      if (decoded.exp * 1000 < Date.now()) {
        setUser(null);
        localStorage.removeItem("user");
      } else {
        setUser(parsed);
      }
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log("llega al logout");
    localStorage.removeItem("user");
    setUser(null);
    <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
