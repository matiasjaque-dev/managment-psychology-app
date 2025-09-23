import { jest } from "@jest/globals";

describe("Patient Testing - Unit", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("create patient", async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    const mockHash = jest.fn().mockResolvedValue("hashedPassword");

    jest.unstable_mockModule("../../models/Patient.model.js", () => ({
      Patient: jest.fn().mockImplementation(() => ({
        save: mockSave,
      })),
    }));

    jest.unstable_mockModule("bcrypt", () => ({
      default: { hash: mockHash },
    }));

    const { createPatient } = await import(
      "../../controllers/patient.controller.js"
    );

    //arrenge
    const req = { body: { name: "Test Patient", password: "1234" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    //act
    await createPatient(req, res);

    //assert
    expect(mockHash).toHaveBeenCalledWith("1234", 10);
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Patient created successfully" })
    );
  });

  it("get all patients", async () => {
    const mockPatients = [{ name: "Patient1" }, { name: "Patient2" }];
    const mockFind = jest.fn().mockResolvedValue(mockPatients);

    jest.unstable_mockModule("../../models/Patient.model.js", () => ({
      Patient: { find: mockFind },
    }));

    const { getAllPatients } = await import(
      "../../controllers/patient.controller.js"
    );

    //arrenge
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    //act
    await getAllPatients(req, res);

    //assert
    expect(mockFind).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockPatients);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("get patient by id", async () => {
    const mockPatient = { name: "Patient1" };
    const mockFindById = jest.fn().mockResolvedValue(mockPatient);

    jest.unstable_mockModule("../../models/Patient.model.js", () => ({
      Patient: { findById: mockFindById },
    }));

    const { getPatientById } = await import(
      "../../controllers/patient.controller.js"
    );

    //arrenge
    const req = { params: { id: "some-id" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    //act
    await getPatientById(req, res);

    //assert
    expect(mockFindById).toHaveBeenCalledWith("some-id");
    expect(res.json).toHaveBeenCalledWith(mockPatient);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("update patient", async () => {
    const mockPatient = { name: "Patient1", password: "oldHashed" };
    const mockUpdatedPatient = {
      name: "Updated Patient",
      password: "newHashed",
    };
    const mockFindById = jest.fn().mockResolvedValue(mockPatient);
    const mockFindByIdAndUpdate = jest
      .fn()
      .mockResolvedValue(mockUpdatedPatient);
    const mockHash = jest.fn().mockResolvedValue("newHashed");

    jest.unstable_mockModule("../../models/Patient.model.js", () => ({
      Patient: {
        findById: mockFindById,
        findByIdAndUpdate: mockFindByIdAndUpdate,
      },
    }));

    jest.unstable_mockModule("bcrypt", () => ({
      default: { hash: mockHash },
    }));

    const { updatePatient } = await import(
      "../../controllers/patient.controller.js"
    );

    //arrenge
    const req = {
      params: { id: "some-id" },
      body: { name: "Updated Patient", password: "newPassword" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    //act
    await updatePatient(req, res);

    //assert
    expect(mockFindById).toHaveBeenCalledWith("some-id");
    expect(mockHash).toHaveBeenCalledWith("newPassword", 10);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "some-id",
      { name: "Updated Patient", password: "newHashed" },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(mockUpdatedPatient);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deletePatient", async () => {
    const mockFindByIdAndUpdate = jest
      .fn()
      .mockResolvedValue({ isActive: false });

    jest.unstable_mockModule("../../models/Patient.model.js", () => ({
      Patient: { findByIdAndUpdate: mockFindByIdAndUpdate },
    }));

    const { deletePatient } = await import(
      "../../controllers/patient.controller.js"
    );

    const req = { params: { id: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deletePatient(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { isActive: false },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith({ isActive: false });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
