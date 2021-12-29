const fs = require('fs');
const { execSync } = require('child_process');
const { minify } = require('terser');
const pkg = require('../package.json');

const distPath = 'dist/draggabilly.pkgd.js';
const distMinPath = 'dist/draggabilly.pkgd.min.js';

let indexContent = fs.readFileSync( `./${pkg.main}`, 'utf8' );

let paths = [
  'node_modules/jquery-bridget/jquery-bridget.js',
  'node_modules/get-size/get-size.js',
  'node_modules/ev-emitter/ev-emitter.js',
  'node_modules/unidragger/unidragger.js',
  'draggabilly.js',
];

// concatenate files
execSync(`cat ${paths.join(' ')} > ${distPath}`);

// add banner
let banner = indexContent.split(' */')[0] + ' */\n\n';
banner = banner.replace( 'Draggabilly', 'Draggabilly PACKAGED' );
let distJsContent = fs.readFileSync( distPath, 'utf8' );
distJsContent = banner + distJsContent;
fs.writeFileSync( distPath, distJsContent );

// minify
( async function() {
  let { code } = await minify( distJsContent, { mangle: true } );
  fs.writeFileSync( distMinPath, code );
} )();
