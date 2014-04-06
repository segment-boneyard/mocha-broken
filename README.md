
# mocha-broken

  Only run previously broken mocha tests. Really useful when individual tests
  can take a long time.

## Example

  First time you run tests, all tests are executed: 

```bash
$ mocha-broken
["start",{"total":2}]
["fail",{"title":"should break","fullTitle":"suite should break","duration":0}]
["pass",{"title":"should pass","fullTitle":"suite should pass","duration":0}]
["end",{"suites":1,"tests":2,"passes":1,"pending":0,"failures":1,"start":"2014-04-06T01:07:52.883Z","end":"2014-04-06T01:07:52.894Z","duration":11}]
```

  Next time you run tests, only the failing are executed:

```bash
$ mocha-broken
["start",{"total":2}]
["fail",{"title":"should break","fullTitle":"suite should break","duration":0}]
["end",{"suites":1,"tests":1,"passes":0,"pending":0,"failures":1,"start":"2014-04-06T01:09:08.654Z","end":"2014-04-06T01:09:08.663Z","duration":9}]
```

  Once all tests pass, all are executed again.

## TODO

* pass flags and options to mocha
* support mocha reporters

## Installation

```bash
$ npm install -g mocha-broken
```

## License

  MIT

