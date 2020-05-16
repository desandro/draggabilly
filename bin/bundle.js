const fs = require('fs');
const path = require('path');
const requirejs = require('requirejs');

function dir( file ) {
  return path.resolve( __dirname, file );
}

// get banner
let dbillyJsSrc = fs.readFileSync( dir('../draggabilly.js'), 'utf8' );
let banner = dbillyJsSrc.split(' */')[0] + ' */\n\n';
banner = banner.replace( 'Draggabilly', 'Draggabilly PACKAGED' );

let options = {
  out: dir('../dist/draggabilly.pkgd.js'),
  baseUrl: 'node_modules',
  optimize: 'none',
  include: [
    'jquery-bridget/jquery-bridget',
    'draggabilly/draggabilly',
  ],
  paths: {
    draggabilly: '../',
    jquery: 'empty:',
  },
};

requirejs.optimize(
    options,
    function() {
      let content = fs.readFileSync( options.out, 'utf8' );
      content = content.replace( "'draggabilly/draggabilly',", '' );
      content = banner + content;
      fs.writeFileSync( options.out, content );
    },
    function( err ) {
      throw new Error( err );
    },
);
