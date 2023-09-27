module.exports = {
  preset: 'jest-preset-angular', 
  roots: ['<rootDir>/src'], 
  testMatch: ['**/*.spec.ts'], 
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    // Configura mapeo para archivos CSS y assets si es necesario
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/assets-transformer.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
      '^config$': '<rootDir>/config.ts', 
      '^src/app/services/get-data.service$': '<rootDir>/src/app/services/get-data.service.ts',
      '^@app/(.*)$': '<rootDir>/src/app/$1'
  },
};

