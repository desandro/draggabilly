
// -------------------------- grunt -------------------------- //
/* global module */
module.exports = function( grunt ) {
  'use strict';

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('draggabilly.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Draggabilly', 'Draggabilly PACKAGED' );
  })();

  grunt.initConfig({

    jshint: {
      src: [ 'draggabilly.js', 'Gruntfile.js' ],
      options: grunt.file.readJSON('.jshintrc')
    },

    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            '../draggabilly'
          ],
          out: 'dist/draggabilly.pkgd.js',
          optimize: 'none',
          wrap: {
            start: banner
          }
        }
      }
    },

    uglify: {
      pkgd: {
        files: {
          'dist/draggabilly.pkgd.min.js': [ 'dist/draggabilly.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'remove-pkgd-module-name', function() {
    var contents = grunt.file.read('dist/draggabilly.pkgd.js');
    contents = contents.replace( "'../draggabilly',", '' );
    grunt.file.write( 'dist/draggabilly.pkgd.js', contents );
    grunt.log.writeln('Removed pkgd module name on draggabilly.pkgd.js');
  });

  grunt.registerTask('travis', [
    'jshint'
  ]);

  grunt.registerTask( 'default', [
    'jshint',
    'requirejs',
    'remove-pkgd-module-name',
    'uglify'
  ]);

};
