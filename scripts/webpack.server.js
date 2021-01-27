const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.config');

const dev = process.env.NODE_ENV !== 'production';
const root = path.resolve(__dirname, '../');

const serverConfig = {
  ...config,
  mode: 'development',
  resolve: config.resolve,
  target: 'node',
  entry: {
    main: path.join(root, 'src/AppSSR.tsx'),
  },
  devtool: false,
  output: {
    // publicPath: '/dist/',
    path: path.join(root, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'ssr/[name].js',
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: dev,
    }),
    new WebpackBar({ color: dev ? 'green' : '#03a9f4' }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [path.join(root, 'src'), path.join(root, 'server')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: false,
          configFile: path.join(root, 'babel.config.js'),
        },
      },
      {
        test: /Routes\.tsx$/,
        include: path.join(root, 'src'),
        loader: 'string-replace-loader',
        options: {
          search: 'dynamicImport[(](.*)[)]',
          replace: (match, p1) => (true ? `require(${p1}).default` : `React.lazy(() => import(${p1}))`),
          flags: 'g',
        },
      },
      {
        test: /\.(css|less)$/i,
        include: [path.join(root, 'src'), path.join(root, 'server'), /node_modules[\\/](@reach).*/],
        use: [
          /* {
            loader: MiniCssExtractPlugin.loader,
          }, */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: dev ? '[path][name]__[local]' : '[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, '../src'),
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(),
                require('postcss-plugin-px2rem')({
                  rootValue: 75,
                  minPixelValue: 1,
                  exclude: /node_modules|\.pc\.less/i,
                  selectorBlackList: [/.*--pc/, /^((?!(--m|mobile)).)*$/],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['ignore-loader'],
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: ['ignore-loader'],
      },
    ],
  },
};

module.exports = serverConfig; //merge(config, serverConfig);
