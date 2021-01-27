const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dev = process.env.NODE_ENV !== 'production';
const root = path.resolve(__dirname, '../');

const NPMPackage = require(path.join(root, 'package.json'));

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {
    main: path.join(root, 'src/index'),
  },
  target: 'web',
  devtool: dev ? 'source-map' : false,
  output: {
    // publicPath: 'http://localhost:5000/',
    publicPath: dev ? '/' : '',
    path: path.resolve(root, './dist'),
    /* library: 'web-saba', */
    /* libraryTarget: 'umd', */
    filename: dev ? 'js/[name].js' : 'js/[name].[fullhash:6].js',
    chunkFilename: dev ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-router-dom': 'window.ReactRouterDOM',
    i18next: 'window.i18next',
  },
  optimization: {
    minimize: !dev,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: 20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'saua',
      filename: `${NPMPackage.version}/remoteEntry.js`,
      remotes: {},
      exposes: {
        './BasicLayout': '@/components/BasicLayout',
        './platform': '@/utils/platform',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    new webpack.DefinePlugin({
      __DEV__: dev,
    }),
    new webpack.BannerPlugin({
      banner: ['\thash:[fullhash]', 'chunkhash:[chunkhash]', 'name:[name]', 'author:junqing'].join('\n\t'),
    }),
    new WebpackBar({ color: dev ? 'green' : '#03a9f4' }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: path.join(root, 'src/**/*.{ts,tsx,js,jsx}'),
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/favicon.ico',
          to: 'favicon.ico',
        },
        { from: 'public/locales', to: 'locales' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: dev ? 'css/[name].css' : 'css/[name].[contenthash:6].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // filename: 'views/index.html',
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [path.join(root, 'src'), path.join(root, 'server')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.join(root, 'babel.config.js'),
        },
      },
      {
        test: /Routes\.tsx$/,
        include: path.join(root, 'src'),
        loader: 'string-replace-loader',
        options: {
          search: 'dynamicImport[(](.*)[)]',
          replace: (match, p1) => (dev ? `require(${p1}).default` : `React.lazy(() => import(${p1}))`),
          flags: 'g',
        },
      },
      {
        test: /\.(css|less)$/i,
        include: [path.join(root, 'src'), path.join(root, 'server'), /node_modules[\\/](@reach).*/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: dev ? '[path][name]__[local]' : '[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, '../src'),
              },
              // esModule: true,
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: dev ? 'assets/images/[name].[ext]' : 'assets/images/[name].[contenthash:6].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: dev ? 'assets/fonts/[name].[ext]' : 'assets/fonts/[name].[contenthash:6].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.join(root, 'src'), path.join(root, 'node_modules')],
    alias: {
      'react-native': 'react-native-web',
      '@': path.join(root, 'src'),
    },
  },
};
