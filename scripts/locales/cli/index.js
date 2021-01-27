const inquirer = require('inquirer');
// const argv = require('node-argv');
// inquirer.registerPrompt('directory', require('inquirer-select-directory'));

(async () => {
  const answer = await inquirer.prompt({
    message: '选择操作',
    name: 'type',
    type: 'list',
    choices: [
      { name: 'import(导入)', value: 'import', description: '导入' },
      { name: 'export(导出)', value: 'export', description: '导出' },
    ],
  });
  const { type } = answer;
  if (type === 'import') {
    const answers = await inquirer.prompt([
      {
        name: 'filename',
        message: '请输入文件路径',
      },
    ]);
    const { filename } = answers;
    require('./import').starter(filename);
  } else if (type === 'export') {
    require('./export').starter();
  }
})();
