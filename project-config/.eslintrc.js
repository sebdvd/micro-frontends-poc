module.exports = {
  extends: require.resolve('./eslint.config'),
  overrides: [
    {
      files: ['react-utils.js', 'css.js'],
      env: { node: false, browser: true },
    },
    {
      files: ['mfe-component.js', 'react-utils.js', 'css.js'],
      env: { node: false, browser: true },
      globals: { document: 'readonly' },
      rules: {
        'no-console': 'off',
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
