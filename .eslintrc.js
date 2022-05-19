module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-throw-literal': 0,
  },
  ignorePatterns: ['**/node_modules/**', '.eslintrc.js']
};
