module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css'
    }
};
