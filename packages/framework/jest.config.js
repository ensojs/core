const path = require('path')

module.exports = {
  verbose: true,
  rootDir: path.join(__dirname, './'),
  roots: [
    path.join(__dirname, './src')
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/utils"
  ]
}
