import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../app.js";
import { Session } from "../../models/Session.model.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri, { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Session.deleteMany({});
});

describe("Session Integration Tests", () => {
  it("debería crear una sesión (POST /api/sessions)", async () => {
    const newSession = {
      patientName: "Juan Pérez",
      patientEmail: "juan@test.com",
      psychologistId: new mongoose.Types.ObjectId(),
      scheduledStart: "2025-01-01T09:00:00Z",
      price: 20000,
      notes: "Primera sesión",
    };

    const res = await request(app).post("/api/sessions").send(newSession);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Session created successfully");
    expect(res.body.session).toHaveProperty("price", 20000);
    expect(res.body.session).toHaveProperty("status", "pendiente");

    const sessionInDb = await Session.findOne({ price: 20000 });
    expect(sessionInDb).not.toBeNull();
  });

  it("debería obtener todas las sesiones (GET /api/sessions)", async () => {
    await Session.create([
      {
        patientName: "Test Patient 1",
        patientEmail: "patient1@test.com",
        psychologistId: new mongoose.Types.ObjectId(),
        scheduledStart: "2025-01-01T09:00:00Z",
        price: 20000,
      },
      {
        patientName: "Test Patient 2",
        patientEmail: "patient2@test.com",
        psychologistId: new mongoose.Types.ObjectId(),
        scheduledStart: "2025-01-02T09:00:00Z",
        price: 25000,
      },
    ]);

    const res = await request(app).get("/api/sessions");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("price");
  });

  it("debería obtener una sesión por ID (GET /api/sessions/:id)", async () => {
    const session = await Session.create({
      patientName: "Test Find Patient",
      patientEmail: "find@test.com",
      psychologistId: new mongoose.Types.ObjectId(),
      scheduledStart: "2025-02-01T09:00:00Z",
      price: 30000,
      notes: "Buscar por ID",
    });

    const res = await request(app).get(`/api/sessions/${session._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("price", 30000);
  });

  it("debería actualizar una sesión (PUT /api/sessions/:id)", async () => {
    const session = await Session.create({
      patientName: "Test Update Patient",
      patientEmail: "update@test.com",
      psychologistId: new mongoose.Types.ObjectId(),
      scheduledStart: "2025-03-01T09:00:00Z",
      price: 35000,
      notes: "Vieja nota",
    });

    const updatedData = { notes: "Nueva nota" };
    const res = await request(app)
      .put(`/api/sessions/${session._id}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("notes", "Nueva nota");

    const sessionInDb = await Session.findById(session._id);
    expect(sessionInDb.notes).toBe("Nueva nota");
  });

  it("debería hacer soft delete de una sesión (DELETE /api/sessions/:id)", async () => {
    const session = await Session.create({
      patientName: "Test Delete Patient",
      patientEmail: "delete@test.com",
      psychologistId: new mongoose.Types.ObjectId(),
      scheduledStart: "2025-04-01T09:00:00Z",
      price: 40000,
      isActive: true,
    });

    const res = await request(app).delete(`/api/sessions/${session._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("isActive", false);

    const sessionInDb = await Session.findById(session._id);
    expect(sessionInDb.isActive).toBe(false);
  });

  it("debería devolver 404 si la sesión no existe al buscarla", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/sessions/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});
