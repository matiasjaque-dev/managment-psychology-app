import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app.js";
import { Patient } from "../../models/Patient.model.js";
import { generateToken, getAuthHeader } from "../setup.js";

let mongoServer;
let psychologistToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // 🔧 cerrar conexión previa (evita errores "openUri on active connection")
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri, { dbName: "test" });

  // Generar token de psicólogo para las pruebas
  psychologistToken = generateToken({
    id: "psych123",
    role: "psychologist",
    name: "Test Psychologist",
  });
});

afterEach(async () => {
  // 🧹 limpiar la base de datos entre tests
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Patients Integration Test", () => {
  it("✅ crea un nuevo paciente", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set(getAuthHeader(psychologistToken))
      .send({
        name: "Test Patient",
        email: "patient@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Patient created successfully");

    const patients = await Patient.find();
    expect(patients.length).toBe(1);
    expect(await bcrypt.compare("123456", patients[0].password)).toBe(true);
  });

  it("✅ obtiene todos los pacientes", async () => {
    await Patient.create([
      { name: "P1", email: "p1@test.com", password: "123" },
      { name: "P2", email: "p2@test.com", password: "456" },
    ]);

    const res = await request(app)
      .get("/api/patients")
      .set(getAuthHeader(psychologistToken));

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);

    // Verificar que ambos pacientes están presentes sin importar el orden
    const names = res.body.map((p) => p.name);
    expect(names).toContain("P1");
    expect(names).toContain("P2");
  });

  it("✅ obtiene un paciente por id", async () => {
    const patient = await Patient.create({
      name: "Unique",
      email: "unique@test.com",
      password: "abc",
    });

    const res = await request(app)
      .get(`/api/patients/${patient._id}`)
      .set(getAuthHeader(psychologistToken));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Unique");
  });

  it("✅ actualiza un paciente", async () => {
    const patient = await Patient.create({
      name: "Old Name",
      email: "old@test.com",
      password: await bcrypt.hash("oldpass", 10),
    });

    const res = await request(app)
      .put(`/api/patients/${patient._id}`)
      .set(getAuthHeader(psychologistToken))
      .send({ name: "New Name", password: "newpass" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "New Name");

    const updated = await Patient.findById(patient._id);
    expect(await bcrypt.compare("newpass", updated.password)).toBe(true);
  });

  it("✅ elimina (soft delete) un paciente", async () => {
    const patient = await Patient.create({
      name: "Delete Me",
      email: "delete@test.com",
      password: "123",
      isActive: true,
    });

    const res = await request(app)
      .delete(`/api/patients/${patient._id}`)
      .set(getAuthHeader(psychologistToken));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("isActive", false);

    const deleted = await Patient.findById(patient._id);
    expect(deleted.isActive).toBe(false);
  });
});
