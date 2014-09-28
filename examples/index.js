var append = require( 'flow-append' ).objectMode,
	fromString = require( './../lib' );

// Create a string...
var str = '';
for ( var i = 0; i < 200; i++ ) {
	str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

// Create a readable stream:
var readStream = fromString( str );

// Pipe the data:
readStream
	.pipe( append( '\n' ) )
	.pipe( process.stdout );