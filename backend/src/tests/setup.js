// src/tests/setup.js
import { jest } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Configurar variables de entorno para tests
process.env.JWT_SECRET = "test_secret_key_for_testing";
process.env.NODE_ENV = "test";

let mongoServer;

// Helper functions para tests
export const generateToken = (userData) => {
  const { id = "123", role = "admin", name = "Test User" } = userData;
  return jwt.sign({ id, role, name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Configuración global para todos los tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Limpiar DB después de cada test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  // Limpiar mocks - solo para tests de integración
  // Para tests unitarios, cada archivo maneja sus propios mocks
  if (expect.getState().currentTestName?.includes("integration")) {
    jest.clearAllMocks();
    jest.resetModules();
  }
});
