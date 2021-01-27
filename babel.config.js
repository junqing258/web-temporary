module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    ['@babel/preset-typescript'],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    process.env.DEV_SERVER && ['react-refresh/babel'],
    ['@babel/plugin-transform-modules-commonjs'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-transform-async-to-generator'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ].filter(Boolean),
};
