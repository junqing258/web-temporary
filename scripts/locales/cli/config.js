const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

const langs = ['zh-Hans', 'en', 'ja', 'ko', 'vi', 'zh-Hant'];
const headers = ['translationId', ...langs, 'description'];
const output = path.resolve(__dirname, '../../../public/locales/');
const exportDir = './dist/';
const packages = glob.sync('./public/locales/zh-Hans/**/**.json').map((v) => path.parse(v).name);

const config = {
  langs,
  headers,
  output,
  packages,
  exportDir,
};

console.log('packages:', chalk.green(config.packages.join(',')));
console.log('langs:', chalk.green(config.langs.join(',')));

const getConfig = () => {
  return config;
};

const setConfig = (data) => {
  Object.assign(config, data);
};

module.exports = {
  getConfig,
  setConfig,
};
