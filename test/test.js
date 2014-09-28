
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Readable stream class:
	Readable = require( 'readable-stream' ).Readable,

	// Mock reading from the stream:
	mockRead = require( 'flow-mock-read' ),

	// Module to be tested:
	stream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-from-string', function tests() {
	'use strict';

	describe( 'class', function tests() {

		it( 'should export a function', function test() {
			expect( stream ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided a string', function test() {
			var values = [
					5,
					[],
					true,
					NaN,
					null,
					undefined,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					stream( value );
				};
			}
		});

		it( 'should throw an error if provided a bad option', function test() {
			expect( foo ).to.throw( TypeError );

			function foo() {
				stream('',{'encoding': []});
			}
		});

		it( 'should return a readable stream', function test() {
			var opts = {
					'objectMode': true,
					'encoding': null,
					'highWaterMark': 16
				};
			assert.instanceOf( stream( '', opts ), Readable );
		});

		it( 'should convert a string to a readable stream', function test( done ) {
			var expected = 'beep';

			mockRead( stream( expected ), onData );

			function onData( error, actual ) {
				if ( error ) {
					assert.notOk( true );
					done();
					return;
				}
				assert.strictEqual( expected, actual.join('') );
				done();
			}
		});

		it( 'should convert a string to a readable stream in object mode', function test( done ) {
			var expected = 'beep',
				opts = {
					'objectMode': true
				};

			mockRead( stream( expected ), onData );

			function onData( error, actual ) {
				if ( error ) {
					assert.notOk( true );
					done();
					return;
				}
				assert.strictEqual( expected, actual.join('') );
				done();
			}
		});

		it( 'can be destroyed', function test( done ) {
			var s = stream('');
			s.on( 'close', function onClose() {
				assert.ok( true );
				done();
			});
			s.destroy();
		});

		it( 'can be destroyed more than once', function test( done ) {
			var s = stream('');
			s.on( 'close', function onClose() {
				assert.ok( true );
				done();
			});
			s.destroy();
			s.destroy();
		});

		it( 'can be destroyed with an error', function test( done ) {
			var s = stream('');
			s.on( 'error', function onError( error ) {
				if ( error ) {
					assert.ok( true );
					return;
				}
				assert.notOk( true );
			});
			s.on( 'close', function onClose() {
				assert.ok( true );
				done();
			});
			s.destroy( new Error('beep') );
		});

	});

	describe( 'objectMode', function tests() {

		it( 'should export a function to create streams only operating in objectMode', function test() {
			expect( stream.objectMode ).to.be.a( 'function' );
		});

		it( 'should return a stream in object mode', function test( done ) {
			var Stream = stream,
				fromString = stream.objectMode,
				opts,
				s,
				expected;

			// Returns Stream instance:
			assert.instanceOf( fromString(''), Stream );

			// Sets the objectMode option:
			opts = {
				'objectMode': false
			};
			s = fromString( '', opts );
			assert.strictEqual( opts.objectMode, true );

			// Behaves as expected:
			expected = 'beep';

			mockRead( fromString( expected ), onData );

			function onData( error, actual ) {
				if ( error ) {
					assert.notOk( true );
					done();
					return;
				}
				assert.strictEqual( expected, actual.join('') );
				done();
			}
		});

	});

	describe( 'factory', function tests() {

		it( 'should export a reusable stream factory', function test() {
			expect( stream.factory ).to.be.a('function' );
			expect( stream.factory() ).to.be.a( 'function' );
		});

		it( 'should return a stream from the factory', function test() {
			var Stream = stream,
				opts = {'objectMode': true},
				factory = stream.factory( opts );

			assert.instanceOf( factory(''), Stream );
		});

	});

});