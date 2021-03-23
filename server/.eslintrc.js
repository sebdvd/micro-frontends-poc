module.exports = {
  extends: require.resolve('@alkem/front-project-config/eslint.config'),
  overrides: [
    {
      files: ['server.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
