const execa = require('execa');
const chalk = require('chalk');
const getTestScripts = require('./get-test-scripts');

/**
 * Runs the given command using execa, or console logs
 * the relevant error.
 * @param {string} cmd - Command to run, prefixed by `npm run`.
 * @returns {Promise<never>}
 */
module.exports = (cmd) => {
  const testing = process.env.NODE_ENV !== 'test';
  const scripts = getTestScripts();
  const hasScript = key => Object.keys(scripts).some(x => Boolean(scripts[key]));
  
  if (!hasScript(cmd)) {
    if (testing) console.log(chalk.red(`\n[tst] The test ${chalk.bold(cmd)} does not exist!\n`));
    return false;
  }

  if (testing) console.log(`${chalk.cyan('\n[tst] Running the test suite:')} ${chalk.bold(cmd)}`);

  return execa('npm', ['run', cmd], {stdio: 'inherit'})
}