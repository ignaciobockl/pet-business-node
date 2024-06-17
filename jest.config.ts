import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json', 'clover'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/config/setupTests.ts'],
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts', '**/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  verbose: true,
};

export default config;
