exports.keys = {
  up: '\u001b[A',
  down: '\u001b[B',
  left: '\u001b[D',
  right: '\u001b[C',
  enter: '\n',
};

exports.checkAnswer = (responses) => {
  if (arguments.length > 1) {
    responses = Array.prototype.slice.call(arguments, 0);
  }
  if (typeof responses === 'string') {
    responses = [responses];
  }

  if (!Array.isArray(responses)) {
    throw new Error('Expected array of responses, not ' + JSON.stringify(responses, null, 2));
  }
  if (responses.length < 1) {
    throw new Error('Expected at least 1 response, not ' + JSON.stringify(responses, null, 2));
  }

  const stdin = require('mock-stdin').stdin();

  const k = 0;

  function sendAnswer() {
    setTimeout(() => {
      const text = responses[k];
      if (typeof text !== 'string') {
        throw new Error('Should give only text responses ' + JSON.stringify(responses, null, 2));
      }
      stdin.send(text);
      k += 1;
      if (k < responses.length) {
        sendAnswer();
      }
    }, 0);
  }

  sendAnswer();
}