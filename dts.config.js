module.exports = {
  rollup: (config, options) => {
    config.input = './src/index.ts';
    config.output = [
      {
        file: 'dist/index.js',
        format: 'es',
      },
    ];
    return config;
  },
};
