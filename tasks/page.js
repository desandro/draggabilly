/**
 * creates page for the World Wide Webinars
**/


var marked = require('marked');

module.exports = function( grunt ) {

  grunt.registerTask( 'page', function() {
    var readmeHTML = marked( grunt.file.read('README.md') );
    var page = grunt.file.read('assets/page.html');
    var content = page.replace( '{{{ content }}}', readmeHTML );

    grunt.file.write( 'build/index.html', content )
  });

};
