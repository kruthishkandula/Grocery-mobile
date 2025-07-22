module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@atom': './app/components/atom',
            '@molecule': './app/components/molecule',
            '@': './app',
          },
        },
      ],
    ],
  };
};