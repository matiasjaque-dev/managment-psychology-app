// auth.unit.test.js
import { jest } from "@jest/globals";

// Configurar variable de entorno para tests
process.env.JWT_SECRET = "test-secret-key";

// Mocks como funciones reusables
const mockFindOnePsychologist = jest.fn();
const mockFindOnePatient = jest.fn();
const mockBcryptCompare = jest.fn();
const mockJwtSign = jest.fn();

// Decimos a Jest que, cada vez que alguien importe el modelo,
// lo que reciba sea nuestro objeto mock
jest.unstable_mockModule("../../models/psychologist.model.js", () => ({
  Psychologist: { findOne: mockFindOnePsychologist },
}));

jest.unstable_mockModule("../../models/Patient.model.js", () => ({
  Patient: { findOne: mockFindOnePatient },
}));

// Mocks para bcrypt y jwt - usando las funciones mock creadas arriba
jest.unstable_mockModule("bcrypt", () => ({
  compare: mockBcryptCompare,
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  sign: mockJwtSign,
}));

// Importamos el controller de manera dinámica
const { login } = await import("../../controllers/auth.controller.js");

// Helpers para mock de req/res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller - Unit", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver 404 si no encuentra usuario ni paciente", async () => {
    mockFindOnePsychologist.mockResolvedValue(null);
    mockFindOnePatient.mockResolvedValue(null);

    const req = { body: { email: "test@test.com", password: "1234" } };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Usuario no encontrado" })
    );
  });

  it("debería devolver 200 y token si login es correcto", async () => {
    const fakeUser = {
      _id: "123",
      role: "psychologist",
      name: "Test",
      email: "test@test.com",
      password: "hashedpass",
      isActive: true,
    };

    mockFindOnePsychologist.mockResolvedValue(fakeUser);
    mockFindOnePatient.mockResolvedValue(null);

    // Configurar mocks para que devuelvan valores correctos
    mockBcryptCompare.mockResolvedValue(true);
    mockJwtSign.mockReturnValue("fake-jwt");

    const req = { body: { email: "test@test.com", password: "1234" } };
    const res = mockResponse();

    await login(req, res);

    // Verificaciones
    expect(mockBcryptCompare).toHaveBeenCalledWith("1234", "hashedpass");
    expect(mockJwtSign).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "123",
        role: "psychologist",
        name: "Test",
      }),
      "test-secret-key",
      { expiresIn: "2h" }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "fake-jwt",
        user: expect.objectContaining({ email: "test@test.com" }),
      })
    );
  });

  it("debería devolver 401 si la contraseña es incorrecta", async () => {
    const fakeUser = {
      _id: "123",
      role: "psychologist",
      name: "Test",
      email: "test@test.com",
      password: "hashedpass",
      isActive: true,
    };

    mockFindOnePsychologist.mockResolvedValue(fakeUser);
    mockFindOnePatient.mockResolvedValue(null);

    // Configurar bcrypt para que devuelva false (contraseña incorrecta)
    mockBcryptCompare.mockResolvedValue(false);

    const req = { body: { email: "test@test.com", password: "wrongpassword" } };
    const res = mockResponse();

    await login(req, res);

    expect(mockBcryptCompare).toHaveBeenCalledWith(
      "wrongpassword",
      "hashedpass"
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Contraseña incorrecta" })
    );
  });
});
