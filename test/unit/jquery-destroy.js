/*jshint jquery: true */

test( 'destroy', function( assert ) {
  'use strict';

  var done = assert.async();

  var $draggie = $('.test--destroy .draggie').draggabilly();
  var draggieElem = $draggie[0];

  setTimeout( function() {
    $draggie.draggabilly('destroy');
    ok( true, 'draggie destroyed' );
    ok( !draggieElem.style.left, 'no style left' );
    ok( !draggieElem.style.top, 'no style top' );
    ok( !draggieElem.style.position, 'no style position' );
    done();
  });
});
