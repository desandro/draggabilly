
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

    concat: {
      css: {
        src: [ 'bower_components/normalize-css/normalize.css', 'assets/*.css' ],
        dest: 'build/styles.css'
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

    copy: {
      scripts: {
        files: {
          'build/draggabilly.pkgd.js': 'dist/draggabilly.pkgd.js',
          'build/draggabilly.pkgd.min.js': 'dist/draggabilly.pkgd.min.js',
          'build/scripts.js': 'assets/scripts.js',
          'build/doc-ready.js': 'bower_components/doc-ready/doc-ready.js'
        }
      }
    },

    watch: {
      content: {
        files: [ 'assets/*', 'README.md' ],
        tasks: [ 'concat', 'page', 'copy' ]
      },
      js: {
        files: [ 'draggabilly.js' ],
        tasks: [ 'concat', 'uglify' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

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
    'concat',
    'uglify',
    'page',
    'copy'
  ]);

};
