
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

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
      // pkgd: {
      //   // src will be set in package-sources task
      //   dest: 'build/packery.pkgd.js'
      // },
      css: {
        src: [ 'components/normalize-css/normalize.css', 'assets/*.css' ],
        dest: 'build/styles.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'build/packery.pkgd.min.js': [ 'build/packery.pkgd.js' ]
        }
      },
      js: {
        files: {
          // 'build/js/packery-site.min.js' will be set in bower-list-map
        }
      }
    },

    // ----- handlebars templating ----- //
    hbarz: {
      docs: {
        files: {
          'build/': 'content/*'
        },
        options: {
          templates: 'templates/*.mustache',
          defaultTemplate: 'page'
        }
      }
    },

    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'bower-map', 'hbarz' ]
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', 'concat page'.split(' ') );

  

};
