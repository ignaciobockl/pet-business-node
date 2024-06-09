import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['!**/node_modules/**'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  verbose: true,
};

export default config;
