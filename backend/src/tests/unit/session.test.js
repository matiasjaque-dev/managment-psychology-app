// src/tests/unit/session.test.js
import { jest } from "@jest/globals";

// Mocks del modelo Session
const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

// Helper para simular .populate() -> Promise.resolve(result)
const makePopulateChain = (result) => {
  const populate = jest.fn().mockResolvedValue(result);
  return { populate };
};

jest.unstable_mockModule("../../models/Session.model.js", () => {
  function Session(data) {
    return { ...data, save: mockSave };
  }
  Session.find = mockFind;
  Session.findById = mockFindById;
  Session.findByIdAndUpdate = mockFindByIdAndUpdate;

  return { Session };
});

// Import dinámico después de definir los mocks
const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = await import("../../controllers/Session.controller.js");

describe("Session Controller - Unit", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should create a session and return 201", async () => {
    // Simular que save resuelve correctamente
    mockSave.mockResolvedValueOnce({ _id: "1", title: "Therapy Session" });

    const req = { body: { title: "Therapy Session", date: "2024-01-01" } };
    await createSession(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Session created successfully",
        session: expect.objectContaining({ title: "Therapy Session" }),
      })
    );
  });

  it("should return all sessions", async () => {
    const mockSessions = [{ title: "Session1" }, { title: "Session2" }];
    // Session.find().populate() -> mock chain
    const { populate } = makePopulateChain(mockSessions);
    mockFind.mockReturnValueOnce({ populate });

    await getAllSessions({}, res);

    expect(mockFind).toHaveBeenCalled();
    expect(populate).toHaveBeenCalled(); // populate fue llamada
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSessions);
  });

  it("should return session by id", async () => {
    const mockSession = { _id: "some-id", title: "Session1" };
    const { populate } = makePopulateChain(mockSession);
    mockFindById.mockReturnValueOnce({ populate });

    const req = { params: { id: "some-id" } };
    await getSessionById(req, res);

    expect(mockFindById).toHaveBeenCalledWith("some-id");
    expect(populate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSession);
  });

  it("should update a session and return updated", async () => {
    const mockUpdatedSession = { _id: "some-id", title: "Updated Session" };
    mockFindByIdAndUpdate.mockResolvedValueOnce(mockUpdatedSession);

    const req = {
      params: { id: "some-id" },
      body: { title: "Updated Session" },
    };
    await updateSession(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("some-id", req.body, {
      new: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedSession);
  });

  it("should soft delete a session and return updated", async () => {
    const mockDeletedSession = { _id: "some-id", isActive: false };
    mockFindByIdAndUpdate.mockResolvedValueOnce(mockDeletedSession);

    const req = { params: { id: "some-id" } };
    await deleteSession(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "some-id",
      { isActive: false },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeletedSession);
  });
});
