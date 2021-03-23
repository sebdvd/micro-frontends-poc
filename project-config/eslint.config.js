module.exports = {
  extends: '@alkem/eslint-config-alkemics',
  settings: { jest: { version: 26 } },
  globals: {
    System: 'readonly',
    CSS_FILENAME: 'readonly',
    CSS_CLASSNAME: 'readonly',
    MODULE_NAME: 'readonly',
    ORG_NAME: 'readonly',
    PROJECT_NAME: 'readonly',
  },
  overrides: [
    {
      files: ['*.js'],
      env: { node: true, browser: false },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['src/**/*.js'],
      env: { node: false, browser: true },
      globals: { document: 'readonly' },
      rules: {
        'no-console': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
