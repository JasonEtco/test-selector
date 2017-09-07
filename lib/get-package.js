const chalk = require('chalk');
const path = require('path');

/**
 * Require the CWD's package.json and return the
 * scripts object, or end process if it doesn't exist.
 * @param {string} [cwd=process.cwd()] - Path to directory to run in
 * @returns {object} - Object of test scripts
 */
module.exports = (cwd = process.cwd()) => {
  let pkg;
  let testArg;
  
  try {
    pkg = require(path.resolve(cwd, 'package.json'));
  } catch (e) {
    return chalk.red('[tst] There is no package.json in your current directory.');
  }
  
  if (!pkg.scripts || !pkg.scripts.test) {
    return chalk.red('[tst] Your package.json does not have a test script!');
  }

  return pkg;
}
