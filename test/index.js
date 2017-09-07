const inquirer = require('inquirer');
const execa = require('execa');
const path = require('path');
const expect = require('chai').expect;
const parallel = require('mocha.parallel');

const {checkAnswer, keys} = require('./utils');

const getTestScripts = require('../lib/get-test-scripts');
const runCommand = require('../lib/run-command');

parallel('tst command', function () {
  this.timeout(10000);

  it('outputs something to stdout', async function () {
    const {stdout} = await execa('./index.js', ['--version']);
    expect(stdout.length).to.be.greaterThan(0);
  });

  it('runs the provided argument script with the prefix and separator', async function () {
    process.chdir(path.join(__dirname, 'fixtures'));
    const scripts = getTestScripts();
    const {stdout} = await execa('../../index.js', ['test:two']);
    expect(stdout).to.include(scripts['test:two']);
  });

  it('runs the provided argument script without the prefix and separator', async function () {
    process.chdir(path.join(__dirname, 'fixtures'));
    const scripts = getTestScripts();
    const {stdout} = await execa('../../index.js', ['two']);
    expect(stdout).to.include(scripts['test:two']);
  });

  describe('custom prefix', function () {
    it('runs the provided argument script with a custom prefix, without the prefix in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['four', '--prefix', 'pizza']);
      expect(stdout).to.include(scripts['pizza:four']);
    });

    it('runs the provided argument script with a custom prefix, with the prefix in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['pizza:four', '--prefix', 'pizza']);
      expect(stdout).to.include(scripts['pizza:four']);
    });
  });

  describe('custom separator', function () {
    it('runs the provided argument script with a custom separator, without the separator in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['three', '--separator', '-']);
      expect(stdout).to.include(scripts['test-three']);
    });

    it('runs the provided argument script with a custom separator, with the separator in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['test-three', '--separator', '-']);
      expect(stdout).to.include(scripts['test-three']);
    });
  })

  describe('custom separator and custom prefix', function () {
    it('runs the provided argument script with a custom prefix and separator without either in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['five', '--prefix', 'pizza', '--separator', '-']);
      expect(stdout).to.include(scripts['pizza-five']);
    });

    it('runs the provided argument script with a custom prefix and separator with both in the arg', async function () {
      process.chdir(path.join(__dirname, 'fixtures'));
      const scripts = getTestScripts();
      const {stdout} = await execa('../../index.js', ['pizza-five', '--prefix', 'pizza', '--separator', '-']);
      expect(stdout).to.include(scripts['pizza-five']);
    });
  });
});
