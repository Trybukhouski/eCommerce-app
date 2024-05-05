/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "50%",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The root directory that Jest should scan for tests and modules within
  rootDir: './src',

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: "./coverage",

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/.d.ts'
  ],
  
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './mocks/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },

  // If you are building a web app, you can use a browser-like environment through jsdom instead
  testEnvironment: 'jsdom',
};

export default config;
