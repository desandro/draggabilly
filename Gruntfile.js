
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('draggabilly.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Draggabilly', 'Draggabilly PACKAGED' );
  })();

  grunt.initConfig({

    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            '../draggabilly'
          ],
          out: 'build/draggabilly.pkgd.js',
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
          'build/draggabilly.pkgd.min.js': [ 'build/draggabilly.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      }
    },

    copy: {
      scripts: {
        files: {
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

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'remove-pkgd-module-name', function() {
    var contents = grunt.file.read('build/draggabilly.pkgd.js');
    contents = contents.replace( "'../draggabilly',", '' );
    grunt.file.write( 'build/draggabilly.pkgd.js', contents );
    grunt.log.writeln('Removed pkgd module name on draggabilly.pkgd.js');
  });

  grunt.registerTask( 'default', [
    'requirejs',
    'remove-pkgd-module-name',
    'concat',
    'uglify',
    'page',
    'copy'
  ]);

};
