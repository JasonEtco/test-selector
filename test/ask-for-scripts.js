const path = require('path');
const {expect} = require('chai');
const {checkAnswer, keys} = require('./utils');
const askForScripts = require('../lib/ask-for-scripts');
const runCommand = require('../lib/run-command');

describe('ask for scripts', function () {
  before('move to fixtures dir', function () {
    process.chdir(path.join(__dirname, 'fixtures'));
  });

  it('picks the second test', function () {
    checkAnswer(keys.down, keys.enter);
    return askForScripts(['two', 'three', 'four']).then((answers) => {
      expect(answers.testScript).to.equal('two');
    });
  });

  after('move back to root dir', function () {
    process.chdir(path.join(__dirname, '..'));
  });
});
