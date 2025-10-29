import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app.js";
import { Psychologist } from "../../models/psychologist.model.js";
import { generateToken, getAuthHeader } from "../setup.js";

let mongoServer;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri, { dbName: "test" });

  // Generar token de admin para las pruebas
  adminToken = generateToken({
    id: "admin123",
    role: "admin",
    name: "Test Admin",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Psychologist.deleteMany({});
});

describe("Psychologist Integration Tests", () => {
  it("debería crear un psicólogo (POST /api/psychologists)", async () => {
    const newPsych = {
      name: "Dr. Test",
      email: "dr@test.com",
      password: "123456",
      specialty: "Psicología clínica",
    };

    const res = await request(app)
      .post("/api/psychologists")
      .set(getAuthHeader(adminToken))
      .send(newPsych);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Psychologist created successfully"
    );

    const psychInDb = await Psychologist.findOne({ email: "dr@test.com" });
    expect(psychInDb).not.toBeNull();
    const isPasswordHashed = await bcrypt.compare("123456", psychInDb.password);
    expect(isPasswordHashed).toBe(true);
  });

  it("debería obtener todos los psicólogos (GET /api/psychologists)", async () => {
    await Psychologist.create([
      { name: "Dr. Uno", email: "uno@test.com", password: "hash1" },
      { name: "Dr. Dos", email: "dos@test.com", password: "hash2" },
    ]);

    const res = await request(app)
      .get("/api/psychologists")
      .set(getAuthHeader(adminToken));

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("email");
  });

  it("debería obtener un psicólogo por ID (GET /api/psychologists/:id)", async () => {
    const psych = await Psychologist.create({
      name: "Buscar ID",
      email: "buscar@test.com",
      password: "123456",
    });

    const res = await request(app)
      .get(`/api/psychologists/${psych._id}`)
      .set(getAuthHeader(adminToken));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "buscar@test.com");
  });

  it("debería actualizar un psicólogo (PUT /api/psychologists/:id)", async () => {
    const psych = await Psychologist.create({
      name: "Old Name",
      email: "old@test.com",
      password: await bcrypt.hash("oldpass", 10),
      specialty: "General",
    });

    const updatedData = { name: "New Name", password: "newpass" };

    const res = await request(app)
      .put(`/api/psychologists/${psych._id}`)
      .set(getAuthHeader(adminToken))
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "New Name");

    const psychInDb = await Psychologist.findById(psych._id);
    const passwordChanged = await bcrypt.compare("newpass", psychInDb.password);
    expect(passwordChanged).toBe(true);
  });

  it("debería hacer soft delete de un psicólogo (DELETE /api/psychologists/:id)", async () => {
    const psych = await Psychologist.create({
      name: "Dr. To Delete",
      email: "delete@test.com",
      password: "123456",
      isActive: true,
    });

    const res = await request(app)
      .delete(`/api/psychologists/${psych._id}`)
      .set(getAuthHeader(adminToken));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("isActive", false);

    const psychInDb = await Psychologist.findById(psych._id);
    expect(psychInDb.isActive).toBe(false);
  });

  it("debería devolver 404 si el psicólogo no existe al buscarlo", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/psychologists/${fakeId}`)
      .set(getAuthHeader(adminToken));
    expect(res.statusCode).toBe(404);
  });
});
