# Test Selector &middot; [![npm version](https://img.shields.io/npm/v/test-selector.svg?style=flat)](https://www.npmjs.com/package/test-selector) [![Build Status](https://img.shields.io/travis/JasonEtco/test-selector.svg)](https://travis-ci.org/JasonEtco/test-selector) [![Coverage Status](https://coveralls.io/repos/github/JasonEtco/test-selector/badge.svg?branch=master)](https://coveralls.io/github/JasonEtco/test-selector?branch=master)

A helper CLI tool to make it easier to run just the tests you want to run.

`test-selector` will look through your `package.json` file's scripts object and pick out the ones following the `test:testName` scheme. It will then ask you which one of those tests you want to run! Or, if you already know the test you want to run, you can include its name in the command.

## Installation

```bash
$ npm install -g test-selector --save
```

### Basic usage

```bash
$ tst
```

![tst](https://user-images.githubusercontent.com/10660468/30186825-2353275e-93f5-11e7-9d4e-22abc78769fb.gif)

### Run a specific test

Already know which test you want to run? Cool! The following command is the same as `npm run test:api`.

```bash
$ tst api
```
Output:
```
[tst] Running the test suite: api
```

## Setting up your tests

`tst` assumes that your `package.json` file's scripts object is formatted like this:

```json
{
  "scripts": {
    "test": "test for things",
    "test:api": "test just the api",
    "test:compiler": "test just the compiler"
  }
}
```

### Available options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `-p`, `--prefix` | `'test'` | A string that comes before all tests. |
| `-s`, `--separator` | `':'` | Character that separates the prefix from the test name. |

You can use these options like this:

```bash
$ tst --prefix unit-test --separator -
```

This will suggest any scripts that look like `unit-test-TESTNAME`.

### Configuration in your `package.json` file

You may also add a `"tst"` object to your project's `package.json` file.

```json
{
  "scripts": {
    "test": "test for things",
    "unit-test-api": "test just the api",
  },
  "tst": {
    "prefix": "unit-test",
    "separator": "-"
  }
}
```

## Writing your tests

For each testing library, there's a different way to separate your tests if you don't want to run them all. I'm not an expert in every testing library, so here are a few resources you can look at:

- [Mocha's --grep option](https://mochajs.org/#-g---grep-pattern)
- [Jest CLI docs](http://facebook.github.io/jest/docs/en/cli.html)

## Contributing

I'd love your contributions! Feel free to open up an issue or submit a PR. Thanks 💖

## Changelog

- 1.0.0 - Initial release
- 1.0.1 - Enable settings in `package.json`
