#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const execa = require('execa');
const path = require('path');
const tstPkg = require('./package.json');

let pkg;
let testArg;

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'));
} catch (e) {
  console.log(chalk.red('\n[tst] There is no package.json in your current directory.\n'));
  process.exit(1);
}

program
  .version('1.0.0')
  .name('tst')
  .usage('[test]')
  .description(`${tstPkg.description}\n  Having trouble? Open an issue here: ${tstPkg.bugs.url}`)
  .option('-p, --prefix <prefix>', 'A string that comes before all tests. Default is `test`.')
  .option('-s, --separator <separator>', 'Character that separates the prefix from the test name. Default is `:`.')
  .arguments('[test]')
  .action((test) => testArg = test)
  .parse(process.argv);

const {scripts} = pkg;
const hasScript = key => Object.keys(scripts).some(x => Boolean(scripts[key]));

if (!scripts || !scripts.test) {
  console.log(chalk.red('\n[tst] Your package.json does not have a test script!\n'));
  return null;
}

const prefix = program.prefix || 'test';
const separator = program.separator || ':';

if (testArg) {
  const script = testArg.startsWith('${prefix}${separator}') ? testArg : `${prefix}${separator}${testArg}`;

  if (!hasScript(script)) {
    console.log(chalk.red(`\n[tst] The test ${chalk.bold(script)} does not exist!\n`));
    return null;
  }

  console.log(`${chalk.cyan('\n[tst] Running the test suite:')} ${chalk.bold(testArg)}`);  
  return execa('npm', ['run', script], {stdio: 'inherit'});
} else {
  const testScripts = Object.keys(scripts).filter(scriptKey => scriptKey.startsWith('${prefix}${separator}')).map(str => str.split(separator)[1]);
  
  inquirer.prompt([{
    type: 'list',
    name: 'testScript',
    message: 'Which test would you like to run?',
    choices: [{ name: 'All of my tests', value: '*' }, new inquirer.Separator(), ...testScripts],
  }]).then((answers) => {
    console.log(`${chalk.cyan('\n[tst] Running the test suite:')} ${chalk.bold(answers.testScript)}`);
    const script = answers.testScript === '*' ? 'test' : `${prefix}${sep}${answers.testScript}`;
    return execa('npm', ['run', script], {stdio: 'inherit'});
  });
}

