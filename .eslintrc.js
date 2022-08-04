module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-throw-literal': 0,
  },
  ignorePatterns: ['**/node_modules/**', '.eslintrc.js']
};
