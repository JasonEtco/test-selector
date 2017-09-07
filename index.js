#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const tstPkg = require('./package.json');
const getTestScripts = require('./lib/get-test-scripts');
const runCommand = require('./lib/run-command');
const formatTestScripts = require('./lib/format-test-scripts');

let testArg;

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

const scripts = getTestScripts();
if (typeof scripts === 'string') {
  console.log(`\n${scripts}\n`);
  return;
}

const prefix = program.prefix || 'test';
const separator = program.separator || ':';
const preString = prefix + separator;

if (testArg) {
  const script = testArg.startsWith(preString) ? testArg : preString + testArg;
  return runCommand(script);
} else {
  const testScripts = formatTestScripts(scripts, prefix, separator);

  inquirer.prompt([{
    type: 'list',
    name: 'testScript',
    message: 'Which test would you like to run?',
    choices: [{ name: 'All of my tests', value: '*' }, new inquirer.Separator(), ...testScripts],
  }]).then((answers) => {
    const script = answers.testScript === '*' ? 'test' : preString + answers.testScript;
    return runCommand(script);
  });
}

