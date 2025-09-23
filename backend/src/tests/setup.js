// src/tests/setup.js
import { jest } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

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
