import { jest } from "@jest/globals";

// Mock de bcrypt
jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn().mockResolvedValue("hashed_password"),
  },
}));

// Mock de modelo Psychologist
const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.unstable_mockModule("../../models/psychologist.model.js", () => {
  function Psychologist(data) {
    return { ...data, save: mockSave };
  }

  // añadir métodos estáticos al constructor
  Psychologist.find = mockFind;
  Psychologist.findById = mockFindById;
  Psychologist.findByIdAndUpdate = mockFindByIdAndUpdate;

  return { Psychologist };
});

// Import dinámico después de mocks
const {
  createPsychologist,
  getAllPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
} = await import("../../controllers/psychologist.controller.js");

describe("Psychologist Controller - Unit", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should create a psychologist and return 201", async () => {
    const req = { body: { name: "John", password: "123" } };
    await createPsychologist(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Psychologist created successfully",
    });
  });

  it("should return all psychologists", async () => {
    const mockPsychs = [{ name: "John" }, { name: "Jane" }];
    mockFind.mockResolvedValue(mockPsychs);

    await getAllPsychologists({}, res);

    expect(mockFind).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPsychs);
  });

  it("should return a psychologist by id", async () => {
    const req = { params: { id: "123" } };
    const mockPsych = { id: "123", name: "John" };
    mockFindById.mockResolvedValue(mockPsych);

    await getPsychologistById(req, res);

    expect(mockFindById).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith(mockPsych);
  });

  it("should update psychologist and return new data", async () => {
    const req = {
      params: { id: "123" },
      body: { name: "Updated", password: "newpass" },
    };
    mockFindById.mockResolvedValue({ id: "123", password: "oldpass" });
    const updated = { id: "123", name: "Updated" };
    mockFindByIdAndUpdate.mockResolvedValue(updated);

    await updatePsychologist(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      expect.any(Object),
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it("should soft delete psychologist and return updated data", async () => {
    const req = { params: { id: "123" } };
    const deleted = { id: "123", isActive: false };
    mockFindByIdAndUpdate.mockResolvedValue(deleted);

    await deletePsychologist(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { isActive: false },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });
});
