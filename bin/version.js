const fs = require('fs');
const path = require('path');
const version = require('../package.json').version;

function dir( file ) {
  return path.resolve( __dirname, file );
}

[ '../draggabilly.js', '../README.md' ].forEach( function( file ) {
  file = dir( file );
  let src = fs.readFileSync( file, 'utf8' );
  src = src.replace( /Draggabilly v\d+\.\d+\.\d+/, `Draggabilly v${version}` );
  fs.writeFileSync( file, src, 'utf8' );
} );
