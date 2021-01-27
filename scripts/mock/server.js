const path = require('path');
const chalk = require('chalk');
const argv = require('node-argv');
const glob = require('glob');
const apiMocker = require('mocker-api');
const cors = require('cors');

const args = argv(process.argv.slice(2), {});
const { mock, proxy } = args.options || {};

module.exports = (app) => {
  app.use(cors());
  app.options('*', cors());
  let options = {},
    mockerFile = [];
  if (mock) {
    console.log('\n\t', chalk.bgCyan(' Mocker Server '), '\n');
    const files = glob.sync(path.join(__dirname, './mock/**.js'));
    mockerFile.push(...files);
  }
  if (proxy) {
    options = {
      proxy: {
        '/api/(.*)': 'http://api.bitgame.com/',
      },
      changeHost: true,
      pathRewrite: {
        '^/api/': '/',
      },
    };
  }

  apiMocker(app, mockerFile, options);
};
