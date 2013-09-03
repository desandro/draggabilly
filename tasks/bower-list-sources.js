/**
 * bower-list-map task
 */

var spawn = require('child_process').spawn;
var organizeSources = require('organize-bower-sources');

// pass a command, return its contents
function cli( command, callback ) {
  var args = command.split(' ');
  var arg1 = args.splice( 0, 1 );
  var process = spawn( arg1[0], args );
  var output = '';
  process.stdout.setEncoding('utf8');
  process.stdout.on( 'data',  function( data ) {
    output += data;
  });
  process.on( 'close', function() {
    callback( output );
  });
}

module.exports = function( grunt ) {

  'use strict';

  grunt.registerTask( 'bower-list-sources', function() {
    var done = this.async();

    cli( 'bower list --json', function( mapSrc ) {
      var bowerMap = JSON.parse( mapSrc );

      var bowerSources = organizeSources( bowerMap );
      var bowerJsSources = bowerSources['.js'].filter( function( src ) {
        // remove any *.min.js like EventEmitter
        return src.indexOf('.min.js') === -1 &&
          // remove doc-ready
          src.indexOf('doc-ready') === -1;
      });

      // set config so it gets concat and uglified
      grunt.config.set( 'concat.pkgd.src', bowerJsSources );
      grunt.config.set( 'uglify.pkgd.files', {
        'build/draggabilly.pkgd.min.js': bowerJsSources
      });

      done();
    });

  });

};
