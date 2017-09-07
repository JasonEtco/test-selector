#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const execa = require('execa');
const path = require('path');
const tstPkg = require('./package.json');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

let testArg;

program
  .version('1.0.0')
  .name('tst')
  .usage('[test]')
  .description(`${tstPkg.description}\n  Having trouble? Open an issue here: ${tstPkg.bugs.url}`)
  .arguments('[test]')
  .action((test) => testArg = test)
  .parse(process.argv);

const {scripts} = pkg;
const hasScript = key => Object.keys(scripts).some(x => Boolean(scripts[key]));

if (!scripts || !scripts.test) {
  console.log(chalk.red('\n[tst] Your package.json does not have a test script!\n'));
  process.exit(1);
}

if (testArg) {
  const script = testArg.startsWith('test:') ? testArg : `test:${testArg}`;

  if (!hasScript(script)) {
    console.log(chalk.red('\n[tst] That test does not exist!\n'));
    process.exit(1);
  }
  return execa('npm', ['run', script], {stdio: 'inherit'});
} else {
  const testScripts = Object.keys(scripts).filter(scriptKey => scriptKey.startsWith('test:')).map(str => str.split(':')[1]);
  
  inquirer.prompt([{
    type: 'list',
    name: 'testScript',
    message: 'Which test would you like to run?',
    choices: [{ name: 'All of my tests', value: '*' }, new inquirer.Separator(), ...testScripts],
  }]).then((answers) => {
    console.log(`${chalk.cyan('[tst] Running the test suite:')} ${chalk.bold(answers.testScript)}`);
    const script = answers.testScript === '*' ? 'test' : `test:${answers.testScript}`;
    return execa('npm', ['run', script], {stdio: 'inherit'});
  });
}

