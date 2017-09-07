const formatTestScripts = require('../lib/format-test-scripts');
const expect = require('chai').expect;
const path = require('path');
const chalk = require('chalk');

describe('format test scripts', () => {
  it('returns an array of test names', () => {
    const pkg = require('./fixtures/package.json');
    const scripts = formatTestScripts(pkg.scripts);
    expect(scripts).to.deep.equal(['two']);
  });

  it('returns an array of test names with a prefix', () => {
    const pkg = require('./fixtures/package.json');
    const scripts = formatTestScripts(pkg.scripts, 'pizza');
    expect(scripts).to.deep.equal(['four']);
  });

  it('returns an array of test names with a prefix and a separator', () => {
    const pkg = require('./fixtures/package.json');
    const scripts = formatTestScripts(pkg.scripts, 'pizza', '-');
    expect(scripts).to.deep.equal(['five']);
  });
});