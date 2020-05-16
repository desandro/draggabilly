/* eslint-env node */

module.exports = {
  plugins: [ 'metafizzy' ],
  extends: 'plugin:metafizzy/browser',
  env: {
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  globals: {
    Draggabilly: 'readonly',
    QUnit: 'readonly',
  },
  rules: {
    'no-var': 'off',
    'id-length': 'off',
  },
  ignorePatterns: [
    'bower_components/',
  ],
};
