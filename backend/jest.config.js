export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/tests/**", "!src/index.js"],
};
