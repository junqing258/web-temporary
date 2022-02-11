const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-plugin');
const commonConfig = require('./webpack.config.js');

process.env.NODE_ENV = 'development';
process.env.DEV_SERVER = true;

const config = merge(commonConfig, {
  plugins: [new ReactRefreshPlugin(), new FriendlyErrorsPlugin()],
});

const port = 7010;

const options = {
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  historyApiFallback: true,
  openPage: `http://${require('os').hostname().toLowerCase()}:${port}/`,
  disableHostCheck: true,
  /* watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  }, */
  contentBase: './dist',
  stats: 'errors-only',
  overlay: true,
  clientLogLevel: 'warning', // 控制台提示信息级别是 warning 以
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, '0.0.0.0', () => {
  console.log(`dev server listening on port ${port}`);
});
