
# mocha-broken

  Only run previously broken mocha tests. Really useful when individual tests
  can take a long time.

## Example

  First time you run tests, all tests are executed:

```bash
$ mocha-broken
1..2
ok 1 works fine
not ok 2 should 500 on req
  Error: expected 500 "Internal Server Error", got 302 "Moved Temporarily"

# tests 2
# pass 1
# fail 1
```

  Next time you run tests, only the failing are executed:

```bash
$ mocha-broken
1..1
not ok 1 should 500 on req
  Error: expected 500 "Internal Server Error", got 302 "Moved Temporarily"

# tests 1
# pass 0
# fail 1
```

  Once all tests pass, all are executed again.

## Passing arguments to mocha

  Arguments after `--` are passed to mocha:

```bash
$ mocha-broken -- --compilers coffee:coffee-script/register
```

## Installation

```bash
$ npm install -g mocha-broken
```

## License

  MIT

