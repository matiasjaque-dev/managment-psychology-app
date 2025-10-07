import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app.js";
import { Psychologist } from "../../models/psychologist.model.js";

let mongoServer;

beforeAll(async () => {
  process.env.JWT_SECRET = "test_secret_key";

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // 👇 Forzar cierre de conexión previa
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri, { dbName: "test" });
});

afterEach(async () => {
  // 👇 Limpiar la DB entre tests
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth Integration Test", () => {
  it("usuario no existe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@test.com", password: "123456" });

    expect(res.statusCode).toBe(404);
  });

  it("login correcto", async () => {
    const passwordHash = await bcrypt.hash("123456", 10);

    await Psychologist.create({
      name: "Dr. Test",
      email: "test@test.com",
      password: passwordHash,
      role: "psychologist",
      isActive: true,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({
      email: "test@test.com",
      role: "psychologist",
      name: "Dr. Test",
    });
  });

  it("contraseña incorrecta", async () => {
    const passwordHash = await bcrypt.hash("123456", 10);

    await Psychologist.create({
      name: "Dr. Test",
      email: "test2@test.com",
      password: passwordHash,
      role: "psychologist",
      isActive: true,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test2@test.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });
});
