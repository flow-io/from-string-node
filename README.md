from-string
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Converts a string to a [readable stream](http://nodejs.org/api/stream.html#stream_class_stream_readable).


## Installation

``` bash
$ npm install flow-from-string
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var fromString = require( 'flow-from-string' );
```

#### fromString( str[, options] )

Returns a readable `stream` where each emitted datum is a character from the input `string`.

To convert a `string` to a readable stream,

``` javascript
var stream = fromString( 'beep' );
```

To set the readable stream `options`,

``` javascript
var opts = {
		'objectMode': true,
		'encoding': 'utf8',
		'highWaterMark': 8
	};

stream = fromString( 'beep', opts );
```


#### fromString.factory( [options] )

Returns a reusable stream factory. The factory method ensures streams are configured identically by using the same set of provided `options`.

``` javascript
var opts = {
		'objectMode': true,
		'encoding': 'utf8',
		'highWaterMark': 8
	};

var factory = fromString.factory( opts );

var streams = new Array( 10 ),
	str;

// Create many streams configured identically but reading different strings...
for ( var i = 0; i < streams.length; i++ ) {
	str = '';
	for ( var j = 0; j < 100; j++ ) {
		str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
	}
	streams[ i ] = factory( str );
}
```


#### fromString.objectMode( str[, options] )

This method is a convenience function to create readable streams which always operate in `objectMode`. The method will __always__ override the `objectMode` option in `options`.

``` javascript
var fromString = require( 'flow-from-string' ).objectMode;

fromString( 'beep' )
	.pipe( process.stdout );
```


## Examples

``` javascript
var append = require( 'flow-append' ).objectMode,
	fromString = require( 'flow-from-string' );

// Create a string...
var str = '';
for ( var i = 0; i < 200; i++ ) {
	str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

// Create a readable stream:
var readableStream = fromString( str );

// Pipe the data:
readableStream
	.pipe( append( '\n' ) )
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/flow-from-string.svg
[npm-url]: https://npmjs.org/package/flow-from-string

[travis-image]: http://img.shields.io/travis/flow-io/from-string-node/master.svg
[travis-url]: https://travis-ci.org/flow-io/from-string-node

[coveralls-image]: https://img.shields.io/coveralls/flow-io/from-string-node/master.svg
[coveralls-url]: https://coveralls.io/r/flow-io/from-string-node?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/from-string-node.svg
[dependencies-url]: https://david-dm.org/flow-io/from-string-node

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/from-string-node.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/from-string-node

[github-issues-image]: http://img.shields.io/github/issues/flow-io/from-string-node.svg
[github-issues-url]: https://github.com/flow-io/from-string-node/issues