const getPackage = require('../lib/get-package');
const expect = require('chai').expect;
const path = require('path');
const chalk = require('chalk');

describe('get package', () => {
  it('returns the correct test scripts', () => {
    const {scripts} = getPackage(path.join(__dirname, 'fixtures'));
    const pkg = require('./fixtures/package.json');
    expect(scripts).to.deep.equal(pkg.scripts);
  });

  it('returns an error when the package.json has no test scripts', () => {
    const pkg = getPackage(path.join(__dirname, 'fixtures', 'no-tests'));
    expect(pkg).to.equal(chalk.red('[tst] Your package.json does not have a test script!'));
  });

  it('returns an error when the package.json does not exist', () => {
    const pkg = getPackage(path.join(__dirname, 'fixtures', 'no-package'));
    expect(pkg).to.equal(chalk.red('[tst] There is no package.json in your current directory.'));
  });

  it('returns this project\'s scripts with no cwd argument', () => {
    const {scripts} = getPackage();
    const tstPkgScripts = require('../package.json').scripts;
    expect(scripts).to.deep.equal(tstPkgScripts);    
  });
});