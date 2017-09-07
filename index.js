#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const pkg = require(process.cwd() + '/package.json');

program
  .version('1.0.0')
  .option('-t, --test', 'Run a specific test case')
  .parse(process.argv);

const {scripts} = pkg;

if (!scripts || !scripts.test) {
  console.log(chalk.red('\n[NTESTS] Your package.json does not have a test script!\n'));
  process.exit(1);
}

const testScripts = Object.keys(scripts).filter(scriptKey => scriptKey.startsWith('test:')).map(str => str.split(':')[1]);

inquirer.prompt([{
  type: 'list',
  name: 'testScript',
  message: 'Which test would you like to run?',
  choices: ['All of my tests', ...testScripts],
}]).then((answers) => {
  console.log(`${chalk.cyan('[NTESTS] Running the test suite:')} ${chalk.bold(answers.testScript)}`);
  const script = answers.testScript === 'All of them' ? 'test' : `test:${answers.testScript}`;
  spawn('npm', ['run', script], { stdio: 'inherit' });
});
