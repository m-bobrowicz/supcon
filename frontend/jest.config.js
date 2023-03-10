module.exports = {
  preset: "jest-preset-angular",
  moduleDirectories: ["node_modules", "."],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
};
