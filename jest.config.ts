import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  testEnvironment: 'allure-jest/node',

  testEnvironmentOptions: {
    resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results'
  },

  roots: [
    '<rootDir>/tests'
  ],

  testMatch: [
    '**/*.test.ts'
  ],

  clearMocks: true,

  verbose: true,

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts'
  ]
};

export default config;