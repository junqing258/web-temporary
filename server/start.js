const path = require('path');
const crypto = require('crypto');
const babelConfig = require('./babel.config');
const webpack = require('webpack');
const webpackConfig = require('../scripts/webpack.server');
// const { createFsFromVolume, Volume } = require('memfs');

require('@babel/register')({
  ...babelConfig,
  extensions: ['.ts', '.tsx', '.jsx', '.js'],
  cache: true,
  ignore: null,
});

global.__webpack_hash__ = crypto
  .createHash('sha1')
  .update('' + Date.now())
  .digest('hex');
global.dynamicImport = (pathStr) => require(pathStr).default;

require.extensions[('.less', '.css')] = () => void 0;
require.extensions[('.svg', '.svga', '.png', '.jpg', 'gif')] = () => void 0;

require('node-require-alias').setAlias({
  '@': path.join(__dirname, '../src'),
});
// css 的转码 hook
/* require('css-modules-require-hook')({
  extensions: ['.css', '.less'],
  preprocessCss: (data, filename) =>
    require('less').renderSync({
      data,
      file: filename,
    }).css,
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]',
}); */
// module-alias
/* require('asset-require-hook')({
  extensions: ['svg', 'css', 'less', 'scss', 'jpg', 'png', 'gif'],
  name: '/assets/[name].[ext]',
});
 */

(async () => {
  /* const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    
  }); */
  require('./server');
})();
