const path = require('path');

module.exports = {
    roots: ['<rootDir>/'],
    rootDir: path.join(__dirname, '../..'),
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    },
    transformIgnorePatterns: ["/node_modules/(?!(xxxx.*?\\.js$))"],
    testPathIgnorePatterns : ["/node_modules/"],
    testRegex: ["(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$"],
    modulePaths: [],
    moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        'src/(.*)$': '<rootDir>/src/$1',
    },
    automock : false,
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            diagnostics: true,
        },
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/index.tsx',
        '!src/**/*.d.ts',
    ],
    coveragePathIgnorePatterns: ['./src/*/*.types.{ts,tsx}'],
    coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
    coverageThreshold: {
        global: {
            statements: 95,
            branches  : 95,
            lines     : 95,
            functions : 95,
        },
    },
};
