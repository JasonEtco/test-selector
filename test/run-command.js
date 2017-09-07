const runCommand = require('../lib/run-command');
const expect = require('chai').expect;
const path = require('path');

describe('run command', () => {
  it('returns false when running non-existant test', () => {
    const cmd = runCommand('test-command');
    expect(cmd).to.be.false; 
  });

  it('runs a child process', () => {
    process.chdir(path.join(__dirname, 'fixtures'));

    const cmd = runCommand('test:two');
    expect(cmd).to.be.an('object');
  });
});