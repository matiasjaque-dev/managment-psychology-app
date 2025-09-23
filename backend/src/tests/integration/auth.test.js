import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import * as bcrypt from "bcrypt";

let mongoServer;
let app;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret"; // <- necesario
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test" });

  // Importar app después de configurar env
  app = (await import("../../app.js")).default;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const { Psychologist } = await import("../../models/psychologist.model.js");
  await Psychologist.deleteMany();
});

describe("Auth Integration Test", () => {
  it("login correcto", async () => {
    const { Psychologist } = await import("../../models/psychologist.model.js");
    const hashedPassword = await bcrypt.hash("1234", 10);
    await Psychologist.create({
      name: "Test",
      email: "test@test.com",
      password: hashedPassword,
      role: "psychologist",
      isActive: true,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@test.com");
    expect(res.body.token).toBeDefined();
  });

  it("usuario no existe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "noexiste@test.com", password: "1234" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Usuario no encontrado");
  });
});
