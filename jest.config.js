module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/coverage/', '<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/scripts/'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/jest/fileTransformer.js',
  },
  testMatch: ['<rootDir>/src/__tests__/**/?(*.)(spec|test).ts?(x)'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  // setupFiles: ['<rootDir>/src/__tests__/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.js'],
  // preset: 'jest-puppeteer',
  // testEnvironment: "jest-environment-puppeteer",
  // testRegex: './*\\.e2e\\.js$',
};
