const runCommand = require('../lib/run-command');
const expect = require('chai').expect;
const path = require('path');

describe('run command', () => {
  before('move to fixtures dir', function () {
    process.chdir(path.join(__dirname, 'fixtures'));
  });

  it('returns false when running non-existant test', () => {
    const cmd = runCommand('test-command');
    expect(cmd).to.be.false; 
  });

  it('runs a child process', () => {
    const cmd = runCommand('test:two');
    expect(cmd).to.be.an('object');
  });

  after('move back to root dir', function () {
    process.chdir(path.join(__dirname, '..'));
  });
});