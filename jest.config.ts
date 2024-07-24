import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: "jsdom",
  testMatch: ['**/*.test.*'],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};

export default config;


