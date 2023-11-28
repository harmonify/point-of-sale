const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig');

module.exports = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testTimeout: 30000,
  testRegex: '.*\\..*spec\\.ts$',
  globalSetup: '<rootDir>/test/setup.ts',
  globalTeardown: '<rootDir>/test/teardown.ts',
  setupFilesAfterEnv: ["<rootDir>/test/setupBeforeEachTestFile.ts"],
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@/*': ['./src/*'],
      '@test/*': ['./test/*'],
    },
    {
      prefix: '<rootDir>',
    },
  ),
  modulePaths: ['<rootDir>'],
};
