
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var componentJSON = grunt.file.readJSON('component.json');

  grunt.initConfig({

    concat: {
      // options: {
      //   // stripBanners: true,
      //   // banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      // },
      // js: {
      //   src: [ 'js/controller.js', 'js/pages/*.js' ],
      //   dest: 'build/js/packery-site.js'
      // },
      pkgd: {
        // src will be set in package-sources task
        src: [ componentJSON.main ],
        dest: 'build/draggabilly.pkgd.js'
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
