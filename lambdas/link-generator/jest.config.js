/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts"],
  testPathIgnorePatterns: ["dist/"],
  testEnvironment: "node",

  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["text", "cobertura", "lcov"],
  coverageDirectory: "<rootDir>/tests/coverage",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
/* eslint-enable */