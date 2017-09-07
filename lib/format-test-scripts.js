/**
 * Formats an object of tests and returns an array of just
 * the test names.
 * 
 * @example
 * 
 * const obj = { 'test:one': 'a test will run' }
 * formatTestScripts(obj)
 * // Returns: ['one']
 * 
 * @example
 * 
 * const obj = {
 *   'test:one': 'a test will run',
 *   'test-two: 'a different test will run
 * }
 * formatTestScripts(obj, 'test', '-')
 * // Returns: ['two']
 * 
 * @param {object} obj - Scripts object
 * @param {string} [pre='test'] - Test script prefix, defaults to 'test'.
 * @param {string} [sep=':'] - Test script separator, defaults to ':'.
 * @returns {string[]} - Array of test names
 */
module.exports = (obj, pre = 'test', sep = ':') => {
  return Object.keys(obj)
    .filter(key => key.startsWith(pre + sep))
    .map(str => str.split(sep)[1]);  
}