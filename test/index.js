const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);

const expect = chai.expect;
const {checkAnswer, keys} = require('./utils');

const getTestScripts = require('../lib/get-test-scripts');
const runCommand = require('../lib/run-command');

describe('tst', () => {
  let stdin;
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });

  it('returns the correct test scripts', () => {
    const scripts = getTestScripts(path.join(__dirname, 'fixtures'));
    expect(scripts).to.deep.equal({
      test: 'test one',
      'test:two': 'node --eval "console.log(\'hi\')"',
      'test-three': 'test three',
      'pizza-four': 'test four'
    });
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
    expect(scripts).to.deep.equal({
      test: 'mocha',
      'test:coverage': 'nyc mocha',
    });    
  });

  it('returns false when running non-existant test', () => {
    const cmd = runCommand('test-command');
    expect(cmd).to.have.be.false; 
  });

  it('runs a child process', () => {
    process.chdir(path.join(__dirname, 'fixtures'));

    const cmd = runCommand('test:two');
    expect(cmd).to.be.an('object');
  });

  // it('runs the third option', () => {
  //   checkAnswer(keys.down, keys.down, keys.enter);
  //   var question = {
  //     type: 'list',
  //     name: 'choice',
  //     message: 'pick three',
  //     choices: ['one', 'two', 'three']
  //   };
  //   inquirer.prompt([question], function (answers) {
  //     console.assert(response === 'three');
  //     done();
  //   });
  // });
})