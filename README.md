# Test Selector

A helper CLI tool to make it easier to run just the tests you want by asking you which tests you want to run.

`test-selector` will look through your `package.json` file's scripts object and pick out the ones following the `test:testName` scheme. It will then ask you which one of those tests you want to run! Or, if you already know, you can include the test name in the command.

## Usage:

```bash
$ tst
```
Output:
```
A list of your test scripts
```

Already know which test you want to run? Cool! The following command is the same as `npm run test:api`.

```bash
$ tst api
```
Output:
```
[tst] Running the test suite: api
```
