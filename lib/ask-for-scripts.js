const inquirer = require('inquirer');

module.exports = testScripts => {
  return inquirer.prompt([{
    type: 'list',
    name: 'testScript',
    message: 'Which test would you like to run?',
    choices: [{ name: 'All of my tests', value: '*' }, new inquirer.Separator(), ...testScripts],
  }]);
};
