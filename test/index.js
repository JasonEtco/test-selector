const inquirer = require('inquirer');
const execa = require('execa');
const path = require('path');
const expect = require('chai').expect;
const parallel = require('mocha.parallel');

const {checkAnswer, keys} = require('./utils');

const getTestScripts = require('../lib/get-test-scripts');
const runCommand = require('../lib/run-command');
const askForScripts = require('../lib/ask-for-scripts');

describe('tst command', function () {
  this.timeout(8000);

  it('outputs something to stdout', async function () {
    const {stdout} = await execa('./index.js', ['--version']);
    expect(stdout.length).to.be.greaterThan(0);
  });

  it('logs an error to console when there are no scripts', async function () {
    process.chdir(path.join(__dirname, 'fixtures', 'no-tests'));

    const {stdout} = await execa('../../../index.js');
    expect(stdout.length).to.be.greaterThan(0);

    process.chdir(path.join(__dirname, '..', '..'));    
  });

  parallel('with no test argument', function () {
    let scripts;

    before('move to fixtures dir', function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      scripts = getTestScripts();
    });

    it('runs the main test command', async function () {
      const {stdout} = await execa('../../index.js', [], {
        input: keys.enter,
      });
      expect(stdout).to.include(scripts['test']);
    });

    it('runs the second command with no options', async function () {
      const {stdout} = await execa('../../index.js', [], {
        input: keys.down + keys.enter,
      });
      expect(stdout).to.include(scripts['test:two']);
    });

    it('runs a command with a custom separator', async function () {
      const {stdout} = await execa('../../index.js', ['--separator', '-'], {
        input: keys.down + keys.enter,
      });
      expect(stdout).to.include(scripts['test-three']);
    });

    it('runs a command with a custom prefix', async function () {
      const {stdout} = await execa('../../index.js', ['--prefix', 'pizza'], {
        input: keys.down + keys.enter,
      });
      expect(stdout).to.include(scripts['pizza:four']);
    });

    it('runs a command with a custom prefix and separator', async function () {
      const {stdout} = await execa('../../index.js', ['--prefix', 'pizza', '--separator', '-'], {
        input: keys.down + keys.enter,
      });
      expect(stdout).to.include(scripts['pizza-five']);
    });

    after('move back to root dir', function () {
      process.chdir(path.join(__dirname, '..'));
    });
  });

  parallel('with test argument', function() {
    let scripts;

    before('move to fixtures dir', function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      scripts = getTestScripts();
    });

    it('runs the provided argument script with the prefix and separator', async function () {
      const {stdout} = await execa('../../index.js', ['test:two']);
      expect(stdout).to.include(scripts['test:two']);
    });
  
    it('runs the provided argument script without the prefix and separator', async function () {
      const {stdout} = await execa('../../index.js', ['two']);
      expect(stdout).to.include(scripts['test:two']);
    });
  
    describe('custom prefix', function () {
      it('runs the provided argument script with a custom prefix, without the prefix in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['four', '--prefix', 'pizza']);
        expect(stdout).to.include(scripts['pizza:four']);
      });
  
      it('runs the provided argument script with a custom prefix, with the prefix in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['pizza:four', '--prefix', 'pizza']);
        expect(stdout).to.include(scripts['pizza:four']);
      });
    });
  
    describe('custom separator', function () {
      it('runs the provided argument script with a custom separator, without the separator in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['three', '--separator', '-']);
        expect(stdout).to.include(scripts['test-three']);
      });
  
      it('runs the provided argument script with a custom separator, with the separator in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['test-three', '--separator', '-']);
        expect(stdout).to.include(scripts['test-three']);
      });
    })
  
    describe('custom separator and custom prefix', function () {
      it('runs the provided argument script with a custom prefix and separator without either in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['five', '--prefix', 'pizza', '--separator', '-']);
        expect(stdout).to.include(scripts['pizza-five']);
      });
  
      it('runs the provided argument script with a custom prefix and separator with both in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['pizza-five', '--prefix', 'pizza', '--separator', '-']);
        expect(stdout).to.include(scripts['pizza-five']);
      });
    });
  
    describe('custom separator and custom prefix', function () {
      it('runs the provided argument script with a custom prefix and separator without either in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['five', '--prefix', 'pizza', '--separator', '-']);
        expect(stdout).to.include(scripts['pizza-five']);
      });
  
      it('runs the provided argument script with a custom prefix and separator with both in the arg', async function () {
        const {stdout} = await execa('../../index.js', ['pizza-five', '--prefix', 'pizza', '--separator', '-']);
        expect(stdout).to.include(scripts['pizza-five']);
      });
    });

    after('move back to root dir', function () {
      process.chdir(path.join(__dirname, '..'));
    });
  });
});
