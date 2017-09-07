#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const execa = require('execa');
const path = require('path');
const tstPkg = require('./package.json');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

program
  .version('1.0.0')
  .description(tstPkg.description)
  .option('-t, --test <test>', 'Run a specific test case')
  .parse(process.argv);

const {scripts} = pkg;
const hasScript = key => Object.keys(scripts).some(x => Boolean(scripts[key]));

if (!scripts || !scripts.test) {
  console.log(chalk.red('\n[tst] Your package.json does not have a test script!\n'));
  process.exit(1);
}

if (program.test) {
  const formattedTest = program.test.startsWith('test:') ? program.test : `test:${program.test}`;

  if (!hasScript(formattedTest)) {
    console.log(chalk.red('\n[tst] That test does not exist!\n'));
    process.exit(1);
  }
  return execa('npm', ['run', formattedTest], {stdio: 'inherit'});
}

const testScripts = Object.keys(scripts).filter(scriptKey => scriptKey.startsWith('test:')).map(str => str.split(':')[1]);

inquirer.prompt([{
  type: 'list',
  name: 'testScript',
  message: 'Which test would you like to run?',
  choices: ['All of my tests', ...testScripts],
}]).then((answers) => {
  console.log(`${chalk.cyan('[tst] Running the test suite:')} ${chalk.bold(answers.testScript)}`);
  const script = answers.testScript === 'All of them' ? 'test' : `test:${answers.testScript}`;
  return execa('npm', ['run', script], {stdio: 'inherit'});
});
