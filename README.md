# Test Selector

A helper CLI tool to make it easier to run just the tests you want by asking you which tests you want to run.

`test-selector` will look through your `package.json` file's scripts object and pick out the ones following the `test:testName` scheme. It will then ask you which one of those tests you want to run! Or, if you already know, you can include the test name in the command.

## Installation

```bash
$ npm install -g test-selector --save
```

### Basic usage

```bash
$ tst
```

![image](https://user-images.githubusercontent.com/10660468/30147090-4e238982-936a-11e7-8042-d96d5abbe6a5.png)

### Run a specific test

Already know which test you want to run? Cool! The following command is the same as `npm run test:api`.

```bash
$ tst api
```
Output:
```
[tst] Running the test suite: api
```

## Requirements

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


## Writing your tests

For each testing library, there's a different way to separate your tests if you don't want to run them all. I'm not an expert in every testing library, so here are a few resources you can look at:

- [MochaJS --grep option](https://mochajs.org/#-g---grep-pattern)
- [Jest CLI docs](http://facebook.github.io/jest/docs/en/cli.html)

## Contributing

I'd love your contributions! Feel free to open up an issue or submit a PR. Thanks 💖