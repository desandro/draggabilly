/*jshint node: true, unused: true, undef: true */

var fs = require('fs');
var gulp = require('gulp');

// ----- lint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'lint-js', function() {
  return gulp.src('draggabilly.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'lint-test', function() {
  return gulp.src('test/unit/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'lint-task', function() {
  return gulp.src('gulpfile.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

var jsonlint = require('gulp-json-lint');

gulp.task( 'lint-json', function() {
  return gulp.src( '*.json' )
    .pipe( jsonlint() )
    .pipe( jsonlint.report('verbose') );
});

gulp.task( 'lint', [ 'lint-js', 'lint-test', 'lint-task', 'lint-json' ] );

// -------------------------- dist -------------------------- //
// RequireJS makes pkgd

var gutil = require('gulp-util');
var chalk = require('chalk');
var rjsOptimize = require('gulp-requirejs-optimize');

// regex for banner comment
var reBannerComment = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');

function getBanner() {
  var src = fs.readFileSync( 'draggabilly.js', 'utf8' );
  var matches = src.match( reBannerComment );
  var banner = matches[0].replace( 'Draggabilly', 'Draggabilly PACKAGED' );
  return banner;
}

var replace = require('gulp-replace');
var rename = require('gulp-rename');

function addBanner( str ) {
  return replace( /^/, str );
}

gulp.task( 'requirejs', function() {
  var banner = getBanner();
  // HACK src is not needed
  // should refactor rjsOptimize to produce src
  return gulp.src('draggabilly.js')
    .pipe( rjsOptimize({
      baseUrl: 'bower_components',
      optimize: 'none',
      include: [
        'jquery-bridget/jquery-bridget',
        'draggabilly/draggabilly'
      ],
      paths: {
        draggabilly: '../',
        jquery: 'empty:'
      }
    }) )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('draggabilly.pkgd.js') )
    // remove named module
    .pipe( replace( "'draggabilly/draggabilly',", '' ) )
    .pipe( gulp.dest('dist') );
});

// ----- uglify ----- //

var uglify = require('gulp-uglify');

gulp.task( 'uglify', [ 'requirejs' ], function() {
  var banner = getBanner();
  gulp.src('dist/draggabilly.pkgd.js')
    .pipe( uglify() )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('draggabilly.pkgd.min.js') )
    .pipe( gulp.dest('dist') );
});

// ----- version ----- //

var minimist = require('minimist');
var chalk = require('chalk');

// use gulp version -t 1.2.3
gulp.task( 'version', function() {
  var args = minimist( process.argv.slice(3) );
  var version = args.t;
  if ( !version || !/^\d+\.\d+\.\d+/.test( version ) ) {
    gutil.log( 'invalid version: ' + chalk.red( version ) );
    return;
  }
  gutil.log( 'ticking version to ' + chalk.green( version ) );

  gulp.src('draggabilly.js')
    .pipe( replace( /Draggabilly v\d+\.\d+\.\d+/, 'Draggabilly v' + version ) )
    .pipe( gulp.dest('.') );

  gulp.src('package.json')
    .pipe( replace( /"version": "\d+\.\d+\.\d+"/, '"version": "' + version + '"' ) )
    .pipe( gulp.dest('.') );
});

// ----- default ----- //

gulp.task( 'default', [
  'lint',
  'uglify',
]);

// -------------------------- site-content -------------------------- //

var highlightjs = require('highlight.js');
var marked = require('marked');

// alias XML syntax highlighting as HTML
highlightjs.LANGUAGES.html = highlightjs.LANGUAGES.xml;
// alias js as javascript
highlightjs.LANGUAGES.js = highlightjs.LANGUAGES.javascript;

marked.setOptions({
  highlight: function( code, lang ) {
    return lang ? highlightjs.highlight( lang, code ).value : code;
  }
});

gulp.task( 'site-content', function() {
  var readmeHTML = marked( fs.readFileSync( 'README.md', 'utf8' ) );

  return gulp.src('assets/page.html')
    .pipe( replace( '{{{ content }}}', readmeHTML ) )
    .pipe( rename('index.html') )
    .pipe( gulp.dest('build') );
});

var concat = require('gulp-concat');

// ----- site-css ----- //

gulp.task( 'site-css', function() {
  return gulp.src([
    'bower_components/normalize.css/normalize.css',
    'assets/page.css'
  ])
    .pipe( concat('styles.css') )
    .pipe( gulp.dest('build') );
});

// ----- site-copy ----- //

gulp.task( 'site-copy', function() {
  gulp.src([
    'dist/*',
    'assets/scripts.js',
  ])
    .pipe( gulp.dest('build') );
});

// ----- site ----- //

gulp.task( 'site', [ 'site-content', 'site-css', 'site-copy' ] );
