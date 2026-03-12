module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/lab2', '<rootDir>/src'],
    testMatch: [
        '**/tests/lab2/**/*.test.ts',
        '**/tests/lab2/**/*.spec.ts'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'src/lib/**/*.{ts,tsx}',
        '!src/lib/**/*.d.ts',
        '!src/lib/**/*.test.ts',
        '!src/lib/**/*.spec.ts',
    ],
    coverageDirectory: 'coverage/lab2',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
