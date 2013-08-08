/**
 * bower-list-map task
 */

var spawn = require('child_process').spawn;

var organizeSources = require('organize-bower-sources');

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

      // remove EventEmitter.min.js
      var bowerJsSources = bowerSources['.js'].filter( function( src ) {
        return src.indexOf('.min.js') === -1;
      });
      // add bower JS to JS collection
      var jsSrcs = grunt.config.get('concat.pkgd.src');
      jsSrcs = bowerJsSources.concat( jsSrcs );

      // set config so it gets concat and uglified
      grunt.config.set( 'concat.pkgd.src', jsSrcs );
      grunt.config.set( 'uglify.pkgd.files', {
        'build/draggabilly.pkgd.min.js': jsSrcs
      });

      done();
    });

  });

};
