module.exports = {
  extends: '@alkem/eslint-config-alkemics',
  settings: { jest: { version: 26 } },
  overrides: [
    {
      files: ['src/**/*.js'],
      env: { node: false, browser: true },
      globals: { document: 'readonly' },
      rules: {
        'no-console': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.js'],
      env: { node: true, browser: false },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['src/bootstrap.js'],
      env: { node: false, browser: true },
      globals: { System: 'readonly' },
    },
  ],
};
