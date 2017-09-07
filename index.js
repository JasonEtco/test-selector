#! /usr/bin/env node

const program = require('commander');
const path = require('path');
const tstPkg = require('./package.json');
const getPackage = require('./lib/get-package');
const runCommand = require('./lib/run-command');
const askForScripts = require('./lib/ask-for-scripts');
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

const pkg = getPackage();
if (typeof pkg === 'string') {
  console.log(`\n${pkg}\n`);
  return;
}

const prefix = program.prefix || (pkg.tst && pkg.tst.prefix ? pkg.tst.prefix : 'test');
const separator = program.separator || (pkg.tst && pkg.tst.separator ? pkg.tst.separator : ':');
const preString = prefix + separator;

if (testArg) {
  const script = testArg.startsWith(preString) ? testArg : preString + testArg;
  return runCommand(script);
} else {
  const testScripts = formatTestScripts(pkg.scripts, prefix, separator);  
  askForScripts(testScripts)
    .then((answers) => {
      const script = answers.testScript === '*' ? 'test' : preString + answers.testScript;
      return runCommand(script);
    });
}

