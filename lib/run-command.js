const execa = require('execa');
const chalk = require('chalk');
const getPackage = require('./get-package');

/**
 * Runs the given command using execa, or console logs
 * the relevant error.
 * @param {string} cmd - Command to run, prefixed by `npm run`.
 * @returns {Promise<never>}
 */
module.exports = (cmd) => {
  const {scripts} = getPackage();
  const hasScript = key => Object.keys(scripts).some(x => Boolean(scripts[key]));
  
  if (!hasScript(cmd)) {
    console.log(chalk.red(`\n[tst] The test ${chalk.bold(cmd)} does not exist!\n`));
    return false;
  }

  console.log(`${chalk.cyan('\n[tst] Running the test suite:')} ${chalk.bold(cmd)}`);

  return execa('npm', ['run', cmd], {stdio: 'inherit'})
}