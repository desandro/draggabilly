
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var componentJSON = grunt.file.readJSON('component.json');

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('draggabilly.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Draggabilly', 'Draggabilly PACKAGED' );
  })();

  grunt.initConfig({

    concat: {
      pkgd: {
        // src will be set in package-sources task
        src: [ componentJSON.main ],
        dest: 'build/draggabilly.pkgd.js',
        options: {
          banner: banner
        }
      },
      css: {
        src: [ 'components/normalize-css/normalize.css', 'assets/*.css' ],
        dest: 'build/styles.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          // 'build/draggabilly.pkgd.min.js' will be set in bower-list-sources
        },
        options: {
          banner: banner
        }
      }
    },

    copy: {
      scripts: {
        files: {
          'build/scripts.js': 'assets/scripts.js'
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'bower-list-sources',
    'concat',
    'uglify',
    'page',
    'copy'
  ]);

};
