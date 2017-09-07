const getTestScripts = require('../lib/get-test-scripts');
const expect = require('chai').expect;
const path = require('path');
const chalk = require('chalk');

describe('get test scripts', () => {
  it('returns the correct test scripts', () => {
    const scripts = getTestScripts(path.join(__dirname, 'fixtures'));
    const pkg = require('./fixtures/package.json');
    expect(scripts).to.deep.equal(pkg.scripts);
  });

  it('returns an error when the package.json has no test scripts', () => {
    const scripts = getTestScripts(path.join(__dirname, 'fixtures', 'no-tests'));
    expect(scripts).to.equal(chalk.red('[tst] Your package.json does not have a test script!'));
  });

  it('returns an error when the package.json does not exist', () => {
    const scripts = getTestScripts(path.join(__dirname, 'fixtures', 'no-package'));
    expect(scripts).to.equal(chalk.red('[tst] There is no package.json in your current directory.'));
  });

  it('returns this project\'s scripts with no cwd argument', () => {
    const scripts = getTestScripts();
    const tstPkgScripts = require('../package.json').scripts;
    expect(scripts).to.deep.equal(tstPkgScripts);    
  });
});